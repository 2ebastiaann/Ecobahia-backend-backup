require('dotenv').config();

const app = require('./app');            // Tu aplicación Express ya configurada
const connectToPgSSH = require('./ssh-tunel');
const { testConnection } = require('./config/db.config');

const PORT = process.env.PORT || 3000;

// Arranque del backend
(async () => {
    try {
        console.log('🔐 Estableciendo túnel SSH...');
        await connectToPgSSH();
        console.log('🟢 Túnel SSH activo');

        console.log('🔄 Probando conexión a PostgreSQL...');
        await testConnection();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`🌐 API lista en http://localhost:${PORT}/`);
        });

    } catch (err) {
        console.error('❌ Error crítico al iniciar backend:', err);
        process.exit(1);
    }
})();
