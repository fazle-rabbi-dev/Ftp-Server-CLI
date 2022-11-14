const multer = require('multer');
const UPLOAD_FOLDER = './Uploads';

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,UPLOAD_FOLDER);
  },
  filename: (req,file,cb) => {
    const uniqNumber = Date.now();
    cb(null,uniqNumber+file.originalname);
  }
});

const upload = multer({
   storage
});

module.exports = upload;