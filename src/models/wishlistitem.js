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
      WishListItem.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  WishListItem.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: DataTypes.STRING,
      productSlug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WishListItem",
    }
  );
  return WishListItem;
};
