// external modules
const user = require("express").Router();
const fast2sms = require("fast-two-sms");
const generator = require("generate-password");
const jwt = require("jsonwebtoken");

// internal modules
const userModel = require("./../model/userModel");
const multerForImg = require("./../Config/multerManager");

// for getting all seats
user.get("/allDocs", async (req, res) => {
	try {
		const documents = await userModel.find({ frow_where: req.query.lab });

		if (documents) {
			res.status(200).json(documents);
		} else {
			res.status(400).json({ error: "Maintaining mode, Try again latter!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintaining mode, Try again latter!" });
	}
});

// for updating seat information without image
user.post("/submit", async (req, res) => {
	try {
		const {
			getSName,
			getSNum,
			getGName,
			getGNum,
			newDate,
			getId,
			frow_where,
			getDay,
			selectedDay
		} = req.body;

		// for (let index = 1; index <= 109; index++) {
		// 	const documents = await userModel({
		// 		student_name: "",
		// 		student_number: "",
		// 		guardian_name: "",
		// 		guardian_number: "",
		// 		days_left: null,
		// 		frow_where: "boys-lab",
		// 		booking_seat: index
		// 	});

		// 	await documents.save();
		// }

		// for creating user-name
		const username = getSName.replace(/\s+/g, "").toLowerCase();

		// for generate password
		const password = generator.generate({
			length: 6,
			numbers: true
		});

		await userModel.updateOne(
			{ _id: getId },
			{
				$set: {
					student_name: getSName,
					student_number: getSNum,
					guardian_name: getGName,
					guardian_number: getGNum,
					days_left: newDate,
					frow_where,
					date: new Date().toISOString().slice(0, 10),
					exam_date: {
						day: selectedDay.day,
						month: selectedDay.month,
						year: selectedDay.year
					},
					username,
					password
				}
			}
		);

		const options1 = {
			authorization:
				"xsHXYHLKkSoG0TAn2M00pNDa5jaBb6zBAnwjAW5RwDI9opRPjIaTtE1b9lTE",

			message: `Hi ${getSName}, Congratulations  and thanks for joining Ridhima PTE Centre. Your membership of ${getDay} days has been activated successfully.`,
			numbers: [getSNum]
		};

		await fast2sms.sendMessage(options1);

		const options2 = {
			authorization:
				"xsHXYHLKkSoG0TAn2M00pNDa5jaBb6zBAnwjAW5RwDI9opRPjIaTtE1b9lTE",

			message: `Hi ${getGName}, Congratulations  and thanks for joining Ridhima PTE Centre. Your membership of ${getDay} days has been activated successfully.`,
			numbers: [getGNum]
		};

		await fast2sms.sendMessage(options2);

		res.status(200).json({ message: "Submit successfully." });
	} catch (error) {
		res.status(500).json({ error: "Maintaining mode, Try again latter!" });
	}
});

// for updating seat information with image
const upload = multerForImg("image");

user.post("/submit/with-img", upload.single("image"), async (req, res) => {
	try {
		const {
			getSName,
			getSNum,
			getGName,
			getGNum,
			newDate,
			getId,
			frow_where,
			getDay,
			day,
			month,
			year
		} = req.body;

		// for creating user-name
		const username = getSName.replace(/\s+/g, "").toLowerCase();

		// for generate password
		const password = generator.generate({
			length: 6,
			numbers: true
		});

		await userModel.updateOne(
			{ _id: getId },
			{
				$set: {
					student_name: getSName,
					student_number: getSNum,
					guardian_name: getGName,
					guardian_number: getGNum,
					days_left: newDate,
					frow_where,
					profile_img: req.file.filename,
					date: new Date().toISOString().slice(0, 10),
					exam_date: {
						day,
						month,
						year
					},
					username,
					password
				}
			}
		);

		const options1 = {
			authorization:
				"xsHXYHLKkSoG0TAn2M00pNDa5jaBb6zBAnwjAW5RwDI9opRPjIaTtE1b9lTE",

			message: `Hi ${getSName}, Congratulations  and thanks for joining Ridhima PTE Centre. Your membership of ${getDay} days has been activated successfully.`,
			numbers: [getSNum]
		};

		await fast2sms.sendMessage(options1);

		const options2 = {
			authorization:
				"xsHXYHLKkSoG0TAn2M00pNDa5jaBb6zBAnwjAW5RwDI9opRPjIaTtE1b9lTE",

			message: `Hi ${getGName}, Congratulations  and thanks for joining Ridhima PTE Centre. Your membership of ${getDay} days has been activated successfully.`,
			numbers: [getGNum]
		};

		await fast2sms.sendMessage(options2);

		res.status(200).json({ message: "Submit successfully." });
	} catch (error) {
		res.status(500).json({ error: "Maintaining mode, Try again latter!" });
	}
});

// for getting today's generate-report
user.get("/generate-report", async (req, res) => {
	try {
		const documents = await userModel.find({
			date: new Date().toISOString().slice(0, 10)
		});

		if (documents) {
			res.status(200).json(documents);
		}
	} catch (error) {
		res.status(500).json({ error: "Maintaining mode, Try again latter!" });
	}
});

// for login user
user.post("/login", async (req, res) => {
	try {
		let { username, password } = req.body;

		username = username.replace(/\s+/g, "").toLowerCase();

		const documents = await userModel.find({ username });

		if (documents.length > 0) {
			const newDocuments = documents.filter(
				(value) =>
					new Date().getTime() < value?.days_left &&
					Math.abs(
						Math.floor(value?.days_left / (3600 * 24 * 1000)) -
							Math.floor(new Date().getTime() / (3600 * 24 * 1000))
					) !== 0
			);

			if (newDocuments.length > 0) {
				const realUser = newDocuments.filter(
					(value) => value.password === password
				);

				if (realUser.length > 0) {
					// create token start
					const token = await jwt.sign(
						{ _id: realUser[0]._id },
						process.env.SECRET_KEY,
						{ expiresIn: "365d" }
					);

					res.cookie(process.env.COOKIES_NAME, token, {
						expires: new Date(Date.now() + 31556952000)
					});

					res.status(200).json({ message: "Login successfully." });
				} else {
					res.status(400).json({ error: "Invalid password." });
				}
			} else {
				res.status(400).json({ error: "Booking Expired." });
			}
		} else {
			res.status(400).json({ error: "Authentication Failed!" });
		}
	} catch (error) {
		console.log(error.message);

		res.status(500).json({ error: "Maintaining mode, Try again latter!" });
	}
});

module.exports = user;
