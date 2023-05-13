const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {connectDB} = require("./bin/db");
const multer  =   require('multer');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



connectDB("mongodb://127.0.0.1:27017/social-media-platform")
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log("error", err);
        process.exit();
    });


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
