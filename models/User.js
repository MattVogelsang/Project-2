module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        username: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
};