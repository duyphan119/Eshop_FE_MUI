import sizeService from "../services/sizeService";
const sizeController = {
  create: async (req, res) => {
    const response = await sizeService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getByProductSlug: async (req, res) => {
    const response = await sizeService.getByProductSlug(req.params);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await sizeService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await sizeService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await sizeService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
  getByProductId: async (req, res) => {
    const response = await sizeService.getByProductId(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = sizeController;
