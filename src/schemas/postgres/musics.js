module.exports = function(sequelize, DataTypes){
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
            defaultValue: 'Independent'
        },
        artistId: {
            type: DataTypes.UUID
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