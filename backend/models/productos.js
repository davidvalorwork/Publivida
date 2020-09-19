module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
      id_productos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre_producto:{
        type: DataTypes.STRING,
      },
      stock:{
        type: DataTypes.INTEGER,
      },
      descripcion_producto:{
        type: DataTypes.STRING,
      },
      urls_img:{
        type:DataTypes.STRING,
      },
      urls_plantilla:{
        type:DataTypes.STRING,
      },
      colores_primarios:{
        type:DataTypes.STRING,
      },
      borrado:{
        type: DataTypes.INTEGER,
      },
    },
      {
        freezeTableName: true
      }
    );
    Productos.associate = (models) => {
        Productos.hasMany(models.precios);
        Productos.hasMany(models.tamanos);
        Productos.belongsTo(models.categorias);
    };
    return Productos;
  }
  