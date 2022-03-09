import express from "express";
import cartController from "../controllers/cartController";
const router = express.Router();

router.get("/user/:userId", cartController.getByUser);
router.get("/:cartItemId", cartController.getById);
router.post("/", cartController.create);
router.put("/:cartItemId", cartController.update);
router.delete("/:cartItemId", cartController.delete);

module.exports = router;
