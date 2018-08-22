export default (sequelize, DataTypes) => {
    const Musics = sequelize.define('Musics', {
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
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        albumName: {
            type: DataTypes.STRING,
            defaultValue: 'unknown'
        },
        artistId: {
            type: DataTypes.UUID,
            allowNull: false
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