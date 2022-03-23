import orderService from "../services/orderService";
const orderController = {
  create: async (req, res) => {
    const response = await orderService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getByUser: async (req, res) => {
    const response = await orderService.getByUser(req.params);
    res.status(response.status).json(response.data);
  },
  deleteById: async (req, res) => {
    const response = await orderService.deleteById(req.user, req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = orderController;
