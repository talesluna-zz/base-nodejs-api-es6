import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
    const artists = sequelize.define('Artists', {
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
        }
    }
    )
    .schema('public');

    artists.associate = (models) => {
        artists.hasMany(models.Musics, {
            onDelete: 'RESTRICT',
            foreignKeyConstraint: true,
            foreignKey: 'artistId'
        });
    };

    return artists;

};
