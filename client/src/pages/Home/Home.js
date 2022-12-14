// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GenerateReport from "../../components/GenerateReport/GenerateReport";

// internal components
import { GetContextApi } from "../../ContextApi";
import BoysLab from "../BoysLab/BoysLab";
import GirlsLab from "../GirlsLab/GirlsLab";
import "./Home.css";

const Home = () => {
	// for updating generate-report
	const { updateReport } = GetContextApi();

	// for getting option
	const [getOption, setOption] = useState("seats");

	// for lab selection
	const [selectedLab, setSelectedLab] = useState("");

	// girls-lab booking counter state
	const [girlsLabB, setGirlsLabB] = useState([]);

	// boys-lab booking counter state
	const [boysLabB, setBoysLabB] = useState([]);

	// for getting those document which are updated today start
	const [generateT, setGenerateT] = useState("");
	const [generateR, setGenerateR] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/user/generate-report");

				const result = await response.json();

				if (response.status === 200) {
					setGenerateR(result ? result : []);
				} else if (response.status === 400) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});
				} else if (result.error) {
					toast.error(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		})();
	}, [updateReport]);
	// for getting those document which are updated today end

	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 home-container">
					<div className="col-12 p-0 navbar-container">
						<div
							className={getOption === "user" ? "option active" : "option"}
							onClick={() => setOption("user")}
						>
							<i className="fa-solid fa-user"></i> <h6>User</h6>
						</div>
						<div
							className={getOption === "seats" ? "option active" : "option"}
							onClick={() => setOption("seats")}
						>
							<i className="fa-solid fa-couch"></i> <h6>Seats</h6>
						</div>
						<div
							className={getOption === "logout" ? "option active" : "option"}
							onClick={() => setOption("logout")}
						>
							<i className="fa-solid fa-right-from-bracket"></i>
							<h6>Log Out</h6>
						</div>
					</div>

					<div className="col-12 p-0 body-container">
						<div className="header">
							<h3>Seats Availability</h3>
							<button
								type="button"
								className="btn btn-light hover-link"
								onClick={() => setGenerateT(!generateT)}
							>
								Generate Report
							</button>
						</div>

						<div className="section-container">
							{/* girls lab start  */}
							<div
								className="section"
								onClick={() => setSelectedLab("girls-lab")}
							>
								<div id="header">
									<h5>Girls Lab</h5>
									<div id="counter">
										<span>
											Total Seat : <b>64</b>{" "}
										</span>
										<span>
											Booked Seat : <b>{girlsLabB.length}</b>{" "}
										</span>
										<span>
											Empty Seat : <b>{64 - girlsLabB.length}</b>{" "}
										</span>
									</div>
								</div>

								<div id="lab-container">
									<img src="/assets/images/girls-lab.png" alt="lab-img" />
								</div>

								<h6 className="view-seats">
									<span className="hover-link">View Seats</span>
								</h6>
							</div>
							{/* girls lab end  */}

							{/* boys lab start  */}
							<div
								className="section"
								onClick={() => setSelectedLab("boys-lab")}
							>
								<div id="header">
									<h5>Boys Lab</h5>
									<div id="counter">
										<span>
											Total Seat : <b>109</b>{" "}
										</span>
										<span>
											Booked Seat : <b>{boysLabB.length}</b>{" "}
										</span>
										<span>
											Empty Seat : <b>{109 - boysLabB.length}</b>{" "}
										</span>
									</div>
								</div>

								<div id="lab-container">
									<img src="/assets/images/boys-lab.png" alt="lab-img" />
								</div>

								<h6 className="view-seats">
									<span className="hover-link">View Seats</span>
								</h6>
							</div>
							{/* boys lab end  */}
						</div>
					</div>

					{selectedLab === "girls-lab" && (
						<GirlsLab
							setGirlsLabB={setGirlsLabB}
							setSelectedLab={setSelectedLab}
						/>
					)}

					{selectedLab === "boys-lab" && (
						<BoysLab
							setBoysLabB={setBoysLabB}
							setSelectedLab={setSelectedLab}
						/>
					)}

					{generateT && (
						<GenerateReport setGenerateT={setGenerateT} generateR={generateR} />
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
