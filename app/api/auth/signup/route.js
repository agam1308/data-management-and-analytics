import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    
    // Check if user exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role || 'User', 'Active']
    );

    return NextResponse.json({ success: true, userId: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
