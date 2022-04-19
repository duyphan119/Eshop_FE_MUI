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

const create = async (user, body, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        cart,
        city,
        ward,
        district,
        street,
        address_no,
        delivery_price,
        checkout_method,
        total,
      } = body;
      const option = {
        city,
        ward,
        district,
        street,
        address_no,
        delivery_price,
        checkout_method,
        code_id: 1,
        user_id: 2,
        total,
      };
      const new_order = await db.Order.create(option);
      await db.Order_Item.bulkCreate(
        cart.map((item) => {
          return {
            product_color_size_id: item.product_color_size.id,
            quantity: item.quantity,
            user_id: 2,
            order_id: new_order.dataValues.id,
          };
        })
      );
      await db.Cart_Item.destroy({
        where: {
          id: cart.map((item) => {
            return item.id;
          }),
        },
      });
      resolve({ status: 200, data: new_order });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
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

const mergeCart = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("body", body);

      // let existing_cart_items = await getByUser(user.id).data;
      // if (!existing_cart_items) {
      //   // Nếu người dùng chưa có sản phẩm trong giỏ hàng mà đăng nhập thì merge với localStorage (body)
      //   const new_cart_items = await db.Order.bulkCreate(
      //     body.map((item) => {
      //       return {
      //         product_color_size_id: item.product_color_size.id,
      //         quantity: item.quantity,
      //         user_ud: user.id,
      //       };
      //     })
      //   );
      //   resolve({ status: 200, data: new_cart_items });
      // } else {
      //   // Nếu người dùng đã có sản phẩm trong giỏ hàng mà đăng nhập thì merge với localStorage (body)
      //   // Kiểm tra các sản phẩm đã có
      //   // let check_cart_items = [...body].filter((item) => {
      //   //   return !existing_cart_items.some((object2) => {
      //   //     return item.product_color_size.id === object2.id;
      //   //   });
      //   // });
      //   // console.log(check_cart_items);
      //   // Kiểm tra các sản phẩm chưa có
      // }
      // console.log("existing_cart", existing_cart);

      resolve({ status: 200, data: [] });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const getDifference = (array1, array2) => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
};

module.exports = { getByUser, create, _delete, update, getById, mergeCart };
