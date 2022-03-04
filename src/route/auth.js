import express from "express";
import authController from "../controllers/authController";
let router = express.Router();

router.post("/login", authController.login);

module.exports = router;
