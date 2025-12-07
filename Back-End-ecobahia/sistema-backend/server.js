require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3007;

// Arranque del backend sin túnel SSH ni PostgreSQL local
(async () => {
    try {
        console.log('🚀 Iniciando backend con Supabase...');

        app.listen(PORT, () => {
            console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`🌐 API lista en http://localhost:${PORT}/`);
        });

    } catch (err) {
        console.error('❌ Error crítico al iniciar backend:', err);
        process.exit(1);
    }
})();
