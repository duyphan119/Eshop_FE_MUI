import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";

const create = async (body) => {
  try {
    const { sizeId, userId, quantity } = body;
    let checkedItem = await db.CartItem.findOne({
      where: {
        userId,
        sizeId,
      },
      raw: true
    });

    if (!checkedItem) {
      const id = (new Date().getTime() * Math.random()) / Math.random();
      let savedCartItem = await db.CartItem.create({
        id,
        sizeId,
        userId,
        quantity,
      });
      savedCartItem = await getCartItemAllFields(savedCartItem.dataValues);
      return {
        status: 200,
        data: savedCartItem,
      };
    } else {
      checkedItem.quantity += quantity;
      await db.CartItem.update(
        {
          quantity: checkedItem.quantity,
        },
        {
          where: {
            id: checkedItem.id,
          },
        }
      );
      checkedItem = await getCartItemAllFields(checkedItem);
      return {
        status: 200,
        data: checkedItem,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getByUser = async (params) => {
  try {
    const { userId } = params;
    const cartItems = await db.CartItem.findAll({
      where: {
        userId: userId,
      },
      raw: true
    });
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i] = await getCartItemAllFields(cartItems[i]);
    }
    return { status: 200, data: cartItems };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getById = async (params) => {
  try {
    const { cartItemId } = params;
    const cartItem = await db.CartItem.findByPk(cartItemId);
    return { status: 200, data: cartItem };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
  try {
    const { quantity } = body;
    const { cartItemId } = params;
    await sequelize.query(
      `UPDATE cartitems SET quantity = ${quantity} where id = '${cartItemId}'`,
      { type: QueryTypes.UPDATE, raw: true }
    );
    let resItem = await db.CartItem.findByPk(cartItemId);
    resItem = await getCartItemAllFields(resItem.dataValues);
    return { status: 200, data: resItem };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const deleteById = async (params) => {
  try {
    const { cartItemId } = params;
    await db.CartItem.destroy({ where: { id: cartItemId } });
    return { status: 200, data: "This cart item is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getCartItemAllFields = async (item) => {
  const newItem = item;
  const products = await sequelize.query(
    `select p.* from sizes s, products p
     where s.productId = p.id and s.id = '${newItem.sizeId}' order by createdAt desc`,
    { type: QueryTypes.SELECT, raw: true }
  );
  const size = await db.Size.findByPk(newItem.sizeId);
  const imagesProduct = await db.ImagesProduct.findAll({
    where: {
      productId: products[0].id,
    },
    raw: true
  });
  products[0].images = imagesProduct;
  newItem.size = size.dataValues;
  newItem.product = products[0];
  return newItem;
};
module.exports = { create, updateById, deleteById, getById, getByUser, getCartItemAllFields };
