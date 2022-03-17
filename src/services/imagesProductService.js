import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const getByProductId = async (product) => {
  try {
    let imagesProduct = await db.ImagesProduct.findAll({
      where: {
        productId: product.id,
      },
      
    });
    return imagesProduct;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const create = async (body) => {
  try {
    const { image, productId } = body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const savedSize = await db.ImagesProduct.create({ id, image, productId });
    return { status: 200, data: savedSize };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getByProductSlug = async (params) => {
  try {
    const { productSlug } = params;
    const sizes = await sequelize.query(
      `SELECT ip.id, ip.image FROM imagesproducts ip, products p where ip.productId = p.id and p.slug = '${productSlug}'`,
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
    const { imagesProductId } = params;
    const imagesProduct = await db.ImagesProduct.findByPk(imagesProductId);
    return { status: 200, data: imagesProduct };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
  try {
    const { productId, image } = body;
    const { imagesProductId } = params;
    await db.ImagesProduct.update(
      { productId, image },
      { where: { id: imagesProductId } }
    );
    return { status: 200, data: "This size is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { imagesProductId } = req.params;
    await db.ImagesProduct.destroy({ where: { id: imagesProductId } });
    return { status: 200, data: "This size is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {
  create,
  getByProductId,
  getByProductSlug,
  getById,
  updateById,
  deleteById,
};
