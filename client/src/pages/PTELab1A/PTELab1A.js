// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookingPopUp from "../../components/BookingPopUp/BookingPopUp";

// internal components
import "./PTELab1A.css";

const PTELab1A = ({ setPteLab1AB, setSelectedLab }) => {
	// for updating booking
	const [isUpdate, setIsUpdate] = useState("");

	// for getting selected seat
	const [getId, setId] = useState("");

	// for displaying booked value
	const [getBooked, setBooked] = useState("");

	// for getting all documents
	const [getDocs, setDocs] = useState("");

	// fetching data from database start
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/user/allDocs?lab=pte-lab-1-a");

				const result = await response.json();

				if (response.status === 200) {
					setDocs(result ? result : []);
				} else if (response.status === 400) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUpdate]);
	// fetching data from database end

	// for counting booking seat & empty seat start
	useEffect(() => {
		if (getDocs) {
			setPteLab1AB(
				getDocs
					.map(
						(value) =>
							new Date().getTime() < value?.days_left &&
							Math.abs(
								Math.floor(value?.days_left / (3600 * 24 * 1000)) -
									Math.floor(new Date().getTime() / (3600 * 24 * 1000))
							) !== 0
					)
					.filter((result) => result === true)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDocs]);
	// for counting booking seat & empty seat end

	return (
		<>
			{getDocs.length > 0 && (
				<div
					className="container-fluid p-0 pte-1-a-main-container"
					data-aos="zoom-in"
					data-aos-duration="700"
				>
					<div className="row m-0 pte-1-a-container">
						<div className="col-12 p-0 pte-1-a-wrapper">
							{/* layout-1 start  */}
							<div className="layout" id="when-layout-1">
								{getDocs
									.map((value, index) => {
										return (
											<span
												key={index}
												onClick={() =>
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? setBooked(value)
															: setId(value._id)
														: setId(value._id)
												}
												className={
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? "active"
															: ""
														: ""
												}
											>
												{new Date().getTime() < value.days_left
													? Math.abs(
															Math.floor(value.days_left / (3600 * 24 * 1000)) -
																Math.floor(
																	new Date().getTime() / (3600 * 24 * 1000)
																)
													  ) !== 0
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  )
														: ""
													: ""}

												{/* {value.booking_seat} */}
											</span>
										);
									})
									.splice(0, 19)}

								<span className="visibility-none"></span>
							</div>
							{/* layout-1 end */}

							{/* layout-2 start  */}
							<div className="layout" id="when-layout-2">
								{/* row-1 start  */}
								<div className="row-container-1">
									<span className="visibility-none"></span>
									<span className="visibility-none"></span>
									{getDocs
										.map((value, index) => {
											return (
												<span
													key={index}
													onClick={() =>
														new Date().getTime() < value?.days_left
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  ) !== 0
																? setBooked(value)
																: setId(value._id)
															: setId(value._id)
													}
													className={
														new Date().getTime() < value?.days_left
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  ) !== 0
																? "active"
																: ""
															: ""
													}
												>
													{new Date().getTime() < value.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  )
															: ""
														: ""}

													{/* {value.booking_seat} */}
												</span>
											);
										})
										.splice(19, 16)}
									<span className="visibility-none"></span>
									<span className="visibility-none"></span>
								</div>
								{/* row-1 end */}

								{/* row-2 start  */}
								<div className="row-container-2">
									<span className="visibility-none"></span>
									<span className="visibility-none"></span>
									{getDocs
										.map((value, index) => {
											return (
												<span
													key={index}
													onClick={() =>
														new Date().getTime() < value?.days_left
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  ) !== 0
																? setBooked(value)
																: setId(value._id)
															: setId(value._id)
													}
													className={
														new Date().getTime() < value?.days_left
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  ) !== 0
																? "active"
																: ""
															: ""
													}
												>
													{new Date().getTime() < value.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? Math.abs(
																	Math.floor(
																		value.days_left / (3600 * 24 * 1000)
																	) -
																		Math.floor(
																			new Date().getTime() / (3600 * 24 * 1000)
																		)
															  )
															: ""
														: ""}

													{/* {value.booking_seat} */}
												</span>
											);
										})
										.splice(35, 16)}
									<span className="visibility-none"></span>
									<span className="visibility-none"></span>
								</div>
								{/* row-2 end */}
							</div>
							{/* layout-2 end */}

							{/* layout-3 start  */}
							<div className="layout" id="when-layout-3">
								<span className="visibility-none"></span>
								<span className="visibility-none"></span>
								<span className="visibility-none"></span>
								<span className="visibility-none"></span>
								<span className="visibility-none"></span>
								<span className="visibility-none"></span>
								{getDocs
									.map((value, index) => {
										return (
											<span
												key={index}
												onClick={() =>
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? setBooked(value)
															: setId(value._id)
														: setId(value._id)
												}
												className={
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? "active"
															: ""
														: ""
												}
											>
												{new Date().getTime() < value.days_left
													? Math.abs(
															Math.floor(value.days_left / (3600 * 24 * 1000)) -
																Math.floor(
																	new Date().getTime() / (3600 * 24 * 1000)
																)
													  ) !== 0
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  )
														: ""
													: ""}

												{/* {value.booking_seat} */}
											</span>
										);
									})
									.splice(51, 14)}
							</div>
							{/* layout-3 end */}

							{/* layout-4 start  */}
							<div className="layout" id="when-layout-4">
								{getDocs
									.map((value, index) => {
										return (
											<span
												key={index}
												onClick={() =>
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? setBooked(value)
															: setId(value._id)
														: setId(value._id)
												}
												className={
													new Date().getTime() < value?.days_left
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  ) !== 0
															? "active"
															: ""
														: ""
												}
											>
												{new Date().getTime() < value.days_left
													? Math.abs(
															Math.floor(value.days_left / (3600 * 24 * 1000)) -
																Math.floor(
																	new Date().getTime() / (3600 * 24 * 1000)
																)
													  ) !== 0
														? Math.abs(
																Math.floor(
																	value.days_left / (3600 * 24 * 1000)
																) -
																	Math.floor(
																		new Date().getTime() / (3600 * 24 * 1000)
																	)
														  )
														: ""
													: ""}

												{/* {value.booking_seat} */}
											</span>
										);
									})
									.splice(65, 5)}
							</div>
							{/* layout-4 end */}
						</div>

						{/* for close button start  */}
						<div
							className="close-btn-girls-1"
							onClick={() => {
								setSelectedLab("");
							}}
						>
							<i className="fa-solid fa-x"></i>
						</div>
						{/* for close button start  */}

						{/* for entry text start  */}
						<div className="entry-gate-container">
							<i className="fa-solid fa-door-open"></i>
							<p>Door</p>
						</div>
						{/* for entry text end */}
					</div>
					{(getId || getBooked) && (
						<BookingPopUp
							getId={getId}
							setId={setId}
							frow_where={"pte-lab-1-a"}
							setIsUpdate={setIsUpdate}
							getBooked={getBooked}
							setBooked={setBooked}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default PTELab1A;
