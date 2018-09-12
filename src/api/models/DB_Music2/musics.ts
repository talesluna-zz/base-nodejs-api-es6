import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
    const musics = sequelize.define('Musics', {
        id: {
            type        : dataTypes.UUID,
            primaryKey  : true,
            allowNull   : true,
            defaultValue: dataTypes.UUIDV4
        },
        name: {
            type        : dataTypes.STRING,
            unique      : true,
            allowNull   : false,
            validate    : {
                required: true
            }
        },
        duration: {
            type        : dataTypes.INTEGER,
            allowNull   : true
        },
        albumName: {
            type        : dataTypes.STRING,
            defaultValue: 'unknown'
        },
        artistId: {
            type        : dataTypes.UUID,
            allowNull   : false,
            validate: {
                required: true
            }
        }
    }
    )
    .schema('public');

    musics.associate = (models) => {
        musics.belongsTo(models.Artists, {
            onDelete: 'RESTRICT',
            foreignKeyConstraint: true,
            foreignKey: 'artistId'
        });
    };

    return musics;

};
