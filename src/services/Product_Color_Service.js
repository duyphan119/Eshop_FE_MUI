const db = require("../models");
const common_include = {
  raw: false,
  nest: true,
  include: [
    { model: db.Product, as: "product" },
    { model: db.Product_Color_Size, as: "product_color_sizes" },
    { model: db.Product_Color_Image, as: "product_color_images" },
  ],
};
const create = async (body, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { product_id, color, color_code } = body;
      const { many } = query;
      if (many) {
        const product_colors = await db.Product_Color.bulkCreate(
          body.map((item) => {
            return {
              product_id: item.product_id,
              color: item.color,
              color_code: item.color_code,
            };
          })
        );
        resolve({ status: 200, data: product_colors });
      }
      const product_color = await db.Product_Color.create({
        product_id,
        color,
        color_code,
      });
      resolve({ status: 200, data: product_color });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_color = await db.Product_Color.findOne({
        ...common_include,
        where: { id },
      });
      resolve({ status: 200, data: product_color });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = body;
      const existing_product_color = await db.Product_Color.findOne({
        ...common_include,
        where: { id },
      });
      existing_product_color = {
        ...existing_product_color,
        ...body,
      };
      resolve({ status: 200, data: existing_product_color });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product_Color.destroy({
        where: { id },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = { getById, create, update, _delete };
