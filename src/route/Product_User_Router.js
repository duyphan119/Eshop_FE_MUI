const Product_User_Controller = require("../controllers/Product_User_Controller");
const { getUser, verifyToken } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.get("/user", getUser, Product_User_Controller.getByUser);
router.get("/:id", Product_User_Controller.getById);
router.post("/", verifyToken, Product_User_Controller.create);
router.put("/", Product_User_Controller.update);
router.delete("/:id", verifyToken, Product_User_Controller._delete);

module.exports = router;
