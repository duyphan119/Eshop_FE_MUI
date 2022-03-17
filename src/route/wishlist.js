import express from "express";
import wishlistController from "../controllers/wishlistController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/user/:userId", verifyToken, wishlistController.getByUser);
router.get("/:wishlistId", wishlistController.getById);
router.post("/", verifyToken, wishlistController.create);
router.put("/:wishlistId", wishlistController.update);
router.delete("/:wishlistId", verifyToken, wishlistController.delete);

module.exports = router;
