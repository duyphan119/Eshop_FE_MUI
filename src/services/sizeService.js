import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const sizeService = {
  getSizes: async (product) => {
    try {
      let sizes = await sequelize.query(
        `select * from sizes
           where productId = '${product.id}' order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
      return sizes;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
module.exports = sizeService;
