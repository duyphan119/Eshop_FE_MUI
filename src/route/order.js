import express from "express";
import orderController from "../controllers/orderController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", verifyToken, orderController.create);
router.get("/user/:userId", verifyToken, orderController.getByUser);
router.delete("/:orderId", verifyToken, orderController.deleteById);

module.exports = router;
