import express from "express";
import buyerTypeController from "../controllers/buyerTypeController";
const router = express.Router();

router.get("/slug/:buyerTypeSlug", buyerTypeController.getBySlug);
router.get("/:buyerTypeId", buyerTypeController.getById);
router.get("/", buyerTypeController.getAll);
router.post("/", buyerTypeController.create);
router.put("/:buyerTypeId", buyerTypeController.update);
router.delete("/:buyerTypeId", buyerTypeController.delete);

module.exports = router;


