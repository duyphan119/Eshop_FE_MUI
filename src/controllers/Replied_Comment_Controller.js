const { create, update } = require("../services/Replied_Comment_Service");

const Replied_Comment_Controller = {
  create: async (req, res) => {
    const { status, data } = await create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await update(req.body);
    res.status(status).json(data);
  },
};
module.exports = Replied_Comment_Controller;
