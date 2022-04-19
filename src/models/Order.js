"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Order.belongsTo(models.Code, {
        foreignKey: "code_id",
        as: "code",
      });
      Order.hasMany(models.Order_Item, {
        foreignKey: "order_id",
        as: "order_items",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      code_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      city: DataTypes.STRING, //Thành phố
      district: DataTypes.STRING, //Quận, huyện
      ward: DataTypes.STRING, //Phường
      street: DataTypes.STRING, //Tên đường
      address_no: DataTypes.STRING, //Số nhà
      delivery_price: DataTypes.STRING, //Tiền ship
      checkout_method: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
