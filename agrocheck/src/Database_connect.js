const mysql = require('mysql');   //mysql variable sql

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'agrodb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');

  // Consulta para mostrar las tablas
  connection.query('SHOW TABLES', (err, tables) => {
    if (err) {
      console.error('Error al recuperar las tablas: ', err);
      return;
    }
    console.log('Tablas: ', tables);
  });
});

module.exports = connection;

