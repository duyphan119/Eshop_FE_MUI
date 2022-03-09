"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "id"
      })
      User.hasMany(models.Order, {
        foreignKey: "id"
      })
      User.hasOne(models.WishList, {
        foreignKey: "id"
      })
      User.hasMany(models.CartItem, {
        foreignKey: "id"
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      hash: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
