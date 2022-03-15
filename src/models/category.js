"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.GroupCategory, {
        foreignKey: "groupCategoryId",
      });
      Category.hasMany(models.Product, {
        foreignKey: "id",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      slug: DataTypes.STRING,
      groupCategoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
