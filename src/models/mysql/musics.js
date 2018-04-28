/* eslint-disable array-element-newline,new-cap */
module.exports = function(sequelize, DataTypes){
    return sequelize.define('Musics', {
        id: {
            primaryKey  : true,
            type        : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull   : false,
            unique      : true
        },
        name: {
            type        : DataTypes.STRING,
            allowNull   : false
        },
        duration: {
            type        : DataTypes.FLOAT,
            allowNull   : false
        },
        albumName: {
            type        : DataTypes.STRING,
            defaultValue: 'unknown',
            allowNull   : false
        },
        _artistId: {
            type        : DataTypes.STRING(24),
            allowNull   : false,
            validate    : {
                // Mongo ObjectID
                len: [24, 24]
            }
        }
    });
};