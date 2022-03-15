import express from "express";
import cartController from "../controllers/cartController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/user/:userId", cartController.getByUser);
router.get("/:cartItemId", cartController.getById);
router.post("/", verifyToken, cartController.create);
router.put("/:cartItemId", cartController.update);
router.delete("/:cartItemId", cartController.delete);

module.exports = router;
