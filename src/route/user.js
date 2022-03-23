import express from "express";
import userController from "../controllers/userController";
import { verifyAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/:userId", userController.getById);
router.get("/", verifyAdmin, userController.getAll);
router.post("/", userController.create);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.delete);

module.exports = router;
