const {
  getById,
  getByUser,
  create,
  update,
  _delete,
  mergeCart,
} = require("../services/Order_Service");

const Order_Controller = {
  getById: async (req, res) => {
    const { status, data } = await getById(req.params.id);
    res.status(status).json(data);
  },
  getByUser: async (req, res) => {
    const { status, data } = await getByUser(req.params.user_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await create(req.user, req.body, req.query);
    res.status(status).json(data);
  },
  mergeCart: async (req, res) => {
    const { status, data } = await mergeCart(req.user, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await update(req.user, req.body);
    res.status(status).json(data);
  },
  _delete: async (req, res) => {
    const { status, data } = await _delete(req.params.id);
    res.status(status).json(data);
  },
};
module.exports = Order_Controller;
