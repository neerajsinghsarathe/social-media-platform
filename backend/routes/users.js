const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, profileUpdate, login, findByUser} = require("../controller/user");

/* GET users listing. */
router
    .get('/', getAllUsers)
    .post("/create", createUser)
    .post("profileUpdate", profileUpdate)
    .post("/login", login)
    .post('/findByUser',findByUser)


module.exports = router;
