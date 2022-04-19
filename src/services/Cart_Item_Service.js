const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    { model: db.User, as: "user" },
    {
      model: db.Product_Color_Size,
      as: "product_color_size",
      include: [
        {
          model: db.Product_Color,
          as: "product_color",
          include: [
            {
              model: db.Product,
              as: "product",
              inClude: [
                {
                  model: db.Category,
                  as: "category",
                  include: [
                    {
                      model: db.Group_Category,
                      as: "group_category",
                      inClude: [
                        { model: db.Gender_Category, as: "gender_category" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: db.Product_Color_Image,
              as: "product_color_images",
            },
          ],
        },
      ],
    },
  ],
};

const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart_items = await db.Cart_Item.findAll({
        ...common_include,
        where: {
          user_id,
        },
      });
      resolve({ status: 200, data: cart_items });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart_item = await db.Cart_Item.findOne({
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
      const { product_color_size_id, quantity } = body;
      const { merge } = query;
      if (merge) {
        const { user_id, cart } = body;
        // Lấy giỏ hàng của user
        let existing_cart_items = await db.Cart_Item.findAll({
          ...common_include,
          where: {
            user_id: user_id,
          },
        });
        // Nếu giỏ hàng rỗng thì merge hết
        if (existing_cart_items.length === 0) {
          const new_cart_items = await db.Cart_Item.bulkCreate(
            cart.map((item) => {
              return {
                product_color_size_id: item.product_color_size.id,
                quantity: item.quantity,
                user_id: user_id,
              };
            })
          );
          resolve({ status: 200, data: new_cart_items });
        } else {
          // Lọc ra các item chưa tồn tại trong giỏ hàng user
          const filtered_new_cart_items = [...cart].filter(
            (item) =>
              !existing_cart_items.find(
                (e_c_i) =>
                  e_c_i.product_color_size_id === item.product_color_size.id
              )
          );
          await db.Cart_Item.bulkCreate(
            filtered_new_cart_items.map((item) => {
              return {
                product_color_size_id: item.product_color_size.id,
                quantity: item.quantity,
                user_id: user_id,
              };
            })
          );
          const filtered_old_cart_items = [...cart].filter((item) =>
            existing_cart_items.find(
              (e_c_i) =>
                e_c_i.product_color_size_id === item.product_color_size.id
            )
          );
          for (let i = 0; i < cart.length; i++) {
            if (
              existing_cart_items.find(
                (e_c_i) =>
                  e_c_i.product_color_size_id === cart[i].product_color_size.id
              )
            ) {
              await db.Cart_Item.update({}, {});
            }
          }
        }
      }
      let existing_cart_item = await db.Cart_Item.findOne({
        ...common_include,
        where: {
          product_color_size_id,
          user_id: user.id,
        },
      });

      if (existing_cart_item) {
        existing_cart_item.quantity += quantity;
        await existing_cart_item.save();
        resolve({ status: 200, data: existing_cart_item });
      } else {
        const new_cart_item = await db.Cart_Item.create({
          ...body,
          user_id: user.id,
        });
        existing_cart_item = await db.Cart_Item.findOne({
          ...common_include,
          where: {
            id: new_cart_item.id,
          },
        });
        resolve({ status: 200, data: existing_cart_item });
      }
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
        const existing_cart_item = await db.Cart_Item.findOne({
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
      await db.Cart_Item.destroy({
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
      //   const new_cart_items = await db.Cart_Item.bulkCreate(
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
