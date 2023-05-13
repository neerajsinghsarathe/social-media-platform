const mongoose = require('mongoose').default;

const statusChoices = [true, false];
const requestsSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    accepted: {
        type: String,
        enum: statusChoices,
        default: false

    }

}, {timestamps: true});
