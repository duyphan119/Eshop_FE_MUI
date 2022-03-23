import slugify from "slugify";
import { QueryTypes } from "@sequelize/core";
import db, { sequelize } from "../models";

const generateId = async () => {
  let result = "TA";
  let date = new Date();
  result += date.getFullYear().toString().substring(2);

  let queryString = `select count(id) as total from tags`;
  const queryResult = await sequelize.query(queryString, {
    type: QueryTypes.SELECT,
    raw: true,
  });
  let count = queryResult[0].total + 1;
  let prefix = "";
  if (count < 10) {
    prefix = "0";
  }
  result += prefix + count;
  return result;
};

const create = async ({ body }) => {
  try {
    const { name } = body;
    const slug = slugify(name);
    const id = await generateId();
    const savedTag = await db.Tag.create({
      id,
      name,
      slug,
    });
    return {
      status: 200,
      data: savedTag,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

module.exports = { generateId, create };
