import express from "express";
import sizeController from "../controllers/sizeController";
const router = express.Router();

router.get("/product/slug/:productSlug", sizeController.getByProductSlug);
router.get("/:sizeId", sizeController.getById);
router.post("/", sizeController.create);
router.put("/:sizeId", sizeController.update);
router.delete("/:sizeId", sizeController.delete);

module.exports = router;
