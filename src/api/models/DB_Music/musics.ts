import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
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
            validate: {
                required: true
            }
        },
        duration: {
            type        : DataTypes.FLOAT,
            allowNull   : true,
            validate: {
                required: true
            }
        },
        albumName: {
            type        : DataTypes.STRING,
            defaultValue: 'unknown',
            validate: {
                lowercase: true
            }
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