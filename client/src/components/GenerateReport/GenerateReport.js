// external components

// internal components
import "./GenerateReport.css";

const GenerateReport = ({ setGenerateT, generateR }) => {
	return (
		<>
			<div
				className="generate-report-container"
				data-aos="fade-up"
				data-aos-duration="700"
			>
				<div className="generate-report-wrapper">
					<div id="header">
						<h4>Booked Report</h4>
						<p> Date&nbsp;:&nbsp; {new Date().toISOString().slice(0, 10)}</p>
					</div>

					<div className="table-wrapper">
						<table class="table table-hover table-bordered">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Student Name</th>
									<th scope="col">Student Number</th>
									<th scope="col">Guardian Name</th>
									<th scope="col">Guardian Number</th>
									<th scope="col">Days Left</th>
									<th scope="col">Location</th>
								</tr>
							</thead>
							<tbody>
								{generateR.length > 0 &&
									generateR
										.map((value, index) => {
											return (
												<tr>
													<th scope="row">{index + 1}</th>
													<td>{value.student_name}</td>
													<td>{value.student_number}</td>
													<td>{value.guardian_name}</td>
													<td>{value.guardian_number}</td>
													<td>
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
																				new Date().getTime() /
																					(3600 * 24 * 1000)
																			)
																  )
																: ""
															: ""}
													</td>
													<td>{value.frow_where}</td>
												</tr>
											);
										})
										.reverse()}
							</tbody>
						</table>
					</div>

					<div
						className="close-btn-basement"
						onClick={() => setGenerateT(false)}
					>
						<i className="fa-solid fa-x"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default GenerateReport;
