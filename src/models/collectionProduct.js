"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectionProduct.hasMany(models.Product, {
        foreignKey: "id",
      });
    }
  }
  CollectionProduct.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      shortName: DataTypes.STRING,
      isMain:  DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CollectionProduct",
    }
  );
  return CollectionProduct;
};
