const express = require('express');
// const mysql = require('mysql')
const db = require('./Database_connect');
const app = express();
const port = 3000;

app.use(express.json()); // Para poder recibir JSON en el cuerpo de las solicitudes

// const db = mysql.createConnection({
//   host: 'agrocheckdb.cvscewii88gp.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'admin1234',
//   port: 3306,
//   database: 'agrocheckdb'
// });

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});
//consultas ubicacion y frutas
// Crear  fruta
app.post('/api/add_fruit', (req, res) => {
  
  const sql = 'INSERT INTO Fruta SET nombre = ?';
  const nombre =  req.body.nombre;

  //envio de query
  db.query(sql,[nombre], (error, result) => {
      if(error) throw error;
      console.log(req.body);
      res.send(result);

  });
});

//consultar frutas
app.get('/api/see_fruit', (req,res) =>{
  const sql = 'SELECT * FROM Fruta';
  db.query(sql, (error,result) => {
    if (error) throw error;
    res.send(result)
  });
});

//update fruit
app.put('/api/update_fruit/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const sql = 'UPDATE Fruta SET nombre = ? WHERE id = ?';

  db.query(sql, [nombre, id], (error, result) => {
      if (error) {
          console.error('Error al actualizar la fruta: ', error);
          res.status(500).send('Error al actualizar la fruta');
      } else {
          res.send(result);
      }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});