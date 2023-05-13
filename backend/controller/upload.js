const multer = require("multer");
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(),"public","images"))
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split(".")[0] + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('file');

async function mediaUpload(req, res) {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.status(500).send(res.status(500).json(err));
            } else {
                const path = req.file.path;
                res.status(201).json({
                    status: true,
                    statusCode: 201,
                    message: "Upload success",
                    path : path
                });
            }
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    mediaUpload
}
