import db from "../models";
import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
import groupCategoryService from "./groupCategoryService";
const getByBuyerTypeSlug = async (params) => {
  const { buyerTypeSlug } = params;
  try {
    let categories = await sequelize.query(
      `select c.* from categories c, groupcategories g, buyertypes b
           where b.slug = '${buyerTypeSlug}' and c.groupCategoryId = g.id
           and g.buyerTypeId = b.id order by createdAt desc`,
      { type: QueryTypes.SELECT, raw: true }
    );
    for (let i = 0; i < categories.length; i++) {
      const group = await groupCategoryService.getById({ groupCategoryId: categories[i].groupCategoryId })
      categories[i].group = group.data;
    }
    return { status: 200, data: categories };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getBySlug = async (params) => {
  try {
    const { categorySlug } = params;
    const category = await db.Category.findOne({
      where: {
        slug: categorySlug,
      }, raw: true
    });
    return { status: 200, data: category };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getById = async (params) => {
  try {
    const { categoryId } = params;
    const category = await db.Category.findOne({
      where: {
        id: categoryId
      },
      raw: true
    });
    const group = await groupCategoryService.getById({ groupCategoryId: category.groupCategoryId })
    category.group = group.data;
    return { status: 200, data: category };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getAll = async (query) => {
  try {
    const categories = await db.Category.findAll({ raw: true });
    for (let i = 0; i < categories.length; i++) {
      const group = await groupCategoryService.getById({ groupCategoryId: categories[i].groupCategoryId })
      categories[i].group = group.data;
    }
    return { status: 200, data: categories };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const create = async (body) => {
  try {
    const { name, description, groupId, buyerTypeId } = body;
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
    return { status: 200, data: savedCategory };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
  try {
    const { categoryId } = params;
    const { name, description, groupId, buyerTypeId } = body;
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
    return { status: 200, data: "This category is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { categoryId } = params;
    await db.Category.destroy({ where: { id: categoryId } });
    return { status: 200, data: "This category is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {
  getByBuyerTypeSlug,
  getBySlug,
  getById,
  getAll,
  create,
  updateById,
  deleteById,
};
