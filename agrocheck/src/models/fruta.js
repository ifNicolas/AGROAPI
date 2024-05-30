const { Sequelize, DataTypes , Model} = require('sequelize');


const sequelize = new Sequelize('agrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,} 
});

class fruta extends Model {}

fruta.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_fruta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'fruta',
    tableName: 'fruta',
});

module.exports = fruta;
