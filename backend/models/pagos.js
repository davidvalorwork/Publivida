module.exports = (sequelize, DataTypes) => {
    const Pagos = sequelize.define('pagos', {
      id_pagos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      monto:{
        type: DataTypes.INTEGER,
      },
      flow_token:{
        type: DataTypes.STRING,
      },
      estado:{
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
    Pagos.associate = (models) => {
        Pagos.belongsTo(models.pedidos);
    };
    return Pagos;
  }
  