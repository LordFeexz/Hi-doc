'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, {foreignKey: 'UserId'})
      User.hasMany(models.Medicine, {foreignKey: 'UserId'})
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg:'Name is required'
        },
        notEmpty:{
          msg:'Name is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg:'email is required'
        },
        notEmpty:{
          msg:'email is required'
        },
        isEmail:{
          msg:`use email format`
        }
      },
      unique:{
        args:true,
        msg:`already use`
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg:'password is required'
        },
        notEmpty:{
          msg:'password is required'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg:'role is required'
        },
        notEmpty:{
          msg:'role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(el.password,salt)
    el.password = hash
  })
  return User;
};