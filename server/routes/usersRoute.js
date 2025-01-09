const router = require("express").Router();
const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register user account

router.post("/register", async (req, res) => {
    try {
        //check if user already exists

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10); // Correct method name: genSalt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "user created successfully",
            data: null,
            success: true,
        });
    }
    catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//login user account 

router.post("/login", async (req, res) => {
    try {
        //check if user exists
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                seccess: false,
                message: "User does not exist",
            });
        }
        // check if password is correct  
        const validpassword = await bcrypt.compare(req.body.password, user.password);
        if (!validpassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }
        //generate token


        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1h",
        });
        res.send({
            message: "User logged in Successfully",
            data: token,
            success: true,
        });

    } catch (error) {

        res.send({
            message: error.message,

            success: false,
        });
    }

});
// get user info

router.post("/get-user-info", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
    
        res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,

        });
    } catch (error) {
        res.send({

            message: error.message,
            success: false,

        });
    }
});

module.exports = router;
