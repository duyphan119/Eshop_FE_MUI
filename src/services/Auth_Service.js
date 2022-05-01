const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
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
    const decoded = bcrypt.compareSync(password, checkedUser.password);
    if (!decoded) {
      return { status: 500, data: "Email or password can be incorrect" };
    }
    // Create access token
    const access_token = createAccessToken({
      id: checkedUser.id,
      is_admin: checkedUser.is_admin,
    });
    // Create refresh token
    createRefreshToken(
      {
        id: checkedUser.id,
        is_admin: checkedUser.is_admin,
      },
      res
    );
    // Remove hash in response
    const { hash, ...others } = checkedUser;
    return { status: 200, data: { ...others, access_token } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const register = async (body) => {
  try {
    const { email, password } = body;
    console.log(body);
    // Check email
    const checkedUser = await db.User.findOne({
      where: { email: email },
      raw: true,
    });
    if (checkedUser) {
      return { status: 500, data: "Email was available" };
    }
    // Không hiểu tại sao id tự động tăng mà khi thêm vào database thì bị lỗi, bắt buộc id phải có giá trị.
    // Vì vậy nên phải tìm data cuối cùng rồi lấy id + 1
    // Các model khác không truyền giá trị cho id thì id sẽ tự động tăng. Còn riêng model User thì lạ lắm
    const id = await db.User.findAll({
      order: [["id", "desc"]],
      limit: 1,
    });
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await db.User.create({
      ...body,
      password: hash,
      id: id.length === 0 ? 1 : id[0].id + 1,
    });
    return { status: 200, data: "Your account is registered" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const refreshToken = async (cookies) => {
  try {
    const token = cookies.refresh_token;
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
    const access_token = createAccessToken({
      id: user.id,
      is_admin: user.is_admin,
    });
    return { status: 200, data: { access_token } };
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
        const id = await db.User.findAll({
          order: [["id", "desc"]],
          limit: 1,
        });
        let newUser;
        if (reqUser.provider === "facebook") {
          newUser = await db.User.create({
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.picture.data.url,
            gender: user.gender === "male" ? true : false,
            is_admin: false,
            birthday: user.birthday,
            email: user.email,
            id: id.length === 0 ? 1 : id[0].id + 1,
          });
        } else if (reqUser.provider === "google") {
          newUser = await db.User.create({
            first_name: user.given_name,
            last_name: user.family_name,
            avatar: user.picture,
            gender: user.gender === "male" ? true : false,
            is_admin: false,
            birthday: user.birthday,
            email: user.email,
            id: id.length === 0 ? 1 : id[0].id + 1,
          });
        }

        // Create access token
        const access_token = createAccessToken({
          id: newUser.id,
          is_admin: newUser.is_admin,
        });
        // Create refresh token
        createRefreshToken(
          {
            id: newUser.id,
            is_admin: newUser.is_admin,
          },
          res
        );
        return { status: 200, data: { ...newUser.dataValues, access_token } };
      } else {
        // Create access token
        const access_token = createAccessToken({
          id: resUser.id,
          is_admin: resUser.is_admin,
        });
        // Create refresh token
        createRefreshToken(
          {
            id: resUser.id,
            is_admin: resUser.is_admin,
          },
          res
        );
        return { status: 200, data: { ...resUser, access_token } };
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
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  login,
  register,
  refreshToken,
  getAuthenticatedEmailCode,
  oauthSuccess,
};
