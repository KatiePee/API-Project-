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
        {foreignKey: 'ownerId', as: 'Owner'}
      )
      
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(30),
      allowNull: false,
       validate: {
        len: [1,30],
        // len: {args: [1, 30], msg: ''}
      },
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false,
       validate: {
        len: [1, 30]
      },
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false,
       validate: {
        len: [1, 30]
      },
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false,
       validate: {
        len: [1, 30]
      },
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 90,
        min: -90,
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5, 2048]
      }
      
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};