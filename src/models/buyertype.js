"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuyerType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BuyerType.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BuyerType",
    }
  );
  return BuyerType;
};
