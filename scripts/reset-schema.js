
const { createPool } = require('mysql2/promise');

async function resetSchema() {
  console.log("Resetting Database Schema...");
  const pool = createPool({
    host: '127.0.0.1', 
    user: 'root',
    password: 'root', 
    database: 'next_redux_db'
  });

  try {
    await pool.query(`DROP TABLE IF EXISTS users`);
    console.log("Dropped table 'users'.");

    await pool.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'User',
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Created table 'users' with password column.");

    await pool.query(`
      INSERT INTO users (name, email, password, role, status) VALUES 
      ('Alice Johnson', 'alice@example.com', '123456', 'Admin', 'Active'),
      ('Bob Smith', 'bob@example.com', '123456', 'Editor', 'Inactive'),
      ('Charlie Brown', 'charlie@example.com', '123456', 'User', 'Active'),
      ('Admin User', 'admin@nexus.com', 'admin123', 'Admin', 'Active')
    `);
    console.log("Seeded initial data.");

  } catch (err) {
    console.error("Schema Reset Failed:", err);
  } finally {
    await pool.end();
  }
}

resetSchema();
