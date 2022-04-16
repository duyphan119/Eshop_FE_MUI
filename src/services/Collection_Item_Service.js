const db = require("../models");

const common_include = {
  raw: false,
  nest: true,
  include: [
    {
      model: db.Collection,
      as: "collection",
    },
    {
      model: db.Product,
      as: "product",
    },
  ],
};

const getAllByCollectionId = async (collection_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const option = ({ ...common_include }.include[0].where = {
        collection_id,
      });
      const collection_items = await db.Collection_Item.findAll({
        ...option,
      });
      resolve({ status: 200, data: collection_items });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection_item = await db.Collection_Item.findOne({
        ...common_include,
        where: {
          id,
        },
      });
      resolve({ status: 200, data: collection_item });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const new_collection_item = await db.Collection.create(
        {
          ...body,
        },
        common_include
      );
      resolve({ status: 200, data: new_collection_item });
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

module.exports = { getAllByCollectionId, create, _delete, getById };
