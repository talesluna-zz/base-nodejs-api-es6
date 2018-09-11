import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Artists = sequelize.define('Artists', {
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
        }
    }
    ).schema('public');

    Artists.associate = (models) => {
        Artists.hasMany(models.Musics, {
            onDelete: 'RESTRICT',
            foreignKeyConstraint: true,
            foreignKey: 'artistId'
        });
    };

    return Artists;
};