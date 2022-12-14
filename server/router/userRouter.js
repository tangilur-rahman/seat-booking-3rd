// external modules
const user = require("express").Router();
const fast2sms = require("fast-two-sms");

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
			getDay
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
					date: new Date().toISOString().slice(0, 10)
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
			getDay
		} = req.body;

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
					date: new Date().toISOString().slice(0, 10)
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

module.exports = user;
