import express from "express";
import imagesProductController from "../controllers/imagesProductController";
import { verifyAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/product/slug/:productSlug", imagesProductController.getByProductSlug);
router.get("/product/:productId", verifyAdmin, imagesProductController.getByProductId);
router.get("/:imagesProductId", imagesProductController.getById);
router.post("/", imagesProductController.create);
router.put("/:imagesProductId", imagesProductController.update);
router.delete("/:imagesProductId", imagesProductController.delete);

module.exports = router;
