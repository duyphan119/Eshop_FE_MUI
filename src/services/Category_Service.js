const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Group_Category,
      as: "group_category",
      attributes: { exclude: ["createdAt", "updatedAy"] },
      include: [
        {
          model: db.Gender_Category,
          as: "gender_category",
          attributes: { exclude: ["createdAt", "updatedAy"] },
        },
      ],
    },
  ],
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await db.Category.findAll(common_include);
      resolve({ status: 200, data: categories });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        ...common_include,
        where: {
          slug,
        },
      });
      resolve({ status: 200, data: category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { full_name } = body;
      const slug = slugify(full_name.toLowerCase());
      const new_gender_category = await db.Category.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_gender_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, short_name } = body;
      const slug = slugify(short_name.toLowerCase());
      const existing_category = await db.Category.findOne({
        ...common_include,
        where: {
          id,
        },
      });

      existing_category = {
        ...existing_category,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_category });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.destroy({
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

module.exports = { getAll, getBySlug, create, _delete, update, getById };
