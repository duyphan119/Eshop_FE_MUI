import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models";
import authService from "../services/authService";
const sgMail = require("@sendgrid/mail");
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check email
    const checkedUser = await db.User.findOne({
      where: { email: email },
      raw: true,
    });
    if (!checkedUser) {
      return res.status(500).json("Email or password can be incorrect");
    }
    // Check password
    const decoded = bcrypt.compareSync(password, checkedUser.hash);
    if (!decoded) {
      return res.status(500).json("Email or password can be incorrect");
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
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const register = async (req, res) => {
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
    } = req.body;
    // Check email
    const checkedUser = await db.User.findOne({ where: { email: email } });
    if (checkedUser) {
      return res.status(500).json("Email was available");
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
    res.status(200).json("Your account is registered");
  } catch (error) {
    return res.status(500).json(error);
  }
};
const logout = (req, res) => {
  req.logOut();
  res.clearCookie("refreshToken");
  res.status(200).json("Log out successful");
};
const refreshToken = async (req, res) => {
  try {
    // Check cookie
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json("Token is invalid");
    }
    // Verify token
    const user = jwt.verify(token, process.env.REFRESH_TOKEN);
    if (!user) {
      return res.status(401).json("Token is expired");
    }
    // Create new access token
    const accessToken = createAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};
const oauthSuccess = async (req, res) => {
  try {
    const response = await authService.oauthSuccess(req.user);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(response.status).json(response.data);
  }
};

const getAuthenticatedEmailCode = async (req, res) => {
  const { email } = req.body;

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
      res.status(200).json(code);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

const verifyEmail = (req, res) => {};
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
  logout,
  refreshToken,
  oauthSuccess,
  verifyEmail,
  getAuthenticatedEmailCode,
};
