const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); //coversion to json
const cors = require("cors"); // to give permission to back end to communicate with the hosted front end
const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config.env" });
}


app.use(cors({
    origin: ['https://localhost:3000','*'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports

const user = require("./routes/userRoute.js");


app.use("/api/v1", user);


app.get("*", (req, res) => {
    res.send("Wrong URL recieved!!!");
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
