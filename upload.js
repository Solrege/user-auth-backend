/*const multer = require('multer')
const imageFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb("Solo se pueden subir imágenes.", false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/') //directorio?
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage, fileFilter : imageFilter, });

module.exports = upload*/