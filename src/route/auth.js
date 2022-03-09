import express from "express";
import authController from "../controllers/authController";
import passport from "passport";
import "../config/configPassport";
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refreshToken);
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
router.get("/facebook/success", (req, res) => {
  console.log(req);
  res.status(200).json();

});
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
    successRedirect: "/v1/api/auth/facebook/success",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
module.exports = router;
