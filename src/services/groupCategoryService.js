import db from "../models";
import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const getByBuyerTypeSlug = async (params) => {
  const { buyerTypeSlug } = params;
  try {
    let groupCategories = await sequelize.query(
      `select g.* from  groupcategories g, buyertypes b
           where b.slug = '${buyerTypeSlug}' and 
           g.buyerTypeId = b.id order by createdAt desc`,
      { type: QueryTypes.SELECT }
    );
    return { status: 200, data: groupCategories };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getBySlug = async (params) => {
  try {
    const { groupCategorySlug } = params;
    const groupCategory = await db.GroupCategory.findOne({
      where: {
        slug: groupCategorySlug,
      },
      raw: true,
    });
    return { status: 200, data: groupCategory };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { groupCategoryId } = params;
    await db.GroupCategory.destroy({ where: { id: groupCategoryId } });
    return { status: 200, data: "This group category is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
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
    return { status: 200, data: "This group category is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getAll = async (query) => {
  try {
    const groupCategories = await db.GroupCategory.findAll({ raw: true });
    for (let i = 0; i < groupCategories.length; i++) {
      const buyerType = await db.BuyerType.findOne({
        where: {
          id: groupCategories[i].buyerTypeId
        },
        raw: true
      })
      groupCategories[i].buyerType = buyerType;
    }
    return { status: 200, data: groupCategories };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getById = async (params) => {
  try {
    const { groupCategoryId } = params;
    const groupCategory = await db.GroupCategory.findByPk(groupCategoryId);
    return { status: 200, data: groupCategory };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const create = async (body) => {
  try {
    const { name, description } = body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const slug = slugify(name);
    const savedGroupCategory = await db.GroupCategory.create({
      id,
      name,
      description,
      slug,
    });
    return { status: 200, data: savedGroupCategory };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {
  getByBuyerTypeSlug,
  getBySlug,
  deleteById,
  updateById,
  getAll,
  getById,
  create,
};
