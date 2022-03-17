import userService from "../services/userService";
const userController = {
  create: async (req, res) => {
    const response = await userService.create(req.body);
    res.status(response.status).json(response.data);
  },
  getAll: async (req, res) => {
    const response = await userService.getAll(req.body);
    res.status(response.status).json(response.data);
  },
  getById: async (req, res) => {
    const response = await userService.getById(req.params);
    res.status(response.status).json(response.data);
  },
  update: async (req, res) => {
    const response = await userService.updateById(req.params, req.body);
    res.status(response.status).json(response.data);
  },
  delete: async (req, res) => {
    const response = await userService.deleteById(req.params);
    res.status(response.status).json(response.data);
  },
};

module.exports = userController;
