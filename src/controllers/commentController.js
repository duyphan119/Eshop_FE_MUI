import commentService from "../services/commentService";
const commentController = {
  create: async (req, res) => {
    const response = await commentService.create(req.body);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await commentService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  getByProductSlug: async (req, res) => {
    const response = await commentService.getByProductSlug(req.params);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await commentService.getById(req.params);
    res.status(response.status).json(response.data);
  },
};
module.exports = commentController;
