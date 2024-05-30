const express = require('express');
const app = express();
const db = require('./Database_connect.js'); // Conexión a la base de datos

app.use(express.json());

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000...');
});

// Rutas para Operador
app.get('/api/operador', (req, res) => {
    let sql = 'SELECT * FROM Operador';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

app.put('/api/updateFruit/:id', (req, res) => {
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

app.get('api/getFruit', (req,res)=> {
    const sql = 'SELECT * FROM fruta';
    db.query(sql, (err,results) =>{
        if(err) throw err;
        res.send(results)
    })

})



// Rutas para Cosechador
app.get('/api/cosechador', (req, res) => {
    let sql = 'SELECT * FROM Cosechador';
    db.query(sql, (err, results) => {
        if(error) throw error;
        res.send(results);
    });
});


// Rutas operador
app.get('/api/operador/:rut', (req, res) => {
    // Leer un operador
    const rut = req.params.rut;
    const sql = 'SELECT * FROM Operador WHERE rut = ?';
    db.query(sql, rut, (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});
  
app.post('/api/operadorinsert', (req, res) => {
    // Crear un operador
    const sql = 'INSERT INTO Operador SET ?';
    const operadorObj = {
        rut_operador: req.body.rut_operador,
        contraseña: req.body.contraseña,
        estado: req.body.estado,
    };
    db.query(sql, operadorObj, (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});
  
app.put('/api/operador/:rut_operador', (req, res) => {
    // Actualizar un operador
    const rut = req.params.rut_operador;
    const sql = 'UPDATE Operador SET ? WHERE rut_operador = ?';
    db.query(sql, [req.body, rut], (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});
  
app.delete('/api/deleteOperador/:rut', (req, res) => {
    // Eliminar un operador
    const rut = req.params.rut_operador;
    const sql = 'DELETE FROM operador WHERE rut_operador = ?';
    db.query(sql, rut, (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

