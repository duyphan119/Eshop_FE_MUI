import express from "express";
import categoryController from "../controllers/categoryController";
const router = express.Router();

router.get("/slug/:categorySlug", categoryController.getBySlug);
router.get("/buyerTypeSlug/:buyerTypeSlug", categoryController.getByBuyerTypeSlug);
router.get("/:categoryId", categoryController.getById);
router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.put("/:categoryId", categoryController.update);
router.delete("/:categoryId", categoryController.delete);

module.exports = router;
