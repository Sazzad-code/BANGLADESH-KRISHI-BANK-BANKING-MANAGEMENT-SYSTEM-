const router = require('express').Router();
const Request = require('../models/loansModel');
const User = require('../models/userModel');  // Import the User model to check user role
const authMiddleware = require('../middlewares/authMiddleware');


// get all requests for user or admin
router.post("/get-all-loans-by-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId); // Query user using the userId from the decoded token

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Admin: Get all requests from all users
        if (user.isAdmin) {
            const requests = await Request.find()
                .populate("sender", "firstName lastName")
                .populate("receiver", "firstName lastName");
            return res.send({
                data: requests,
                message: "Requests fetched successfully",
                success: true
            });
        } else {
            // Regular user: Get only the requests they have sent
            const requests = await Request.find({ sender: user._id })
                .populate("sender", "firstName lastName")
                .populate("receiver", "firstName lastName");
            return res.send({
                data: requests,
                message: "Requests fetched successfully",
                success: true
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// send loan request to admin


// Send loan request to the first admin
router.post("/send-request", authMiddleware, async(req, res) => {
    try {
        const { amount, description } = req.body;

        // Find the first admin user
        const admin = await User.findOne({ isAdmin: true });
        
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "No admin found to send the loan request."
            });
        }

        // Create and save the loan request
        const request = new Request({
            sender: req.body.userId,
            receiver: admin._id,  // Automatically set the receiver to the found admin
            amount,
            description: description || "No description",
            status: "pending"
        });

        await request.save();

        res.send({
            success: true,
            message: "Loan request sent successfully",
            data: request
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Accept loan request
router.post("/accept-loan", authMiddleware, async (req, res) => {
    try {
        const { requestId } = req.body;

        // Find the loan request by ID
        const request = await Request.findById(requestId).populate("sender receiver");
        
        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Loan request not found.",
            });
        }

        // Update loan status to 'success' (accepted)
        request.status = 'success';
        await request.save();

        // Transfer funds (this will vary depending on your implementation)
        const receiver = await User.findById(request.receiver._id);
        if (receiver) {
            // Simulate transferring funds by updating the receiver's balance
            receiver.balance += request.amount; // Assuming balance field exists
            await receiver.save();
        }

        res.send({
            success: true,
            message: "Loan request accepted and funds transferred.",
            data: request,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Reject loan request
router.post("/reject-loan", authMiddleware, async (req, res) => {
    try {
        const { requestId } = req.body;

        // Find the loan request by ID
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Loan request not found.",
            });
        }

        // Update loan status to 'rejected'
        request.status = 'rejected';
        await request.save();

        res.send({
            success: true,
            message: "Loan request rejected.",
            data: request,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
