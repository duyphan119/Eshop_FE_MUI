import express from "express";
import collectionProductController from "../controllers/collectionProductController";
import { getUser } from "../middleware/authMiddleware";
const router = express.Router();

// router.get("/slug/:collectionProductSlug", getUser, collectionProductController.getBySlug);
// router.get(
//   "/category-slug/:categorySlug",
//   getUser,
//   collectionProductController.getByCategorySlug
// );
// router.get("/pages", collectionProductController.getTotalPages);
// router.get("/:collectionProductId", collectionProductController.getById);
router.get("/", collectionProductController.getAll);
// router.post("/", collectionProductController.create);
// router.put("/:collectionProductId", collectionProductController.update);
// router.delete("/:collectionProductId", collectionProductController.delete);

module.exports = router;
