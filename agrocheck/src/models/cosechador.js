const sequelize = require('./coneccion.js');
const cosechador = sequelize.define('cosechador', {
    rut_cosechador:{
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
        unique: true
    },
    nombre_cosechador: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'cosechador'
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Activa'
    }

  });
  cosechador.belongsTo(rol); 