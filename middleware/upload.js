const moment = require('moment');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, 'media/');
    },
    filename(request, file, callback) {
        const date = moment().format('YYYYMMDD-HHmmss_SSS');
        callback(null, `${date}_${file.originalname}`);
    }
});

const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5
};

module.exports = multer({storage, fileFilter, limits});