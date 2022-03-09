import db from "../models";
import slugify from "slugify";
const buyerTypeController = {
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const slug = slugify(name);
      const savedBuyerType = await db.BuyerType.create({
        id,
        name,
        description,
        slug,
      });
      res.status(200).json(savedBuyerType);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const buyerTypes = await db.BuyerType.findAll();
      res.status(200).json(buyerTypes);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { buyerTypeId } = req.params;
      const category = await db.BuyerType.findByPk(buyerTypeId);
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const { buyerTypeSlug } = req.params;
      const buyerType = await db.BuyerType.findOne({
        where: {
          slug: buyerTypeSlug,
        },
      });
      res.status(200).json(buyerType);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { buyerTypeId } = req.params;
      const { name, description } = req.body;
      const slug = slugify(name);
      await db.BuyerType.update(
        {
          name,
          description,
          slug,
        },
        { where: { id: buyerTypeId } }
      );
      res.status(200).json("This group category is updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { buyerTypeId } = req.params;
      await db.BuyerType.destroy({ where: { id: buyerTypeId } });
      res.status(200).json("This group category is deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = buyerTypeController;
