import productService from "../services/productService";
const productController = {
  create: async (req, res) => {
    const response = await productService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getByCategorySlug: async (req, res) => {
    const response = await productService.getByCategorySlug(req.user, req.params, req.query);
    res.status(response.status).json(response.data);
  },
  getBySlug: async (req, res) => {
    const response = await productService.getBySlug(req.user, req.params, req.query);
    res.status(response.status).json(response.data);
  },
  getAll: async (req, res) => {
    const response = await productService.getAll(req.user, req.query);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await productService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await productService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await productService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
  getTotalPage: async (req, res) => {
    const response = await productService.getTotalPages(req.query);
    res.status(response.status).json(response.data);
  },
};

module.exports = productController;
