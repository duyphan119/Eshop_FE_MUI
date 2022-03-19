import db from "../models";
import { QueryTypes, Op } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const create = async (body) => {
  try {
    const { userId, productSlug, replyTo, rate, content } = body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const comment = await db.Comment.findOne({
      where: {
        userId,
        productSlug,
        replyTo,
      },
      raw: true
    });
    if (comment) {
      return await updateComment({ commentId: comment.id }, body);
    }
    const savedComment = await db.Comment.create({
      userId,
      productSlug,
      replyTo,
      rate,
      content,
      id,
    });
    return { status: 200, data: savedComment };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getByProductSlug = async (params) => {
  try {
    const { productSlug } = params;
    const comments = await db.Comment.findAll({
      where: {
        productSlug: productSlug,
      },
      raw: true
    });
    for (let i = 0; i < comments.length; i++) {
      const infosUser = await sequelize.query(
        `SELECT avatar, firstName, lastName, email, id 
       from users where id = '${comments[i].userId}' order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
      comments[i].user = infosUser[0];
      delete comments[i].userId;
    }
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const updateById = async (params, body) => {
  try {
    const { userId, productSlug, replyTo, rate, content } = body;
    const { commentId } = params;
    await db.Comment.update(
      {
        rate,
        content,
      },
      {
        where: {
          [Op.or]: [
            {
              id: commentId,
            },
            {
              userId,
              productSlug,
              replyTo,
            },
          ],
        },
      }
    );
    return { status: 200, data: body };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getById = async (params) => {
  try {
    const { commentId } = params;
    const comments = await db.Comment.findOne({
      where: {
        id: commentId,
      },
      raw: true
    });
    for (let i = 0; i < comments.length; i++) {
      const infosUser = await sequelize.query(
        `SELECT avatar, firstName, lastName, email, id 
       from users where id = '${comments[i].userId}' order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
      comments[i].user = infosUser[0];
      delete comments[i].userId;
    }
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = { getByProductSlug, updateById, create, getById };
