import groupCategoryService from "../services/groupCategoryService";
const groupCategoryController = {
  create: async (req, res) => {
    const response = await groupCategoryService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getAll: async (req, res) => {
    const response = await groupCategoryService.getAll(req.query);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await groupCategoryService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  getBySlug: async (req, res) => {
    const response = await groupCategoryService.getBySlug(req.params);
    res.status(response.status).json(response.data);
  },
  getByBuyerTypeSlug: async (req, res) => {
    const response = await groupCategoryService.getByBuyerTypeSlug(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await groupCategoryService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await groupCategoryService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = groupCategoryController;
