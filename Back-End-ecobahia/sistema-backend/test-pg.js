require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function test() {
  try {
    await client.connect();
    console.log('✅ Conectado con pg (driver nativo)');
    
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    
    console.log(`📦 Tablas (${res.rows.length}):`);
    res.rows.forEach(row => console.log(`   - ${row.table_name}`));
    
    await client.end();
  } catch (err) {
    console.error('❌ Error con pg:', err.message);
  }
}

test();