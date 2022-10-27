require('dotenv').config()
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', process.env.UPLOAD_DIR);

// inisiasi multer storage
const storage = multer.diskStorage({
    // handler
    destination: (req, file, callback) => {
        callback(null, UPLOAD_DIR);
    },
    // mengambil name 
    filename: (req, file, callback) => {
        const uniqueSuffix = new Date().getTime()
        callback(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`); 
    }
})

// inisiasi midlleware express
const upload = multer({
    storage: storage,
    // filter
    fileFilter: (req, file, callback) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg') {
            return callback(null, true)
        } else {
            callback(null, false)
            return callback(new Error("unsupported file type"))
        }
    }
}) 

// init cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// function upload ke cloud
async function cloudinaryUpload(filePath, folder) {
    if (typeof folder != "string" ) {
        folder = 'images'
    } 
    if (folder === " ") {
        folder = 'images'
    }
    let result
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true,
            folder: folder
        })
    } catch (error) {
        console.error(error)
        return ""
    }

    fs.unlinkSync(filePath)

    return result.url
}

module.exports = {
    upload,
    cloudinaryUpload
}