const express = require('express');
const app = express();
const { Sequelize, where,Op } = require('sequelize');
//importaciones modelos
const operador = require('./models/operador');
const fruta = require('./models/fruta');
const ubicacion = require('./models/ubicacion');
//coneccion express
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud
const port = 3000; // Puedes usar el puerto que prefieras

app.listen(port, () => {
    console.log(`La aplicación está corriendo en http://localhost:${port}`);
});


// Parámetros de conexión
const sequelize = new Sequelize('agrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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


//crud operadores : tabla : operador

app.get('/api/buscarOperadores', async(req, res) => {

try {
    const operadores = await operador.findAll();
        res.send(operadores);
} catch(error){
        res.status(500).send(error);
}
});

app.post('/api/crearOperador', async (req, res) => {
    try {
        const nuevoOperador = await operador.create(req.body);
        res.json(nuevoOperador);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/eliminarOperador/:rut', async(req,res)=>{
    try{
        await operador.destroy({
            where:{
                rut_operador:req.params.rut
            }
        });
        res.send({message:'operador eliminado con exito'});
    }catch(error) {
        res.status(500).send(error);
    }
});

app.put('/api/actualizarOperador/:rut', async(req,res)=>{
    try{
        await operador.update(req.body, {
            where:{
                rut_operador:req.params.rut
            }
        });
        res.send({message:'operador actualizado con exito'});
    }catch(error) {
        res.status(500).send(error);
    }
});
//barra de busqueda operador
app.get('/api/barraBusquedaOperador', async (req, res) => {
    try {
        const { busqueda } = req.query;
        
        const resultados = await operador.findAll({
            where: {
                [Op.or]: [
                    { rut_operador: { [Op.like]:  busqueda.trim() + '%' } },
                    { nombre_operador: { [Op.like]:  busqueda.trim() + '%' } },
                    { estado: { [Op.like]: busqueda.trim() + '%' } }
                ]
            }
        });
        
        res.json(resultados);
    } catch (error) {
        res.status(500).send(error);
    }
});


//Crud fruta , tabla :fruta
app.get('/api/buscarFrutas', async(req,res)=>{
    try{
        const frutas = await fruta.findAll();
        res.send(frutas)
    }catch(error) {
        res.status(500).send(error)

    }
});

app.post('/api/crearFruta', async(req,res)=>{
    try{
        const nuevaFruta = await fruta.create(req.body);
        res.json(nuevaFruta)
    }catch(error){
        res.status(500).send(error);
    }
});
//eliminar por id
app.delete('/api/eliminarFruta/:id', async (req,res)=>{
    try{
        await fruta.destroy({
            where:{
                id:req.params.id
            } 
        });
        res.send({message:'fruta eliminada con exito'});
    }catch(error) {
        res.status(500).send(error);
    }
});
app.put('/api/actualizarFruta/:id',async(req,res)=>{
    try{
        await fruta.update(req.body, {
            where:{
                id:req.params.id
            }
        });
        res.send({message:'fruta actualizada con exito'});
    }catch(error){
        res.status(500).send(error);
    }
});
//barra de busqueda fruta
app.get('/api/barraBusquedaFruta',async(req,res)=>{
    try{
        const {busqueda}=req.query;
   
        const resultado = await fruta.findAll({
            where: {
                [Op.or]:[{nombre_fruta:{ [Op.like]: busqueda.trim() + '%' }}
            ]
            }
        });
        res.json(resultado);
    }catch(error){
        res.status(500).send(error);
    }
});

//crud ubicaciones
app.get('/api/buscarUbicaciones', async(req,res)=>{
    try{
        const ubicaciones = await ubicacion.findAll(); 
        res.json(ubicaciones);
    }catch(error) {
        res.status(500).send(error);

    }
});

app.post('/api/crearUbicacion',async(req,res)=>{
    try{
        const nuevaUbicacion = await ubicacion.create(req.body);
        res.json(nuevaUbicacion);
    }catch(error){
        res.status(500).send(error);
    }
});
app.delete('/api/eliminarUbicacion/:id',async(req,res)=>{
    try{
        await ubicacion.destroy({
            where:{
                id:req.params.id
            }
        })
        res.send({message:'ubicacion eliminada con exito'})
    }catch(error){
        send.status(500).send(error);
    }
})
app.put('/api/actualizarUbicacion/:id', async(req,res)=>{
    try{
        await ubicacion.update(req.body, {
            where:{
                id:req.params.id
            }
        });
        res.send({message:'ubicaacion actualizada con exito'});
    }catch(error){
        res.status(500).send(error);
    }
})

//barra busqueda ubicacion
app.get('/api/barraBusquedaUbicacion',async(req,res)=>{
    try{
        const {busqueda}=req.query;
   
        const resultado = await ubicacion.findAll({
            where: {
                [Op.or]:[{nombre_sector:{ [Op.like]:'%' + busqueda.trim() + '%' }}
            ]
            }
        });
        res.json(resultado);
    }catch(error){
        res.status(500).send(error);
    }
});
//
//control de usuarios
//