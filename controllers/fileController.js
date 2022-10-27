const media_handler = require('../lib/media.handler');

module.exports = {
    upload: async (req, res) => {
        let url = [];
        for (let i = 0; i < req.files.length; i++) {
            url.push(await media_handler.cloudinaryUpload(req.files[i].path, req.params.folder))
        }
        res.status(200).json({
            code: "200",
            status: "OK",
            url: url
        })
    }
}