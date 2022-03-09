import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const sizeController = {
  create: async (req, res) => {
    try {
      const { size, amount, productId } = req.body;
      const id = new Date().getTime() * Math.random() / Math.random();
      const savedSize = await db.Size.create({ id, size, amount, productId });
      res.status(200).json(savedSize);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByProductSlug: async (req, res) => {
    try {
      const { productSlug } = req.params;
      const sizes = await sequelize.query(
        `SELECT s.id, s.size, s.amount FROM sizes s, products p where s.productId = p.id and p.slug = '${productSlug}'`,
        { type: QueryTypes.SELECT, raw: true }
      );
      res.status(200).json(sizes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { sizeId } = req.params;
      const size = await db.Size.findByPk(sizeId);
      res.status(200).json(size);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { productId, size, amount } = req.body;
      const { sizeId } = req.params;
      await db.Size.update(
        { productId, size, amount },
        { where: { id: sizeId } }
      );
      res.status(200).json("This size is updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { sizeId } = req.params;
      await db.Size.destroy(
        { where: { id: sizeId } }
      );
      res.status(200).json("This size is deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = sizeController;
