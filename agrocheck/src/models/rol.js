const Sequelize = require('sequelize');
const sequelize = new Sequelize('agrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,} 
});
 
const rol = sequelize.define('rol', {
    tipo_rol: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });