const User_Controller = require("../controllers/User_Controller");
const { verifyTokenUserAndAdmin } = require("../middleware/Auth_Middleware");
const router = require("express").Router();

router.put("/:user_id", User_Controller.update);

module.exports = router;
