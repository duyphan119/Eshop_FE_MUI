const {
  getAllByCollectionId,
  getById,
  create,
  _delete,
} = require("../services/Collection_Item_Service");

const Collection_Controller = {
  getAllByCollectionId: async (req, res) => {
    const { status, data } = await getAllByCollectionId(
      req.params.collection_id
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await getById(req.params.id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await create(req.body);
    res.status(status).json(data);
  },
  _delete: async (req, res) => {
    const { status, data } = await _delete(req.params.id);
    res.status(status).json(data);
  },
};
module.exports = Collection_Controller;
