const express = require('express')
const fileController = require('../../controllers/fileController');
const media_handler = require('../../lib/media.handler');
const authorize = require('../../middlewares/jwt');

const router = express.Router()

router.post('/upload/:folder',authorize, media_handler.upload.array('image'), fileController.upload);

module.exports = router