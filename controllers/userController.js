const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const Course = require ("../models/CourseModel.js");
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHander("All fields are compulsory!!!", 400));
    }

    const user = await User.create({
        name,
        email,
        password
    });

    sendToken(user, 201, res);
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});



// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: "false"
    });
  

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
  

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  // get course
  exports.Getcourse = catchAsyncErrors(async (req, res, next) => {

// const temp = await Course.create({
//     Coursename:"MERN stack fundaments part 2",
//     Duration: "5 hour"

// })

    const data = await Course.find({})

    res.status(200).json({
      "success": true,
      "message": "courses recieved",
      "dataRecieved":data
    });
  });