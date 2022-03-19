import cartService from "../services/cartService";
const cartController = {
  create: async (req, res) => {
    const response = await cartService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getByUser: async (req, res) => {
    const response = await cartService.getByUser(req.params);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await cartService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await cartService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await cartService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};

module.exports = cartController;
