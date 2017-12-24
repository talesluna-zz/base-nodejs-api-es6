module.exports = function(sequelize, DataTypes){
    const Artists = sequelize.define('Artists', {
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