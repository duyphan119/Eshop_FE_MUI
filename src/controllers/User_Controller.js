const { update } = require("../services/User_Service");

const User_Controller = {
  update: async (req, res) => {
    const { status, data } = await update(req.params, req.body);
    res.status(status).json(data);
  },
};
module.exports = User_Controller;
