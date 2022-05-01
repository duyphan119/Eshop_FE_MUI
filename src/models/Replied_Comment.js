"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Replied_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Replied_Comment.belongsTo(models.Comment, {
        foreignKey: "comment_id",
        as: "comment",
      });
      Replied_Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Replied_Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: DataTypes.STRING,
      comment_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Replied_Comment",
    }
  );
  return Replied_Comment;
};
