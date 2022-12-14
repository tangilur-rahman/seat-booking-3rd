// external modules
const multer = require("multer");
const path = require("path");

// for only single-image
const multerForImg = (filename) => {
	// File upload folder
	const UPLOADS_FOLDER = path.resolve(`../client/public/uploads/profile-img`);
	// const UPLOADS_FOLDER = "./build/uploads/profile-img";

	// define the storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, UPLOADS_FOLDER);
		},

		filename: (req, file, cb) => {
			const fileExt =
				file.originalname === "blob" ? ".png" : path.extname(file.originalname);
			const fileName =
				file.originalname
					.replace(fileExt, "")
					.toLowerCase()
					.split(" ")
					.join("-") +
				"-" +
				Date.now();

			cb(null, fileName + fileExt);
		}
	});

	// prepare the final multer upload object
	let upload = multer({
		storage: storage,
		limits: {
			fileSize: 5000000 // 5MB
		},
		fileFilter: (req, file, cb) => {
			if (file.fieldname === filename) {
				if (
					file.mimetype === "image/png" ||
					file.mimetype === "image/jpg" ||
					file.mimetype === "image/jpeg"
				) {
					cb(null, true);
				} else {
					cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
				}
			} else {
				cb(new Error("There was an unknown error!"));
			}
		}
	});

	return upload;
};

module.exports = multerForImg;
