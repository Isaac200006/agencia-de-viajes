// const express = require('express');
import express from 'express';
import router from './routes/index.js'
import db from './config/db.js';
import Dotenv from 'dotenv';
Dotenv.config({ path: 'variables.env' });

const app = express();

//Conectar la base de datos
db.authenticate().then(() => console.log('BD conectada'))
    .catch(error => console.log(error));

//Definir el puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obtener año actual
app.use((req, res, next) => { //req - lo que enviamos : res - lo que express nos responde : next - siguiente midleware 
    const year = new Date();
    res.locals.yearActual = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de viajes';
    return next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta pública
app.use(express.static('public'));

//Agregar router
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El servidor está funcionando en el host ${host} y el puerto ${port}`);
});