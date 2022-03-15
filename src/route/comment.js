import express from "express";
import commentController from "../controllers/commentController";
const router = express.Router();

// router.get("/:commentId", commentController.getById);
// router.get("/", commentController.getAll);
router.post("/", commentController.create);
// router.put("/:commentId", commentController.update);
// router.delete("/:commentId", commentController.delete);

module.exports = router;
