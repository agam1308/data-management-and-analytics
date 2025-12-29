
const { createPool } = require('mysql2/promise');

async function diagnose() {
  console.log("Starting DB Diagnosis...");
  const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root', 
    database: 'next_redux_db'
  });

  try {
    // 1. Check Connection
    console.log("1. Testing connection...");
    await pool.query('SELECT 1');
    console.log("   Connection SUCCESS.");

    // 2. Check Table Schema
    console.log("2. Checking 'users' table schema...");
    const [columns] = await pool.query("SHOW COLUMNS FROM users");
    console.log("   Columns found:", columns.map(c => c.Field).join(', '));
    
    // 3. Test Insert (Rollback)
    console.log("3. Testing INSERT...");
    const testEmail = 'test_' + Date.now() + '@example.com';
    await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      ['Test User', testEmail, 'password123', 'User', 'Active']
    );
    console.log("   Insert SUCCESS.");

    // Cleanup
    await pool.query('DELETE FROM users WHERE email = ?', [testEmail]);
    console.log("   Cleanup SUCCESS.");

  } catch (err) {
    console.error("!!! DIAGNOSIS FAILED !!!");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
  } finally {
    await pool.end();
  }
}

diagnose();
