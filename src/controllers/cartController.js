import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const cartController = {
  create: async (req, res) => {
    try {
      const { sizeId, userId, quantity } = req.body;

      let checkedItem = await db.CartItem.findOne({
        where: {
          userId,
          sizeId,
        },
        raw: true,
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
        res.status(200).json(savedCartItem);
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
        res.status(200).json(checkedItem);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = await db.CartItem.findAll({
        where: {
          userId: userId,
        },
        raw: true,
      });
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i] = await getCartItemAllFields(cartItems[i]);
      }
      res.status(200).json(cartItems);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const cartItem = await db.CartItem.findByPk(cartItemId);
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { quantity } = req.body;
      const { cartItemId } = req.params;
      await sequelize.query(
        `UPDATE cartitems SET quantity = ${quantity} where id = '${cartItemId}'`,
        { type: QueryTypes.UPDATE, raw: true }
      );
      let resItem = await db.CartItem.findByPk(cartItemId);
      resItem = await getCartItemAllFields(resItem.dataValues);
      res.status(200).json(resItem);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { cartItemId } = req.params;
      await db.CartItem.destroy({ where: { id: cartItemId } });
      res.status(200).json("This cart item is deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
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
    raw: true,
  });
  products[0].images = imagesProduct;
  newItem.size = size.dataValues;
  newItem.product = products[0];
  return newItem;
};
module.exports = cartController;
