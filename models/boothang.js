"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class boothang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.boothang.belongsTo(models.user);
    }
  }
  boothang.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "boothang"
    }
  );
  return boothang;
};
