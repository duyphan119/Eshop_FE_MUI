"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.hasMany(models.Collection_Item, {
        foreignKey: "collection_id",
        as: "collection_items",
      });
    }
  }
  Collection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      description: DataTypes.STRING,
      icon: DataTypes.STRING,
      is_main: DataTypes.BOOLEAN,
      thumbnail: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Collection",
    }
  );
  return Collection;
};
