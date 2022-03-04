const { loginService } = require("../services/authService");

let login = (req, res) => {
  let responseData = loginService(req.body);
  res.status(200).json(responseData);
};

module.exports = { login };
