"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection_Item.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      Collection_Item.belongsTo(models.Collection, {
        foreignKey: "collection_id",
        as: "collection",
      });
    }
  }
  Collection_Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      collection_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collection_Item",
    }
  );
  return Collection_Item;
};
