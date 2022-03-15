import express from "express";
import groupCategoryController from "../controllers/groupCategoryController";
const router = express.Router();

router.get("/slug/:groupCategorySlug", groupCategoryController.getBySlug);
router.get("/buyerTypeSlug/:buyerTypeSlug", groupCategoryController.getByBuyerTypeSlug);
router.get("/:groupCategoryId", groupCategoryController.getById);
router.get("/", groupCategoryController.getAll);
router.post("/", groupCategoryController.create);
router.put("/:groupCategoryId", groupCategoryController.update);
router.delete("/:groupCategoryId", groupCategoryController.delete);

module.exports = router;


