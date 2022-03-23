"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductTag.belongsTo(models.Tag, {
        foreignKey: "id",
      });
    }
  }
  ProductTag.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      productSlug: DataTypes.STRING,
      tagId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductTag",
    }
  );
  return ProductTag;
};
