// models/Movie.js
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      poster: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imdbRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    });
    return Movie;
  };
  