const {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  _delete,
} = require("../services/Collection_Service");

const Collection_Controller = {
  getAll: async (req, res) => {
    const { status, data } = await getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await getById(req.params.id);
    res.status(status).json(data);
  },
  getBySlug: async (req, res) => {
    const { status, data } = await getBySlug(req.params.slug);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await update(req.body);
    res.status(status).json(data);
  },
  _delete: async (req, res) => {
    const { status, data } = await _delete(req.params.id);
    res.status(status).json(data);
  },
};
module.exports = Collection_Controller;
