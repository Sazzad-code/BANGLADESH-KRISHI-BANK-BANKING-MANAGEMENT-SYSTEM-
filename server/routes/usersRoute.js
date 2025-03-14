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
        const salt = await bcrypt.genSalt(10); 
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

        // check if user is valid
        if(!user.isverified){
            return res.send({
                success: false,
                message: "User is not verified yet or has been suspended"
            })
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
        
        user.password=""
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
// get all users

router.get("/get-all-users", authMiddleware, async(req,res)=>{
    try {
        const users = await User.find();
        res.send({
            message: "Userfetched successfully",
            data: users,
            success: true,
        })
    } catch (error) {
        res.send({
            message:error.message,
            success: false,
        })
     
    }
})

// Update user verified status

router.post('/update-user-verified-status', authMiddleware,  async(req, res)=>{
    try {   
       await User.findByIdAndUpdate(req.body.selectedUser, {
            isverified: req.body.isverified,
        })

        res.send({
            data: null,
            message:"User verified status updated successfully",
            success: true,
        });
    } catch (error) {
        res.send({
            data: error,
            message: error.message,
            success: false,
        });
    }
})

// Edit user data 

// Route to update user details (only accessible by admin)
router.put("/update-user-details", authMiddleware, async (req, res) => {

    console.log('im here')
    try {
        const { userId, firstName, lastName, email, phoneNumber } = req.body;
        
        // Ensure the user is authenticated and is an admin
        // if (!req.user || req.user.role !== 'admin') {
        //     return res.status(403).send({
        //         success: false,
        //         message: "You do not have permission to perform this action.",
        //     });
        // }

        // Find the user by userId and update their details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, phoneNumber },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        res.send({
            success: true,
            message: "User details updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
