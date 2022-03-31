import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import db, { sequelize } from "../models";
const getAll = async () => {
   try {
      const collectionProducts = await db.CollectionProduct.findAll({
         raw: true
      });
      return {
         status: 200,
         data: collectionProducts
      };
   } catch (error) {
      console.log(error);
      return {
         status: 500,
         data: error
      };
   }
};

module.exports = { getAll };
