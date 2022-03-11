import express from "express";
import authController from "../controllers/authController";
import passport from "passport";
import "../config/configPassport";
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refreshToken);
router.post("/verify-email", authController.verifyEmail);
router.post("/send-email", authController.getAuthenticatedEmailCode);
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "user_birthday",
      "user_gender",
      "user_photos",
      "public_profile",
    ],
  })
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get("/oauth/success", authController.oauthSuccess);
router.get("/login/failed", (req, res) => {
  req.logOut();
  res.status(200).json();
});
router.get("/logout", (req, res) => {
  req.logOut();
  res.status(200).json();
});
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    successRedirect: "http://localhost:3000/oauth/success",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    successRedirect: "http://localhost:3000/oauth/success",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
module.exports = router;
