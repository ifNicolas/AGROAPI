const { Sequelize, DataTypes , Model} = require('sequelize');

 
const rol = sequelize.define('rol', {
    tipo_rol: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });