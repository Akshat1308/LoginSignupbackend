const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    console.log("is authenticated middleware started....");
    console.log("cookies : ", req.cookies);

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander(`Please Login to access this resource, ${token}`, 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

