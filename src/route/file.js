import express from "express";
import fileController from "../controllers/fileController";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/imgs/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const splitFileName = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        splitFileName[splitFileName.length - 1]
    );
  },
});

const upload = multer({ storage: storage });
router.post(
  "/upload-image",
  upload.single("avatar"),
  fileController.uploadImage
);

module.exports = router;
