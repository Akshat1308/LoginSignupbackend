const express = require("express");
const {
    registerUser,
    loginUser,
    getUserDetails,
    logout,
    Getcourse
} = require("../controllers/userController.js");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/course").get(Getcourse);

module.exports = router;
