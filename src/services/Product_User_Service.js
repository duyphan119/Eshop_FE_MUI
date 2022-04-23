const db = require("../models");
const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Product,
      as: "product",
      include: [
        {
          model: db.Product_Color,
          as: "product_colors",
          include: [
            {
              model: db.Product_Color_Size,
              as: "product_color_sizes",
            },
            {
              model: db.Product_Color_Image,
              as: "product_color_images",
            },
          ],
        },
        {
          model: db.Category,
          as: "category",
        },
        {
          model: db.Comment,
          as: "comments",
        },
      ],
    },
    {
      model: db.User,
      as: "user",
    },
  ],
};
const create = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_user = await db.Product_User.create({
        ...body,
        user_id: user.id,
      });
      resolve({ status: 200, data: product_user });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_color = await db.Product_User.findOne({
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
const getByUser = async (user, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product_users = await db.Product_User.findAll({
        ...common_include,
        where: { user_id: user.id },
      });
      resolve({ status: 200, data: product_users });
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
      const existing_product_color = await db.Product_User.findOne({
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
      await db.Product_User.destroy({
        where: { id },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const deleteProduct = async (user, product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product_User.destroy({
        where: { product_id, user_id: user.id },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = { getById, create, update, _delete, getByUser, deleteProduct };
