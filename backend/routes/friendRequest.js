const express = require('express');
const router = express.Router();
const {
    getAllRequests,
    createRequest,
    getAllFriends,
    updateRequest
} = require("../controller/friendRequest")

router
    .get('/getAllRequests',getAllRequests)
    .get('/getAllFriends',getAllFriends)
    .post('/createRequest',createRequest)
    .post('/updateRequest',updateRequest)


module.exports = router;
