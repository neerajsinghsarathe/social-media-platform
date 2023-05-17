const {User} = require("../models/user");

async function getAllRequests(req, res) {
    try {
        const user = req.query.id;
        const request = await User.findOne({userID: user}, {friendRequests : 1, _id : 0});
        return res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function getAllFriends(req, res) {
    try {
        const id = req.query.id
        const request = await User.findOne({userID: id},{friendsList : 1, _id : 0});
        return res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function createRequest(req, res) {
    try {
        const userDetails = req.body;
        const request = await User.findOne({userID: req.body.receiverID, friendRequests: req.body.senderID})
        if (request) {
            return res.status(409).json({
                status: false,
                statusCode: 404,
                error: "Request already exists"
            });
        }
        await User.findOneAndUpdate({userID: req.body.receiverID}, {
            $push: {friendRequests: req.body.senderID}
        })
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Request Sent"
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function updateRequest(req, res) {
    try {
        const userDetails = req.body;

        if (req.body.status === 'accept'){
            const request = await User.findOne({userID: req.body.receiverID, friendsList: req.body.senderID})
            if (request) {
                return res.status(409).json({
                    status: false,
                    statusCode: 404,
                    error: "Friend already exists"
                });
            }
            await User.findOneAndUpdate({userID: req.body.receiverID}, {
                $pull: {friendRequests: req.body.senderID},
                $push: {friendsList : req.body.senderID}
            })
            return res.status(200).json({
                status: true,
                statusCode: 201,
                message: "Request Accepted"
            });
        }else if(req.body.status === 'reject'){
            await User.findOneAndUpdate({userID: req.body.receiverID}, {
                $pull: {friendRequests: req.body.senderID}
            })
            return res.status(200).json({
                status: true,
                statusCode: 201,
                message: "Request Rejected"
            });
        }else{
            return res.status(400).json({
                status: true,
                statusCode: 400,
                message: "Bad Request"
            });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}


module.exports = {
    getAllRequests,
    createRequest,
    updateRequest,
    getAllFriends
}
