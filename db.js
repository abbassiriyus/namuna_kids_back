const { Pool } = require('pg');

// PostgreSQL bazasiga ulanish sozlamalari
const pool = new Pool({
  user: 'abbasuz3_user',         // ➤ PostgreSQL useringiz
  host: 'localhost',        // ➤ Server manzili
  database: 'abbasuz3_namuna',       // ➤ Bazangiz nomi
  password: 'nCRTOfP3ihRiR1&u', // ➤ Parol (o'zgartiring)
  port: 5432                // ➤ Default port
});

module.exports = pool;
