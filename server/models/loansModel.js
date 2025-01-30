const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    amount: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    }
},
    {
        timestamps: true,
    }

)
module.exports = mongoose.model("loans", loansSchema);