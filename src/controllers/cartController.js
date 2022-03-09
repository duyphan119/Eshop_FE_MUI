import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
import slugify from "slugify";
const cartController = {
  create: async (req, res) => {
    try {
      const { sizeId, userId, quantity } = req.body;

      const checkedItem = await db.CartItem.findOne({
        where: {
          userId,
          sizeId,
        },
      });

      if (!checkedItem) {
        const id = (new Date().getTime() * Math.random()) / Math.random();
        const savedCartItem = await db.CartItem.create({
          id,
          sizeId,
          userId,
          quantity,
        });
        res.status(200).json(savedCartItem);
      } else {
        checkedItem.quantity += quantity;
        await db.CartItem.update({
          quantity: checkedItem.quantity,
        });
        res.status(200).json(checkedItem);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = db.CartItem.findAll({
        where: {
          userId,
        },
      });
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
        `UPDATE cartitems SET quantity = quantity + ${quantity} where cartItemId = '${cartItemId}'`,
        { type: QueryTypes.UPDATE, raw: true }
      );
      res.status(200).json("This cart item is updated");
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
module.exports = cartController;
