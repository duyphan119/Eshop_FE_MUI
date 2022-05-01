const Replied_Comment_Controller = require("../controllers/Replied_Comment_Controller");
const { verifyToken } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.post("/", verifyToken, Replied_Comment_Controller.create);
router.put("/", Replied_Comment_Controller.update);

module.exports = router;
