import express from "express";
import imagesProductController from "../controllers/imagesProductController";
const router = express.Router();

router.get("/product/slug/:productSlug", imagesProductController.getByProductSlug);
router.get("/:imagesProductId", imagesProductController.getById);
router.post("/", imagesProductController.create);
router.put("/:imagesProductId", imagesProductController.update);
router.delete("/:imagesProductId", imagesProductController.delete);

module.exports = router;
