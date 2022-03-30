import express from "express";
import productController from "../controllers/productController";
import { getUser } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/slug/:productSlug", getUser, productController.getBySlug);
router.get(
  "/category-slug/:categorySlug",
  getUser,
  productController.getByCategorySlug
);
router.get("/:productId", productController.getById);
router.get("/", getUser, productController.getAll);
router.post("/", productController.create);
router.put("/:productId", productController.update);
router.delete("/:productId", productController.delete);

module.exports = router;
