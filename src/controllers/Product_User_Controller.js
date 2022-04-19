const {
  getById,
  create,
  update,
  _delete,
  getByUser,
} = require("../services/Product_User_Service");

const Product_User_Controller = {
  getById: async (req, res) => {
    const { status, data } = await getById(req.params.id);
    res.status(status).json(data);
  },
  getByUser: async (req, res) => {
    const { status, data } = await getByUser(req.user, req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await create(req.user, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await update(req.body);
    res.status(status).json(data);
  },
  _delete: async (req, res) => {
    const { status, data } = await _delete(req.params.id);
    res.status(status).json(data);
  },
};
module.exports = Product_User_Controller;
