const { Sequelize } = require('sequelize');

const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'postgres';
const PASSWORD = process.env.DB_PASSWORD || 'Jack#_45279*2724';
const DB = process.env.DB_NAME || 'db_app_EcoBahia';
const PORT_DB = process.env.DB_PORT || 5432;

// ESCAPAR la contraseña para la URL de conexión
const escapedPassword = encodeURIComponent(PASSWORD);
const connectionString = `postgresql://${USER}:${escapedPassword}@${HOST}:${PORT_DB}/${DB}`;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
        throw error; // IMPORTANTE: lanzar el error para que lo capturen arriba
    }
}

module.exports = { sequelize, testConnection };