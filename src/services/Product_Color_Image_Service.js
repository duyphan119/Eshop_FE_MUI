const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Product_Color,
      as: "product_color",
      include: [
        { model: db.Product, as: "product" },
        { model: db.Product_Color_Size, as: "product_color_sizes" },
      ],
    },
  ],
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_color_image = await db.Product_Color_Image.findOne({
        ...common_include,
        where: { id },
      });
      resolve({ status: 200, data: product_color_image });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { product_color_id, url } = body;
      const { many } = query;
      if (many) {
        const product_color_images = await db.Product_Color_Image.bulkCreate(
          body.map((item) => {
            return {
              product_color_id: item.product_color_id,
              url: item.url,
            };
          })
        );
        resolve({ status: 200, data: product_color_images });
      }
      const product_color_image = await db.Product_Color_Image.create({
        product_color_id,
        url,
      });
      resolve({ status: 200, data: product_color_image });
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
      const existing_product_color_image = await db.Product_Color_Image.findOne(
        {
          ...common_include,
          where: { id },
        }
      );
      existing_product_color_image = {
        ...existing_product_color_image,
        ...body,
      };
      resolve({ status: 200, data: existing_product_color_image });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product_Color_Image.destroy({
        where: { id },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = { create, getById, _delete, update };
