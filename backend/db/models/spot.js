'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Booking,
        {foreignKey:'spotId',  onDelete:'CASCASE', hooks: true}
      );

      Spot.hasMany(
        models.Review,
        {foreignKey:'spotId',  onDelete:'CASCASE', hooks: true}
      );
      
      Spot.hasMany(
        models.SpotImage,
        {foreignKey:'spotId',  onDelete:'CASCASE', hooks: true}
      );

      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )
      
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        max: 90,
        min: -90,
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        max: 180,
        min: -180,
      }},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 0,
      }
      
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};