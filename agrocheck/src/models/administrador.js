const sequelize = require('./coneccion.js');
const administrador = sequelize.define('administrador', {
    rut_administrador:{
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
        unique: true
    },
    nombre_administrador: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'administrador'
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Activa'
    }

  });
  administrador.belongsTo(rol); 