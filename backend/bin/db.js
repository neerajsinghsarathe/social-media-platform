const mongoose = require('mongoose').default;


async function connectDB(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {
    connectDB
}
