import categoryService from "../services/categoryService";
const categoryController = {
  create: async (req, res) => {
    const response = await categoryService.create(req.body);
    res.status(response.status).json(response.status);
  },
  getAll: async (req, res) => {
    const response = await categoryService.getAll(req.query);
    res.status(response.status).json(response.status);
  },
  getById: async (req, res) => {
    const response = await categoryService.getById(req.params);
    res.status(response.status).json(response.status);
  },
  getBySlug: async (req, res) => {
    const response = await categoryService.getBySlug(req.params);
    res.status(response.status).json(response.status);
  },
  getByBuyerTypeSlug: async (req, res) => {
    const response = await categoryService.getByBuyerTypeSlug(req.params);
    res.status(response.status).json(response.status);
  },
  update: async (req, res) => {
    const response = await categoryService.updateById(req.params, req.body);
    res.status(response.status).json(response.status);
  },
  delete: async (req, res) => {
    const response = await categoryService.deleteById(req.params);
    res.status(response.status).json(response.status);
  },
};
module.exports = categoryController;
