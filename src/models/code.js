"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Code.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: DataTypes.STRING,
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      isDefault: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Code",
    }
  );
  return Code;
};
