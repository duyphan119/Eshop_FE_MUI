import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models";
const sgMail = require("@sendgrid/mail");
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const oauthSuccess = async (user) => {
  try {
    if (user) {
      const user = user._json;
      // Check email
      const resUser = await db.User.findOne({
        where: { email: user.email },
        raw: true,
      });
      if (!resUser) {
        const id = (
          (new Date().getTime() * Math.random()) /
          Math.random()
        ).toString();
        let newUser;
        if (user.provider === "facebook") {
          newUser = await db.User.create({
            firstName: user.first_name,
            lastName: user.last_name,
            avatar: user.picture.data.url,
            gender: user.gender === "male" ? true : false,
            isAdmin: false,
            birthday: user.birthday,
            email: user.email,
            id,
          });
        } else if (user.provider === "google") {
          newUser = await db.User.create({
            firstName: user.given_name,
            lastName: user.family_name,
            avatar: user.picture,
            gender: user.gender === "male" ? true : false,
            isAdmin: false,
            birthday: user.birthday,
            email: user.email,
            id,
          });
        }

        // Create access token
        const accessToken = createAccessToken({
          id: newUser.id,
          isAdmin: newUser.isAdmin,
        });
        // Create refresh token
        createRefreshToken(
          {
            id: newUser.id,
            isAdmin: newUser.isAdmin,
          },
          res
        );
        res.status(200).json({ ...newUser.dataValues, accessToken });
      } else {
        // Create access token
        const accessToken = createAccessToken({
          id: resUser.id,
          isAdmin: resUser.isAdmin,
        });
        // Create refresh token
        createRefreshToken(
          {
            id: resUser.id,
            isAdmin: resUser.isAdmin,
          },
          res
        );

        return { status: 200, data: { ...resUser, accessToken } };
      }
    }
    return { status: 500, data: "Fail" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = { oauthSuccess };
