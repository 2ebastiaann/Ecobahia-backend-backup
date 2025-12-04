require('dotenv').config();

const express = require('express');
const cors = require('cors'); // <--- Importa cors
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors({
    origin: 'http://localhost:4200', // URL de tu frontend Angular
    credentials: true
}));

// Middleware para procesar JSON
app.use(express.json());

// Importar configuración de base de datos
const { sequelize, testConnection } = require('./config/db.config');
const db = require('./maquetas');

// Importar rutas de la API
const rutasRoutes = require('./routes/ruta.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const callesRoutes = require('./routes/calles.routes');
const vehiculosRoutes = require('./routes/vehiculos.routes');
const recorridosRoutes = require('./routes/recorridos.routes');

// Registrar rutas
app.use('/api/rutas', rutasRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/calles', callesRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/recorridos', recorridosRoutes);

// Endpoint de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido al Servidor Express EcoBahía',
        version: '1.0.0',
        endpoints: {
            rutas: '/api/rutas',
            barrios: '/api/barrios',
            posiciones: '/api/posiciones',
            usuarios: '/api/usuarios',
            calles: '/api/calles'
        }
    });
});

// Función para iniciar el servidor
async function iniciarServidor() {
    try {
        await testConnection();

        if (process.env.NODE_ENV !== 'production') {
            console.log('✅ Modelos sincronizados con la base de datos');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

iniciarServidor();
