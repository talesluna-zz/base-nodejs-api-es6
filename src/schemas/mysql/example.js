module.exports = function(sequelize, DataTypes){
    return sequelize.define('Example', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    })
};