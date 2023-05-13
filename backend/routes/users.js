const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, profileUpdate, login} = require("../controller/user");

/* GET users listing. */
router
    .get('/', getAllUsers)
    .post("/create", createUser)
    .post("profileUpdate", profileUpdate)
    .post("/login", login)


module.exports = router;
