const router = require('express').Router();
const Transaction = require('../models/transactionsModel');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require("../models/userModel");

const stripe = require('stripe')(process.env.stripe_key);

const { v4: uuid } = require('uuid');

 
// transfer money from one acount to another

router.post('/transfer-fund', authMiddleware, async (req, res) => {
    try {
        const { sender, receiver, amount, reference } = req.body;

        // Ensure that sender and receiver are different and amount is valid
        if (sender === receiver) {
            return res.status(400).json({ message: "Sender and receiver cannot be the same." });
        }

        // Fetch user data for sender and receiver
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
            return res.status(404).json({ message: "Sender or receiver not found." });
        }

        // Ensure sender has sufficient balance
        if (senderUser.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance." });
        }

        // Create the transaction
        const newTransaction = new Transaction({
            sender,
            receiver,
            amount,
            reference: reference || "No reference",
            status: "success",
        });

        await newTransaction.save();

        // Update sender's balance (decrease) and receiver's balance (increase)
        await User.findByIdAndUpdate(sender, {
            $inc: { balance: -amount }, // Decrease sender's balance
        });
        await User.findByIdAndUpdate(receiver, {
            $inc: { balance: amount }, // Increase receiver's balance
        });

        res.send({
            message: "Transaction successful",
            data: newTransaction,
            success: true,
        });
    } catch (error) {
        res.send({
            message: "Transaction failed",
            data: error.message,
            success: false,
        });
    }
});


// verify receiver's account number

router.post("/verify-account", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });
        if (user) {
            res.send({
                message: "account verified",
                data: user,
                success: true,
            });
        } else {
            res.send({
                message: "account not found",
                data: null,
                success: false,
            });
        }
    } catch (error) {
        res.send({
            message: "account not found",
            data: error.message,
            success: false,
        });
    }
});
// get all transactions for a user

router.post(
    "/get-all-transactions-by-user",
    authMiddleware,
    async (req, res) => {
        try {
            const transactions = await Transaction.find({
                $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
            }).sort({ createdAt: -1 }).populate("sender").populate("receiver");
            res.send({
                message: "Transactions fetched",
                data: transactions,
                success: true,
            });
        } catch (error) {
            res.send({
                message: "Transactions not fetched",
                data: error.message,
                success: false,
            });
        }
    }
);

// deposit funcs using stripe

router.post("/deposit-funds", authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body
        if (!token || !amount) {
            return res.status(400).json({ error: "Token and amount are required." });
        }
        //    Create a customer in Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const charge = await stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: "Deposited to Krishi Bank"
            },
            {
                idempotencyKey: uuid()
            }
        );
        if(charge.status === "succeeded"){
            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId,
                amount: amount,
                type: "deposit",
                reference: "stripe deposit",
                status: "success"
            });
            await newTransaction.save();

             await User.findByIdAndUpdate(
                req.body.userId,
                { $inc: { balance: amount } },
                { new: true } // Return the updated document
            );
             
            res.send({
                message: "Transaction Successful",
                data: newTransaction,
                success: true,
            })
        }else{
            res.send({
                message: "Transaction Failed",
                data: charge,
                success: false,
            })
        }
    } catch (error) {
        res.send({
            message: "Transaction Failed",
            data: error.message,
            success: false,
        })

    }
})
module.exports = router;