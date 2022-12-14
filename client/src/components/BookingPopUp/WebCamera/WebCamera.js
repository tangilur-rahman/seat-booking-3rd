// external components
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

// internal components
import "./WebCamera.css";

const WebCamera = ({ setWebCamT, setPreview, setImage }) => {
	const videoConstraints = {
		width: 600,
		facingMode: "environment"
	};

	const webcamRef = useRef(null);
	const [getSc, setSc] = useState(null);

	const capturePhoto = useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot();
		setSc(imageSrc);
	}, [webcamRef]);

	// base64 file to convert upload format start
	const [isAccept, setIsAccept] = useState("");

	useEffect(() => {
		if (getSc) {
			function b64toBlob(b64Data, contentType, sliceSize) {
				contentType = contentType || "";
				sliceSize = sliceSize || 512;

				let byteCharacters = atob(b64Data); // window.atob(b64Data)
				let byteArrays = [];

				for (
					let offset = 0;
					offset < byteCharacters.length;
					offset += sliceSize
				) {
					let slice = byteCharacters.slice(offset, offset + sliceSize);

					let byteNumbers = new Array(slice.length);
					for (let i = 0; i < slice.length; i++) {
						byteNumbers[i] = slice.charCodeAt(i);
					}

					let byteArray = new Uint8Array(byteNumbers);

					byteArrays.push(byteArray);
				}

				let blob = new Blob(byteArrays, { type: contentType });
				return blob;
			}

			const ImageURL = getSc; // 'photo' is your base64 image
			// Split the base64 string in data and contentType
			const block = ImageURL.split(";");
			// Get the content type of the image
			const contentType = block[0].split(":")[1]; // In this case "image/gif"
			// get the real base64 content of the file
			const realData = block[1].split(",")[1];

			// Convert it to a blob to upload
			setImage(b64toBlob(realData, contentType));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAccept]); // base64 file to convert upload format end

	return (
		<>
			<div className="web-cam-container">
				<div className="web-cam-wrapper">
					<div className="view-container">
						{getSc ? (
							<div>
								<img src={getSc} alt="Screenshot" />
							</div>
						) : (
							<Webcam
								ref={webcamRef}
								audio={false}
								screenshotFormat="image/png"
								videoConstraints={videoConstraints}
								mirrored={true}
							/>
						)}
					</div>

					<div id="btn-container">
						{getSc ? (
							<div id="get-sc">
								<button onClick={() => setSc(null)} className="btn btn-dark">
									<span className="hover-link">Retake</span>
								</button>
								<button
									onClick={() => {
										setPreview(getSc);
										setWebCamT(false);
									}}
									className="btn btn-success"
								>
									<span className="hover-link">Accept</span>
								</button>
							</div>
						) : (
							<div id="want-sc">
								<button
									className="btn btn-dark"
									onClick={() => {
										setWebCamT(false);
										setIsAccept("");
										setPreview("");
										setImage("");
									}}
								>
									<span className="hover-link">Cancel</span>
								</button>
								<button
									className="btn btn-primary"
									onClick={() => {
										capturePhoto();
										setIsAccept(Date.now());
									}}
								>
									<span className="hover-link">Capture</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default WebCamera;
