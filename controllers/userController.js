const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");

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


