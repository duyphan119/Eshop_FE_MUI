import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
import slugify from "slugify";
const imagesProductService = {
  getImagesProduct: async (product) => {
    try {
      let imagesProduct = await db.ImagesProduct.findAll({
        where: {
          productId: product.id,
        },
        raw: true,
      });
      return imagesProduct;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  create: async (body) => {
    try {
      const { image, productId } = body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const savedSize = await db.ImagesProduct.create({ id, image, productId });
      return savedSize;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
module.exports = imagesProductService;
