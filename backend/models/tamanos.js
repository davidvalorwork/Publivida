module.exports = (sequelize, DataTypes) => {
  const Tamanos = sequelize.define('tamanos', {
    id_tamanos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tamano:{
      type: DataTypes.STRING,
    },
    borrado:{
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true
    }
  );
  Tamanos.associate = (models) => {
      Tamanos.belongsTo(models.productos);
  };
  return Tamanos;
}
