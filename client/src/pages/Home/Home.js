// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GenerateReport from "../../components/GenerateReport/GenerateReport";

// internal components
import { GetContextApi } from "../../ContextApi";
import PTELab1A from "../PTELab1A/PTELab1A";
import PTELab1B from "../PTELab1B/PTELab1B";
import PTELab2 from "../PTELab2/PTELab2";
import "./Home.css";

const Home = () => {
	// for updating generate-report
	const { updateReport } = GetContextApi();

	// for getting option
	const [getOption, setOption] = useState("seats");

	// for lab selection
	const [selectedLab, setSelectedLab] = useState("");

	//pte-lab-1-a booking counter state
	const [pteLab1AB, setPteLab1AB] = useState([]);

	//pte-lab-1-b booking counter state
	const [pteLab1BB, setPteLab1BB] = useState([]);

	// pte-lab-2 booking counter state
	const [pteLab2B, setPteLab2B] = useState([]);

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
							{/* PTE Lab 1A start */}
							<div
								className="section"
								onClick={() => setSelectedLab("pte-lab-1-a")}
							>
								<div id="header">
									<h5>PTE Lab 1A</h5>
									<div id="counter">
										<span>
											Total Seat : <b>70</b>{" "}
										</span>
										<span>
											Booked Seat : <b>{pteLab1AB.length}</b>{" "}
										</span>
										<span>
											Empty Seat : <b>{70 - pteLab1AB.length}</b>{" "}
										</span>
									</div>
								</div>

								<div id="lab-container">
									<img src="/assets/images/pte-lab-1a.png" alt="lab-img" />
								</div>

								<h6 className="view-seats">
									<span className="hover-link">View Seats</span>
								</h6>
							</div>
							{/* PTE Lab 1A end */}

							{/* PTE Lab 1B Start */}
							<div
								className="section"
								onClick={() => setSelectedLab("pte-lab-1-b")}
							>
								<div id="header">
									<h5>PTE Lab 1B</h5>
									<div id="counter">
										<span>
											Total Seat : <b>22</b>{" "}
										</span>
										<span>
											Booked Seat : <b>{pteLab1BB.length}</b>{" "}
										</span>
										<span>
											Empty Seat : <b>{22 - pteLab1BB.length}</b>{" "}
										</span>
									</div>
								</div>

								<div id="lab-container">
									<img src="/assets/images/pte-lab-1b.png" alt="lab-img" />
								</div>

								<h6 className="view-seats">
									<span className="hover-link">View Seats</span>
								</h6>
							</div>
							{/* PTE Lab 1B end  */}

							{/* pte-lab-2 start  */}
							<div
								className="section"
								onClick={() => setSelectedLab("pte-lab-2")}
							>
								<div id="header">
									<h5>PTE Lab 2</h5>
									<div id="counter">
										<span>
											Total Seat : <b>70</b>{" "}
										</span>
										<span>
											Booked Seat : <b>{pteLab2B.length}</b>{" "}
										</span>
										<span>
											Empty Seat : <b>{70 - pteLab2B.length}</b>{" "}
										</span>
									</div>
								</div>

								<div id="lab-container">
									<img src="/assets/images/pte-lab-1a.png" alt="lab-img" />
								</div>

								<h6 className="view-seats">
									<span className="hover-link">View Seats</span>
								</h6>
							</div>
							{/* pte-lab-2 end  */}
						</div>
					</div>

					{selectedLab === "pte-lab-1-a" && (
						<PTELab1A
							setPteLab1AB={setPteLab1AB}
							setSelectedLab={setSelectedLab}
						/>
					)}

					{selectedLab === "pte-lab-1-b" && (
						<PTELab1B
							setPteLab1BB={setPteLab1BB}
							setSelectedLab={setSelectedLab}
						/>
					)}

					{selectedLab === "pte-lab-2" && (
						<PTELab2
							setPteLab2B={setPteLab2B}
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
