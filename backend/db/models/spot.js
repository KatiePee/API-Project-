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
    address: {
      type: DataTypes.STRING(30),
       validate: {
        len: [1, 30]
      },
    },
    city: {
      type: DataTypes.STRING(30),
       validate: {
        len: [1, 30]
      },
    },
    state: {
      type: DataTypes.STRING(30),
       validate: {
        len: [1, 30]
      },
    },
    country: {
      type: DataTypes.STRING(30),
       validate: {
        len: [1, 30]
      },
    },
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
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        len: [5, 2048]
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