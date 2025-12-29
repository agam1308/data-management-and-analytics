
const { createPool } = require('mysql2/promise');

async function checkColumns() {
  const pool = createPool({ host: '127.0.0.1', user: 'root', password: 'root', database: 'next_redux_db' });
  const [columns] = await pool.query("SHOW COLUMNS FROM users");
  console.log("COLUMNS:", columns.map(c => c.Field));
  await pool.end();
}
checkColumns();
