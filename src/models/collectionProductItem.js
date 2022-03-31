"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectionProductItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectionProductItem.belongsTo(models.CollectionProduct, {
        foreignKey: "id",
      });
    }
  }
  CollectionProductItem.init(
    {
      collectionId:DataTypes.STRING,
      productSlug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CollectionProductItem",
    }
  );
  return CollectionProductItem;
};
