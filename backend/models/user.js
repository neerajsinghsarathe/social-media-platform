const mongoose = require('mongoose').default;

const genderChoices = ['Male', 'Female', 'Non-binary'];

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: genderChoices
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    },
    friendRequests: [{
        type: mongoose.Schema.Types.String,
        ref: 'user',
        unique : true
    }],
    friendsList: [{
        type: mongoose.Schema.Types.String,
        ref: 'user',
        unique : true
    }]
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}
