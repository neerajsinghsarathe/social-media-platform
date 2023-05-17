const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const requestRouter = require('./routes/friendRequest');
const {connectDB} = require("./bin/db");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


// connectDB("mongodb://127.0.0.1:27017/social-media-platform")
connectDB("mongodb+srv://saipreethiasuri8:preethi8@cluster0.kwcegjd.mongodb.net/social-media-platform?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log("error", err);
    });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/request', requestRouter);

module.exports = app;
