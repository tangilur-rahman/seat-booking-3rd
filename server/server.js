// external modules
const express = require("express");
const path = require("path");
require("dotenv").config();

// internal modules
const userRouter = require("./router/userRouter");

// express server
const app = express();

// connection with mongodb
require("./Config/ConnectMongoDB");

// application-level middleware
app.use(express.json());

// routers
app.use("/user", userRouter);

// deploy on heroku
if (process.env.NODE_ENV == "production") {
	app.use(express.static("build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/build/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("client disconnected");
	});
}
// submit on remote server end

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
