import db from "../models";
import slugify from "slugify";
const groupCategoryController = {
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const slug = slugify(name);
      const savedGroupCategory = await db.GroupCategory.create({
        id,
        name,
        description,
        slug,
      });
      res.status(200).json(savedGroupCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const groupCategories = await db.GroupCategory.findAll();
      res.status(200).json(groupCategories);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { groupCategoryId } = req.params;
      const category = await db.GroupCategory.findByPk(groupCategoryId);
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const { groupCategorySlug } = req.params;
      const groupCategory = await db.GroupCategory.findOne({
        where: {
          slug: groupCategorySlug,
        },
      });
      res.status(200).json(groupCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { groupCategoryId } = req.params;
      const { name, description } = req.body;
      const slug = slugify(name);
      await db.GroupCategory.update(
        {
          name,
          description,
          slug,
        },
        { where: { id: groupCategoryId } }
      );
      res.status(200).json("This group category is updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { groupCategoryId } = req.params;
      await db.GroupCategory.destroy({ where: { id: groupCategoryId } });
      res.status(200).json("This group category is deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = groupCategoryController;
