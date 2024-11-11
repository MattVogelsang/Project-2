// models/Rating.js
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Rating.associate = function(models) {
      Rating.belongsTo(models.Movie);
      Rating.belongsTo(models.User);
    };
  
    return Rating;
  };
  