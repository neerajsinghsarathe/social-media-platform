const mongoose = require('mongoose').default;

const statusChoices = ['requested', 'accepted','declined'];
const requestsSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.userName,
        ref: 'user',
        required : true
    },
    receiverID: {
        type: mongoose.Schema.Types.userName,
        ref: 'user',
        required : true
    },
    status: {
        type: String,
        enum: statusChoices,
        required: true,
        default: false

    }
}, {timestamps: true});
