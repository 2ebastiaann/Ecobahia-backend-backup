require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
    origin: [
        'http://localhost:4200',
        'http://ecobahia.eleueleo.com'
    ],
    credentials: true
}));

app.use(express.json());

// Importar rutas
app.use('/api/rutas', require('./routes/ruta.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/calles', require('./routes/calles.routes'));
app.use('/api/vehiculos', require('./routes/vehiculos.routes'));
app.use('/api/recorridos', require('./routes/recorridos.routes'));

// Endpoint raíz
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido al Servidor Express EcoBahía',
        version: '1.0.0'
    });
});

module.exports = app;
