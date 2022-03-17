import wishlistService from "../services/wishlistService"
const wishlistController = {
  getByUser: async (req, res) => {
    const response = await wishlistService.getByUser(req.params);
    res.status(response.status).json(response.data);
  },
  create: async (req, res) => {
    const response = await wishlistService.create(req.body);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {},
  delete: async (req, res) => {},
  getById: async (req, res) => {},
};
module.exports = wishlistController;
