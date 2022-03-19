import db from "../models";
import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const create = async (req, res) => {
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
    console.log(error);
    return { status: 500, data: error };
  }
};
const getAll = async (query) => {
  const { all } = query;
  try {
    let buyerTypes = await db.BuyerType.findAll({raw:true});
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
            { type: QueryTypes.SELECT, raw: true}
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
    return { status: 200, data: buyerTypes };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getById = async (params) => {
  try {
    const { buyerTypeId } = params;
    const buyerType = await db.BuyerType.findByPk(buyerTypeId);
    return { status: 200, data: buyerType };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getBySlug = async (params) => {
  try {
    const { buyerTypeSlug } = params;
    const buyerType = await db.BuyerType.findOne({
      where: {
        slug: buyerTypeSlug,
      }, raw: true
    });
    return { status: 500, data: buyerType };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
  try {
    const { buyerTypeId } = params;
    const { name, description } = body;
    const slug = slugify(name);
    await db.BuyerType.update(
      {
        name,
        description,
        slug,
      },
      { where: { id: buyerTypeId } }
    );
    return { status: 200, data: "This group category is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { buyerTypeId } = params;
    await db.BuyerType.destroy({ where: { id: buyerTypeId } });
    return { status: 500, data: "This group category is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {create, getAll, getById, getBySlug, updateById, deleteById};