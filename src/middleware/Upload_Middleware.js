const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/imgs/");
  },
  filename: function (req, file, cb) {
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

module.exports = upload;
