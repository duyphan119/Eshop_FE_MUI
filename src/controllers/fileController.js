import multer from "multer";
const fileController = {
  uploadImage: (req, res) => {
    console.log(req.file);
    res
      .status(200)
      .json(req.file.destination.split("public")[1] + req.file.filename);
  },
  uploadImages: (req, res) => {
    const images = [];
    console.log(req.files)
    req.files.forEach((file) => {
      images.push({
        image: file.destination.split("public")[1] + file.filename,
      });
    });
    res.status(200).json(images);
  },
};
module.exports = fileController;
