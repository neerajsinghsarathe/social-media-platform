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

async function profileUpdate(req, res) {
    try {
        const body = req.body;
        const user = User.findOneAndUpdate({userID: req.body.userID}, {
            bio: req.body.bio,
            media: req.body.image,
            gender: req.body.gender
        }, {new: true});
        if (user) {
            res.status(200).json({
                status: false,
                statusCode: 200,
                message: "Profile Updated"
            });
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function login(req, res) {
    const body = req.body;
    const user = await User.findOne({$and: [{$or: [{userID: body.userID}, {email: body.userID}]}, {password: body.password}]})
    console.log(user);
    if (user) {
        res.status(200).json({
            status: false,
            statusCode: 200,
            message: user
        });
        return 0;
    }
    res.status(404).json({
        status: false,
        statusCode: 404,
        error: "User Not Found"
    });
}

async function findByUser(req, res) {
    const body = req.body;
    const users = await User.find({userName: {$regex: req.body.name, $options: 'i'}});
    if (users) {
        res.status(200).json({
            status: false,
            statusCode: 200,
            message: users
        });
        return 0;
    }
    res.status(404).json("User Not Found");
}


module.exports = {
    getAllUsers,
    createUser,
    findByUser,
    profileUpdate,
    login
}
