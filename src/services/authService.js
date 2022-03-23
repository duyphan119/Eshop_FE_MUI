import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models";
const sgMail = require("@sendgrid/mail");
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const login = async (body, res) => {
  try {
    const { email, password } = body;
    // Check email
    const checkedUser = await db.User.findOne({
      where: { email: email },
      raw: true,
    });
    if (!checkedUser) {
      return { status: 500, data: "Email or password can be incorrect" };
    }
    // Check password
    const decoded = bcrypt.compareSync(password, checkedUser.hash);
    if (!decoded) {
      return { status: 500, data: "Email or password can be incorrect" };
    }
    // Create access token
    const accessToken = createAccessToken({
      id: checkedUser.id,
      isAdmin: checkedUser.isAdmin,
    });
    // Create refresh token
    createRefreshToken(
      {
        id: checkedUser.id,
        isAdmin: checkedUser.isAdmin,
      },
      res
    );
    // Remove hash in response
    const { hash, ...others } = checkedUser;
    return { status: 200, data: { ...others, accessToken } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const register = async (body) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      avatar,
      gender,
      birthday,
      phoneNumber,
      isAdmin,
    } = body;
    // Check email
    const checkedUser = await db.User.findOne({
      where: { email: email },
      raw: true,
    });
    if (checkedUser) {
      console.log("ngu");
      return { status: 500, data: "Email was available" };
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const id = (
      (new Date().getTime() * Math.random()) /
      Math.random()
    ).toString();
    await db.User.create({
      id,
      email,
      hash,
      firstName,
      lastName,
      avatar,
      gender,
      birthday,
      phoneNumber,
      isAdmin: isAdmin ? isAdmin : false,
    });
    return { status: 200, data: "Your account is registered" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const refreshToken = async (cookies) => {
  try {
    const token = cookies.refreshToken;
    // Check cookie
    if (!token) {
      return { status: 401, data: "Token is invalid" };
    }
    // Verify token
    const user = jwt.verify(token, process.env.REFRESH_TOKEN);
    if (!user) {
      return { status: 401, data: "Token is expired" };
    }
    // Create new access token
    const accessToken = createAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
    });
    return { status: 200, data: { accessToken } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const oauthSuccess = async (reqUser, res) => {
  try {
    if (reqUser) {
    const user = reqUser._json;
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
        return { status: 200, data: { ...newUser.dataValues, accessToken } };
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
const getAuthenticatedEmailCode = async (body) => {
  const { email } = body;

  const code = {
    value: Math.floor(Math.random() * 999999).toString(),
    expiresIn: 99 * 1000,
  };
  const message = {
    to: [email],
    from: "duychomap123@gmail.com",
    subject: "Verify email",
    text: "Verify email",
    html: `Your code is <b>${code.value}</b>`,
  };
  sgMail
    .send(message)
    .then((response) => {
      return { status: 200, data: code };
    })
    .catch((error) => {
      console.log(error);
      return { status: 500, data: error };
    });
};
const createAccessToken = (obj) => {
  const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  return accessToken;
};
const createRefreshToken = (obj, res) => {
  const refreshToken = jwt.sign(obj, process.env.REFRESH_TOKEN, {
    expiresIn: 30 * 24 * 60 * 60 * 1000,
  });
  // Set refresh token to cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
};

module.exports = {
  login,
  register,
  refreshToken,
  getAuthenticatedEmailCode,
  oauthSuccess,
};
