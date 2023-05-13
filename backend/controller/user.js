const {User} = require("../models/user");

async function getAllUsers(req, res) {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function createUser(req, res) {
    try {
        const userDetails = req.body;

        const exists = await User.findOne({$or: [{email: userDetails.email}, {userID: userDetails.userID}]});
        if (exists) {
            res.status(409).json({
                status: false,
                statusCode: 409,
                error: "User Already Exists"
            });
            return;
        }
        await User.create({
            userID: userDetails.userID,
            userName: userDetails.userName,
            password: userDetails.password,
            email: userDetails.email,
            gender: userDetails.gender,
        });

        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: "User Created"
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    getAllUsers,
    createUser
}
