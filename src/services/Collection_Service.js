const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Collection_Item,
      as: "collection_items",
      include: [
        {
          model: db.Product,
          as: "product",
          include: [
            {
              model: db.Product_Color,
              as: "product_colors",
              include: [
                { model: db.Product_Color_Size, as: "product_color_sizes" },
                { model: db.Product_Color_Image, as: "product_color_images" },
              ],
            },
            {
              model: db.Category,
              as: "category",
              include: [
                {
                  model: db.Group_Category,
                  as: "group_category",
                  include: [
                    { model: db.Gender_Category, as: "gender_category" },
                  ],
                },
              ],
            },
            {
              model: db.Comment,
              as: "comments",
              include: [{ model: db.User, as: "user" }],
            },
          ],
        },
      ],
    },
  ],
};

const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { is_main } = query;
      const collections = await db.Collection.findAll(common_include);
      resolve({ status: 200, data: collections });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await db.Collection.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: collection });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await db.Collection.findOne({
        ...common_include,
        where: {
          slug,
        },
      });
      resolve({ status: 200, data: collection });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { short_name } = body;
      const slug = slugify(short_name.toLowerCase());
      const new_collection = await db.Collection.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_collection });
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
      const existing_collection = await db.Collection.findOne({
        ...common_include,
        where: {
          id,
        },
      });

      existing_collection = {
        ...existing_collection,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_collection });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Collection.destroy({
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
