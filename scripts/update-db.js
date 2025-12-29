
const { createPool } = require('mysql2/promise');

async function updateDb() {
  const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'next_redux_db'
  });

  try {
    // Check if password column exists
    const [columns] = await pool.query("SHOW COLUMNS FROM users LIKE 'password'");
    if (columns.length === 0) {
      await pool.query("ALTER TABLE users ADD COLUMN password VARCHAR(255) DEFAULT '123456'");
      console.log("Added password column to users table.");
    } else {
      console.log("Password column already exists.");
    }
  } catch (err) {
    console.error('Error updating database:', err);
  } finally {
    await pool.end();
  }
}

updateDb();
