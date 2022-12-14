'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsTo(models.Disease, { onDelete: 'CASCADE', hooks:true })
      Medicine.belongsTo(models.User, { onDelete: 'CASCADE', hooks:true })
    }
    static medicineList(data){
      return this.findAll({
        include:data
      })
    }

  }
  Medicine.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};