const Upload_Controller = require("../controllers/Upload_Controller");
const upload = require("../middleware/Upload_Middleware");

const router = require("express").Router();

router.post("/", upload.array("images", 20), Upload_Controller.upload);

module.exports = router;
