
const { createPool } = require('mysql2/promise');

async function initDb() {
  const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', 
  });

  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS next_redux_db`);
    await pool.query(`USE next_redux_db`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Active',
        role VARCHAR(50) DEFAULT 'User',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Seed some data if empty
    const [rows] = await pool.query('SELECT count(*) as count FROM users');
    if (rows[0].count === 0) {
       await pool.query(`
        INSERT INTO users (name, email, status, role) VALUES 
        ('Alice Johnson', 'alice@example.com', 'Active', 'Admin'),
        ('Bob Smith', 'bob@example.com', 'Inactive', 'Editor'),
        ('Charlie Brown', 'charlie@example.com', 'Active', 'User'),
        ('Diana Prince', 'diana@example.com', 'Active', 'Admin'),
        ('Evan Wright', 'evan@example.com', 'Pending', 'User')
      `);
      console.log('Database seeded!');
    } else {
      console.log('Database already exists and has data.');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

initDb();
