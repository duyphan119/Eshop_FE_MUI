const {
  login,
  register,
  refreshToken,
  getAuthenticatedEmailCode,
  oauthSuccess,
} = require("../services/Auth_Service");
const authController = {
  login: async (req, res) => {
    const response = await login(req.body, res);
    res.status(response.status).json(response.data);
  },
  register: async (req, res) => {
    const response = await register(req.body);
    res.status(response.status).json(response.data);
  },
  refreshToken: async (req, res) => {
    const response = await refreshToken(req.cookies);
    res.status(response.status).json(response.data);
  },
  logout: (req, res) => {
    res.clearCookie("refresh_token");
    res.status(200).json("Log out successful");
  },
  oauthSuccess: async (req, res) => {
    const response = await oauthSuccess(req.user, res);
    res.status(response.status).json(response.data);
  },
  getAuthenticatedEmailCode: async (req, res) => {
    const response = await getAuthenticatedEmailCode(req.body);
    res.status(response.status).json(response.data);
  },
  verifyEmail: (req, res) => {},
};
module.exports = authController;
