const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    autoIndex: true,
})
    .then(() => console.log("DB Connection Successful!"))
    .catch(err => console.log(err));

app.use(express.json());

// set up routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(8800, () => {
    console.log("Backend server is running!");
})