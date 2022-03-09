"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Size.hasMany(models.OrderItem, {
        foreignKey: "id",
      });
      Size.hasMany(models.CartItem, {
        foreignKey: "id",
      });
    }
  }
  Size.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      size: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      productId:  {
        type:DataTypes.STRING,
        references:{
          model:"Product",
          key:"id"
        }
      },
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
