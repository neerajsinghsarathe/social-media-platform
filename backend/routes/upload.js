const express = require('express');
const router = express.Router();
const multer = require("multer");
const {mediaUpload} = require("../controller/upload");
const path = require("path");

router
    .post("/",mediaUpload)


module.exports = router;
