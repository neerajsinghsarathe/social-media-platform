const mongoose = require('mongoose').default;

const postSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    }
}, {timestamps: true});
