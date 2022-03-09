import express from "express";
import productController from "../controllers/productController";
const router = express.Router();

router.get("/slug/:productSlug", productController.getBySlug);
router.get("/:productId", productController.getById);
router.get("/", productController.getAll);
router.post("/", productController.create);
router.put("/:productId", productController.update);
router.delete("/:productId", productController.delete);

module.exports = router;
