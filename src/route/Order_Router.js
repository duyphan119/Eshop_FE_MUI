const Order_Controller = require("../controllers/Order_Controller");
const { verifyToken } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.get("/user/:user_id", Order_Controller.getByUser);
router.get("/:id", Order_Controller.getById);
// router.get("/", Order_Controller.getAll);
router.post("/", verifyToken, Order_Controller.create);
router.put("/", Order_Controller.update);
router.delete("/:id", Order_Controller._delete);

module.exports = router;
