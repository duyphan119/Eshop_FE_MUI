const { upload } = require("../services/Upload_Service");

const Upload_Controller = {
  upload: async (req, res) => {
    const { status, data } = await upload(req.files);
    res.status(status).json(data);
  },
};
module.exports = Upload_Controller;
