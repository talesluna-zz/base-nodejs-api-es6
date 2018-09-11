import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Musics = sequelize.define('Musics', {
        id: {
            type        : DataTypes.UUID,
            primaryKey  : true,
            allowNull   : true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type        : DataTypes.STRING,
            unique      : true,
            allowNull   : false,
            validate    : {
                required: true
            }
        },
        duration: {
            type        : DataTypes.INTEGER,
            allowNull   : true
        },
        albumName: {
            type        : DataTypes.STRING,
            defaultValue: 'unknown'
        },
        artistId: {
            type        : DataTypes.UUID,
            allowNull   : false,
            validate: {
                required: true
            }
        }
    }
    ).schema('public');

    Musics.associate = (models) => {
      Musics.belongsTo(models.Artists, {
          onDelete: 'RESTRICT',
          foreignKeyConstraint: true,
          foreignKey: 'artistId'
      });
    };

    return Musics;
};