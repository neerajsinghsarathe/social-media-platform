const mongoose = require('mongoose').default;

const postSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true,
        unique: true,
    },
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
