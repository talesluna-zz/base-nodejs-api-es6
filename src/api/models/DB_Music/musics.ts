import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
    return sequelize.define('Musics', {
        id: {
            primaryKey  : true,
            type        : dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            allowNull   : false,
            unique      : true
        },
        name: {
            type        : dataTypes.STRING,
            allowNull   : false,
            validate: {
                required: true
            }
        },
        duration: {
            type        : dataTypes.FLOAT,
            allowNull   : true,
            validate: {
                required: true
            }
        },
        albumName: {
            type        : dataTypes.STRING,
            defaultValue: 'unknown',
            validate: {
                lowercase: true
            }
        },
        _artistId: {
            type        : dataTypes.STRING,
            allowNull   : false,
            validate    : {
                len: [0, 24]
            }
        }
    });

};
