import collectionProductService from "../services/collectionProductService";
const collectionProductController = {
//   create: async (req, res) => {
//     const response = await collectionProductService.create(req.body);
//     res.status(response.status).json(response.data);
//   },
  getAll: async (req, res) => {
    const response = await collectionProductService.getAll();
    res.status(response.status).json(response.data);
  },
  // getById: async (req, res) => {
  //   const response = await collectionProductService.getById(req.params);
  //   res.status(response.status).json(response.data);
  // },
  // update: async (req, res) => {
  //   const response = await collectionProductService.updateById(req.params, req.body);
  //   res.status(response.status).json(response.data);
  // },
  // delete: async (req, res) => {
  //   const response = await collectionProductService.deleteById(req.params);
  //   res.status(response.status).json(response.data);
  // },
};

module.exports = collectionProductController;
