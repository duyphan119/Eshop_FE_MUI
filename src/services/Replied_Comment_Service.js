const db = require("../models");

const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.Order.findAll({
        include: [
          {
            model: db.User,
            as: "user",
          },
          {
            model: db.Code,
            as: "code",
          },
        ],
        where: {
          user_id,
        },
        nest: true,
        raw: false,
      });
      resolve({ status: 200, data: orders });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart_item = await db.Order.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: cart_item });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { comment_id, user_id, content } = body;

      const new_replied_comment = db.Replied_Comment.create({
        comment_id,
        user_id,
        content,
      });
      resolve({
        status: 200,
        data: new_replied_comment,
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const update = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { product_color_size_id, quantity } = body;
      if (quantity < 0) {
        resolve({ status: 500, data: "Invalid quantity" });
      } else {
        const existing_cart_item = await db.Order.findOne({
          ...common_include,
          where: {
            product_color_size_id,
            user_id: user.id,
          },
        });
        if (quantity === 0) {
          await _delete(existing_cart_item.id);
          resolve({ status: 200, data: null });
        } else {
          existing_cart_item.quantity = quantity;
          await existing_cart_item.save();
          resolve({ status: 200, data: existing_cart_item });
        }
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.destroy({
        where: {
          id,
        },
      });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = { getByUser, create, _delete, update, getById };
