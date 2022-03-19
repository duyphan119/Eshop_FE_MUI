import buyerTypeService from "../services/buyerTypeService";
const buyerTypeController = {
  create: async (req, res) => {
    const response = await buyerTypeService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getAll: async (req, res) => {
    const response = await buyerTypeService.getAll(req.query);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await buyerTypeService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  getBySlug: async (req, res) => {
    const response = await buyerTypeService.getBySlug(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await buyerTypeService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await buyerTypeService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = buyerTypeController;
