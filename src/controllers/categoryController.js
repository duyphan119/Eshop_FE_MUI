import categoryService from "../services/categoryService";
const categoryController = {
  create: async (req, res) => {
    const response = await categoryService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getAll: async (req, res) => {
    const response = await categoryService.getAll(req.query);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await categoryService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  getBySlug: async (req, res) => {
    const response = await categoryService.getBySlug(req.params);
    res.status(response.status).json(response.data);
  },
  getByBuyerTypeSlug: async (req, res) => {
    const response = await categoryService.getByBuyerTypeSlug(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await categoryService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await categoryService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = categoryController;
