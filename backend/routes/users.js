const express = require('express');
const router = express.Router();
const {getAllUsers, createUser} = require("../controller/user");

/* GET users listing. */
router
    .get('/', getAllUsers)
    .post("/create", createUser)


;

module.exports = router;
