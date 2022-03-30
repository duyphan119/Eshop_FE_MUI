import { QueryTypes } from "@sequelize/core";
import db, { sequelize } from "../models";
import productService from "./productService";
const create = async (body) => {
  try {
    const { productSlug, userId } = body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const savedWishlist = await db.WishListItem.create({
      productSlug,
      userId,
      id,
    });
    return {
      status: 200,
      data: savedWishlist,
    };
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
    const wishlistItems = await db.WishListItem.findAll({
      where: {
        userId: userId,
      },
      raw: true
    });
    for (let i = 0; i < wishlistItems.length; i++) {
      let product = await productService.getBySlug(
        { id: userId },
        { productSlug: wishlistItems[i].productSlug },
        { all: true }
      );
      wishlistItems[i].product = product.data;
      delete wishlistItems[i].productSlug;
    }
    return {
      status: 200,
      data: wishlistItems,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const deleteById = async (params) => {
  try {
    const { wishlistId } = params;
    await db.WishListItem.destroy({
      where: {
        id: wishlistId,
      },
    });
    return {
      status: 200,
      data: "This item is deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const deleteByProductSlug = async (user, params) => {
  try {
    const { productSlug } = params;
    await db.WishListItem.destroy({
      where: {
        productSlug: productSlug,
        userId: user.id
      },
    });
    return {
      status: 200,
      data: "This item is deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
module.exports = { create, getByUser, deleteById, deleteByProductSlug };
