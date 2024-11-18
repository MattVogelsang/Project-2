const Comment = require('./Comment');
const Movie = require('./Movie');
const User = require('./User');

Movie.hasMany(Comment, {
    foreignKey: "movie_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(Movie, {
    foreignKey: "movie_id",
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', // If a user is deleted, their comments will also be deleted
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Movie, Comment };