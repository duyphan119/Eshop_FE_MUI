const db = require("../models");

const common_include = {
  nest: true,
  raw: false,
  include: [
    {
      model: db.Product,
      as: "product",
    },
    { model: db.User, as: "user" },
  ],
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { content, rate, product_id, user_id } = body;
      const new_comment = await db.Comment.create({
        content,
        rate,
        reply_to,
        product_id,
        user_id,
      });

      const res_comment = await db.Comment.findOne({
        where: { id: new_comment.id },
        ...common_include,
      });

      resolve({ status: 200, data: res_comment });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, content, rate, product_id, user_id } = body;
      console.log(body);
      await db.Comment.update(
        { content, rate, product_id, user_id, updatedAt: new Date() },
        {
          where: {
            id,
          },
        }
      );
      const res_comment = await db.Comment.findOne({
        where: { id: id },
        ...common_include,
      });
      resolve({ status: 200, data: res_comment });
    } catch (error) {
      // console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.destroy({
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

module.exports = { create, update, _delete };
