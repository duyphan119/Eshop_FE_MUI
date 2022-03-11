import db from "../models";
import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
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
    const { all } = req.query;
    try {
      let buyerTypes = await db.BuyerType.findAll({ raw: true });
      if (all) {
        for (let i = 0; i < buyerTypes.length; i++) {
          let groups = await sequelize.query(
            `select g.id, g.name, g.slug, g.description, g.createdAt, g.updatedAt, g.buyerTypeId
            from groupcategories g, buyertypes b where   g.buyerTypeId = '${buyerTypes[i].id}' 
            and g.buyerTypeId=b.id`,
            { type: QueryTypes.SELECT, raw: true }
          );
          for (let j = 0; j < groups.length; j++) {
            let categories = await sequelize.query(
              `select c.id, c.name, c.slug, c.description, c.createdAt, c.updatedAt, c.groupCategoryId
              from groupcategories g, categories c  where  c.groupCategoryId = '${groups[j].id}' 
              and c.groupCategoryId=g.id`,
              { type: QueryTypes.SELECT, raw: true }
            );
            groups[j] = {
              ...groups[j],
              categories,
            };
          }
          buyerTypes[i] = {
            ...buyerTypes[i],
            groups: groups,
          };
        }
      }
      res.status(200).json(buyerTypes);
    } catch (error) {
      console.log(error);
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
