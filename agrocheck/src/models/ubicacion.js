const { Sequelize, DataTypes , Model} = require('sequelize');


const sequelize = new Sequelize('agrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,} 
});

class ubicacion extends Model {}

ubicacion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_sector: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ubicacion',
    tableName: 'ubicacion',
});

module.exports = ubicacion;
