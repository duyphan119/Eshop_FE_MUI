import multer from "multer";
const fileController = {
  uploadImage: (req, res) => {
    console.log(req.file);
    res.status(200).json(req.file.destination.split("public")[1] + req.file.filename);
  },
};
module.exports = fileController;
