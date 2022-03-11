import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
import slugify from "slugify";
const productController = {
  create: async (req, res) => {
    try {
      const { name, price, color, colorCode, description, categoryId } =
        req.body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const slug = slugify(name);
      const savedProduct = await db.Product.create({
        id,
        name,
        price,
        color,
        colorCode,
        description,
        slug,
        categoryId,
      });
      res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByCategorySlug: async (req, res) => {
    try {
      const { categorySlug } = req.params;
      const products = await sequelize.query(
        `select p.id, p.name, p.oldPrice, p.newPrice, p.color, p.colorCode, p.slug, p.createdAt, p.updatedAt, 
        p.description, p.categoryId
        from products p, categories c, groupcategories g, buyertypes b
        where p.categoryId = c.id and c.groupCategoryId = g.id and g.buyerTypeId = b.id and
        (c.slug = '${categorySlug}' or g.slug = '${categorySlug}' or b.slug = '${categorySlug}')`,
        { type: QueryTypes.SELECT, raw: true }
      );
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const { productSlug } = req.params;
      const products = db.Product.findAll({
        where: {
          slug: productSlug,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const products = db.Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await db.Product.findByPk(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { name, price, color, colorCode, description, categoryId } =
        req.body;
      const slug = slugify(name);
      const { productId } = req.params;
      await db.Size.update(
        {
          name,
          price,
          color,
          colorCode,
          description,
          slug,
          categoryId,
        },
        { where: { id: productId } }
      );
      res.status(200).json("This product is updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { productId } = req.params;
      await db.Product.destroy({ where: { id: productId } });
      res.status(200).json("This product is deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productController;
