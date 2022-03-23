import imagesProductService from "../services/imagesProductService";
const imagesProductController = {
  create: async (req, res) => {
    const response = await imagesProductService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getByProductSlug: async (req, res) => {
    const response = await imagesProductService.getByProductSlug(req.params);
    res.status(response.status).json(response.data);
  },
  getByProductId: async (req, res) => {
    const response = await imagesProductService.getByProductId(req.params);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await imagesProductService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await imagesProductService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await imagesProductService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = imagesProductController;
