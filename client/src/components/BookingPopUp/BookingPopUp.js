// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./BookingPopUp.css";
import WebCamera from "./WebCamera/WebCamera";

const BookingPopUp = ({
	getId,
	setId,
	frow_where,
	setIsUpdate,
	getBooked,
	setBooked
}) => {
	// for updating generate-report
	const { setUpdateReport } = GetContextApi();

	// for closing booking-popup when clicked outside start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setId("");
			setBooked("");
			setPreview("");
			setImage("");
			setEditT(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for closing booking-popup when clicked outside end

	// for loading until not submitting on server
	const [isLoading, setIsLoading] = useState(false);

	// for edit toggle
	const [editT, setEditT] = useState(false);

	// for getting input-fields value
	const [getSName, setSName] = useState(
		getBooked ? getBooked.student_name : ""
	);
	const [getSNum, setSNum] = useState(
		getBooked ? getBooked.student_number : ""
	);

	const [getGName, setGName] = useState(
		getBooked ? getBooked.guardian_name : ""
	);
	const [getGNum, setGNum] = useState(
		getBooked ? getBooked.guardian_number : ""
	);

	const [getDay, setDay] = useState(
		getBooked
			? Math.abs(
					Math.floor(getBooked.days_left / (3600 * 24 * 1000)) -
						Math.floor(new Date().getTime() / (3600 * 24 * 1000))
			  )
			: ""
	);

	// for getting img
	const [getImage, setImage] = useState("");
	const [getPreview, setPreview] = useState("");

	// for toggle web-camera
	const [webCamT, setWebCamT] = useState("");

	// submit handler start
	const submitHandler = async () => {
		if (getSName && getSNum && getGName && getGNum && getDay) {
			// addition days start
			function addDays(theDate, days) {
				return new Date(
					theDate.getTime() + days * 24 * 60 * 60 * 1000
				).getTime();
			}

			const newDate = addDays(new Date(), getDay);
			// addition days end

			try {
				setIsLoading(true);
				const userObject = {
					getSName,
					getSNum,
					getGName,
					getGNum,
					newDate,
					getId: getBooked ? getBooked._id : getId,
					frow_where,
					getDay
				};

				const response = await fetch("/user/submit", {
					method: "POST",
					body: JSON.stringify(userObject),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					});

					setId("");
					setSName("");
					setSNum("");
					setGName("");
					setGNum("");
					setDay("");
					setIsUpdate(Date.now());
					setUpdateReport(Date.now());
					setIsLoading(false);
					setBooked("");
				} else if (response.status === 400) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});

					setIsLoading(false);
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
				setIsLoading(false);
			}
		} else {
			toast("Please fill-up all fields!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};

	const submitHandlerWithImage = async () => {
		if (getSName && getSNum && getGName && getGNum && getDay) {
			// addition days start
			function addDays(theDate, days) {
				return new Date(
					theDate.getTime() + days * 24 * 60 * 60 * 1000
				).getTime();
			}

			const newDate = addDays(new Date(), getDay);
			// addition days end

			try {
				setIsLoading(true);

				const formData = new FormData();

				formData.append("image", getImage);
				formData.append("getSName", getSName);
				formData.append("getSNum", getSNum);
				formData.append("getGName", getGName);
				formData.append("getGNum", getGNum);
				formData.append("newDate", newDate);
				formData.append("getId", getBooked ? getBooked._id : getId);
				formData.append("frow_where", frow_where);
				formData.append("getDay", getDay);

				const response = await fetch("/user/submit/with-img", {
					method: "POST",
					body: formData
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					});

					setId("");
					setSName("");
					setSNum("");
					setGName("");
					setGNum("");
					setDay("");
					setIsUpdate(Date.now());
					setUpdateReport(Date.now());
					setIsLoading(false);
					setBooked("");
				} else if (response.status === 400) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});

					setIsLoading(false);
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
				setIsLoading(false);
			}
		} else {
			toast("Please fill-up all fields!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// submit handler end

	// for preview image start
	const imgHandler = (event) => {
		setImage(event.target.files[0]);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setPreview(reader.result);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	};
	// for preview image end

	return (
		<>
			<div
				className="row m-0 booking-popup-container"
				data-aos="fade-down"
				data-aos-duration="700"
			>
				<div
					className="col-xl-6 col-lg-7 col-md-11 col-11 p-0 booking-popup-wrapper"
					ref={myRef}
				>
					<h3>{editT ? "Modify Seat Booked" : "Seat Booked"}</h3>

					<div className="input-fields-wrapper">
						<div
							className="input-fields-container"
							id={getBooked.profile_img ? "have-img" : ""}
						>
							<div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Student Name : </h6> <p>{getBooked.student_name}</p>
									</div>
								) : (
									<input
										placeholder="Student Name . . ."
										required
										onChange={(e) => setSName(e.target.value)}
										value={getSName}
									/>
								)}
							</div>

							<div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Student Number : </h6> <p>{getBooked.student_number}</p>
									</div>
								) : (
									<input
										type="number"
										placeholder="Student Number . . ."
										required
										onChange={(e) => setSNum(e.target.value)}
										value={getSNum}
									/>
								)}
							</div>

							<div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Guardian Name : </h6> <p>{getBooked.guardian_name}</p>
									</div>
								) : (
									<input
										placeholder="Guardian Name . . ."
										required
										onChange={(e) => setGName(e.target.value)}
										value={getGName}
									/>
								)}
							</div>

							<div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Guardian Number : </h6>{" "}
										<p>{getBooked.guardian_number}</p>
									</div>
								) : (
									<input
										type="number"
										placeholder="Guardian Number . . ."
										required
										onChange={(e) => setGNum(e.target.value)}
										value={getGNum}
									/>
								)}
							</div>

							<div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Days Left : </h6>
										<p>
											{Math.abs(
												Math.floor(getBooked.days_left / (3600 * 24 * 1000)) -
													Math.floor(new Date().getTime() / (3600 * 24 * 1000))
											)}
										</p>
									</div>
								) : (
									<input
										type="number"
										placeholder="Days left . . ."
										required
										onChange={(e) => setDay(e.target.value)}
										value={getDay}
									/>
								)}
							</div>

							{/* <div className="input-field">
								{!editT && getBooked ? (
									<div className="displaying">
										<h6>Exam Date : </h6> <p>{getBooked?.exam_date}</p>
									</div>
								) : (
									<input
										type="date"
										placeholder="Exam date . . ."
										required
										// onChange={(e) => setExamD(e.target.value)}
										// value={examD}
									/>
								)}
							</div> */}

							{/* <div className="exam-fields">
								<div className="input-field">
									{!editT && getBooked ? (
										<div className="displaying">
											<h6>Exam User : </h6> <p>{getBooked?.exam_user}</p>
										</div>
									) : (
										<input
											type="text"
											placeholder="Exam user . . ."
											required
											// onChange={(e) => setExamU(e.target.value)}
											// value={examU}
										/>
									)}
								</div>

								<div className="input-field">
									{!editT && getBooked ? (
										<div className="displaying">
											<h6>Exam Password : </h6>{" "}
											<p>{getBooked?.exam_password}</p>
										</div>
									) : (
										<input
											type="password"
											placeholder="Exam password . . ."
											required
											// onChange={(e) => setExamP(e.target.value)}
											// value={examP}
										/>
									)}
								</div>
							</div> */}

							{(!getBooked || editT) && (
								<div className="upload" id={getPreview ? "preview" : ""}>
									{getPreview ? (
										<div id="display-preview">
											<img src={getPreview} alt="profile-img" />
											<h5>
												{getImage.name ? getImage.name : "screenshot.png"}
											</h5>
										</div>
									) : (
										<div id="upload-btn">
											<p onClick={() => setWebCamT(!webCamT)}>Take a image</p>
											<label htmlFor="for-image">
												<p>Upload a image</p>
											</label>
										</div>
									)}
								</div>
							)}

							{(!getBooked || editT) && (
								<div className="btn-container">
									<button
										type="button"
										className="btn btn-dark"
										onClick={() => {
											setId("");
											setBooked("");
											setPreview("");
											setImage("");
										}}
									>
										<span className="hover-link">Cancel</span>
									</button>
									<button
										type="button"
										className="btn btn-success"
										onClick={
											getPreview ? submitHandlerWithImage : submitHandler
										}
									>
										{isLoading ? (
											<i className="fa-solid fa-fan fa-spin"></i>
										) : (
											<span className="hover-link">Submit</span>
										)}
									</button>
								</div>
							)}
						</div>

						{getBooked.profile_img && (
							<div id="displaying-img">
								<img
									src={`/uploads/profile-img/${getBooked.profile_img}`}
									alt="profile-img"
								/>
							</div>
						)}
					</div>

					<div
						className="close-btn"
						onClick={() => {
							setBooked("");
							setId("");
							setPreview("");
							setImage("");
							setEditT(false);
						}}
					>
						<i className="fa-solid fa-x"></i>
					</div>

					{getBooked && (
						<div className="for-edit" onClick={() => setEditT(!editT)}>
							<i className="fa-solid fa-pen-to-square"></i>
						</div>
					)}

					{webCamT && (
						<WebCamera
							setWebCamT={setWebCamT}
							setPreview={setPreview}
							setImage={setImage}
						/>
					)}
				</div>

				<input
					type="file"
					id="for-image"
					accept="image/png, image/gif, image/jpeg, image/jpg"
					onChange={imgHandler}
					style={{ display: "none" }}
				/>
			</div>
		</>
	);
};

export default BookingPopUp;
