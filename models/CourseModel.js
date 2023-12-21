const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CourseSchema = new mongoose.Schema({
    Coursename: {
        type: String
    },
    Duration: {
        type: String,
    },
});

module.exports = mongoose.model("Courses", CourseSchema);
