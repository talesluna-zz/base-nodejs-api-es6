module.exports = function(sequelize, DataTypes){
    const Example = sequelize.define('Example', {
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
    }
    ).schema('public');

    return Example;
};