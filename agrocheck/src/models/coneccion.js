// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('agrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    } 
});
async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('La conexión ha sido establecida exitosamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}
authenticateDatabase();
module.exports = sequelize;
