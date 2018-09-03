/* eslint-disable array-element-newline */
export default (sequelize, DataTypes) => {
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
            allowNull   : false,
            required    : true
        },
        duration: {
            type        : DataTypes.FLOAT,
            allowNull   : true,
            required    : true
        },
        albumName: {
            type        : DataTypes.STRING,
            defaultValue: 'unknown',
            lowercase   : true
        },
        _artistId: {
            type        : DataTypes.STRING,
            allowNull   : false,
            validate    : {
                len: [0, 24]
            }
        }
    });
};