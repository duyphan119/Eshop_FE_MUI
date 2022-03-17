import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const getByProductId = async (product) => {
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
};

const getByProductSlug = async (params) => {
  try {
    const { productSlug } = params;
    const sizes = await sequelize.query(
      `SELECT s.id, s.size, s.amount FROM sizes s, products p where s.productId = p.id and p.slug = '${productSlug}'`,
      { type: QueryTypes.SELECT, raw: true }
    );
    return { status: 200, data: sizes };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};

const getById = async (params) => {
  try {
    const { sizeId } = params;
    const size = await db.Size.findByPk(sizeId);
    return { status: 200, data: size };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};

const create = async () => {
  try {
    const { size, amount, productId } = req.body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const savedSize = await db.Size.create({ id, size, amount, productId });
    return { status: 200, data: savedSize };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
  try {
    const { productId, size, amount } = body;
    const { sizeId } = params;
    await db.Size.update(
      { productId, size, amount },
      { where: { id: sizeId } }
    );
    return { status: 200, data: "This size is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { sizeId } = params;
    await db.Size.destroy({ where: { id: sizeId } });
    return { status: 200, data: "This size is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {
  getByProductSlug,
  create,
  deleteById,
  updateById,
  getById,
  getByProductId,
};
