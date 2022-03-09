"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishListItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WishListItem.belongsTo(models.WishList, {
        foreignKey: "wishListId",
      });
      WishListItem.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  WishListItem.init(
    {
      wishListId: DataTypes.STRING,
      productId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WishListItem",
    }
  );
  return WishListItem;
};
