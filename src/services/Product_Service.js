const db = require("../models");
const slugify = require("slugify");
const { Op } = require("sequelize");
const common_include = {
  raw: false,
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
          include: [{ model: db.Gender_Category, as: "gender_category" }],
        },
      ],
    },
    {
      model: db.Comment,
      as: "comments",
      include: [{ model: db.User, as: "user" }],
    },
  ],
  nest: true,
};

const createFilter = (query) => {
  let { color, size, price, sortBy, sortType } = query;
  let newInclude = { ...common_include };
  let splitItem;
  color = color ? JSON.parse(color) : [];
  size = size ? JSON.parse(size) : [];
  price = price ? JSON.parse(price) : [];
  if (color.length !== 0 || size.length !== 0 || price.length !== 0) {
    newInclude.where = {
      [Op.or]: [
        {
          "$Product_Colors.color$": {
            [Op.in]: color,
          },
        },
        {
          "$Product_Colors.Product_Color_Sizes.size_text$": {
            [Op.in]: size,
          },
        },
        {
          [Op.or]: price.map((item) => {
            splitItem = item.split(";");
            if (item[0] === ";") {
              return {
                price: {
                  [Op.gte]: parseInt(splitItem[1]),
                },
              };
            }
            if (item[item.length - 1] === ";") {
              return {
                price: {
                  [Op.lte]: parseInt(splitItem[0]),
                },
              };
            }
            return {
              price: {
                [Op.gte]: parseInt(splitItem[0]),
                [Op.lte]: parseInt(splitItem[1]),
              },
            };
          }),
        },
      ],
    };
  }
  if (sortBy && sortType && sortBy !== "") {
    newInclude.order = [[sortBy, sortType.toUpperCase()]];
  } else {
    delete newInclude.order;
  }
  return newInclude;
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll(common_include);
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const search = async (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        ...common_include,
        where: {
          name: {
            [Op.like]: `%${q}%`,
          },
        },
      });
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByGenderCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        ...common_include,
        where: {
          "$Category.Group_Category.Gender_Category.slug$": slug,
        },
      });
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByGroupCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      common_include.where = {
        "$Category.Group_Category.slug$": slug,
      };

      const products = await db.Product.findAll({
        ...createFilter(query),
      });
      delete common_include.where;
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByCollectionId = async (collection_id, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const option = { ...createFilter(query) };
      option.include.push({
        model: db.Collection_Item,
        as: "collection_item",
        include: [
          {
            model: db.Collection,
            where: {
              id: collection_id,
            },
          },
        ],
      });
      const products = await db.Product.findAll({
        ...option,
      });

      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getByCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      common_include.where = { "$Category.slug$": slug };
      const products = await db.Product.findAll({
        ...createFilter(query),
      });
      delete common_include.where;
      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        raw: false,
        include: [
          {
            model: db.Product_Color,
            include: [
              { model: db.Product_Color_Size },
              { model: db.Product_Color_Image },
            ],
          },
          {
            model: db.Category,
            include: [
              {
                model: db.Group_Category,
                include: [{ model: db.Gender_Category }],
              },
            ],
          },
          {
            model: db.Comment,
            include: [{ model: db.User }],
          },
        ],
        nest: true,
        where: { slug },
      });
      resolve({ status: 200, data: product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = slugify(name.toLowerCase());
      const new_product = await db.Product.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name } = body;
      const slug = slugify(name.toLowerCase());
      const existing_product = await db.Product.findOne({
        ...common_include,
        where: { id },
      });
      existing_product = {
        ...existing_product,
        ...body,
        slug,
      };
      resolve({ status: 200, data: existing_product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.destroy({
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

module.exports = {
  getAll,
  search,
  getByGenderCategorySlug,
  getByGroupCategorySlug,
  getByCategorySlug,
  getBySlug,
  getByCollectionId,
  create,
  update,
  _delete,
};
