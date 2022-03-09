import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const imagesProductController = {
  create: async (req, res) => {
    try {
      const { image, productId } = req.body;
      const id = new Date().getTime() * Math.random() / Math.random();
      const savedSize = await db.ImagesProduct.create({ id, image, productId });
      res.status(200).json(savedSize);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByProductSlug: async (req, res) => {
    try {
      const { productSlug } = req.params;
      const sizes = await sequelize.query(
        `SELECT ip.id, ip.image FROM imagesproducts ip, products p where ip.productId = p.id and p.slug = '${productSlug}'`,
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
      const { imagesProductId } = req.params;
      const imagesProduct = await db.ImagesProduct.findByPk(imagesProductId);
      res.status(200).json(imagesProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { productId, image } = req.body;
      const { imagesProductId } = req.params;
      await db.ImagesProduct.update(
        { productId, image },
        { where: { id: imagesProductId } }
      );
      res.status(200).json("This size is updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { imagesProductId } = req.params;
      await db.ImagesProduct.destroy(
        { where: { id: imagesProductId } }
      );
      res.status(200).json("This size is deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = imagesProductController;
