const Comment_Controller = require("../controllers/Comment_Controller");
const { verifyToken } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.post("/", verifyToken, Comment_Controller.create);
router.put("/", Comment_Controller.update);

module.exports = router;
