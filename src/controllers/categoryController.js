import db from "../models";
import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const categoryController = {
  create: async (req, res) => {
    try {
      const { name, description, groupId, buyerTypeId } = req.body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const slug = slugify(name);
      const savedCategory = await db.Category.create({
        id,
        name,
        description,
        slug,
        groupId,
        buyerTypeId,
      });
      res.status(200).json(savedCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      
      const categories = await db.Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await db.Category.findByPk(categoryId);
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const { categorySlug } = req.params;
      const category = await db.Category.findOne({
        where: {
          slug: categorySlug,
        },
      });
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name, description, groupId, buyerTypeId } = req.body;
      const slug = slugify(name);
      await db.Category.update(
        {
          name,
          description,
          slug,
          groupId,
          buyerTypeId,
        },
        { where: { id: categoryId } }
      );
      res.status(200).json("This category is updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { categoryId } = req.params;
      await db.Category.destroy({ where: { id: categoryId } });
      res.status(200).json("This category is deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = categoryController;
