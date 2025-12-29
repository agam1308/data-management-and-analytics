import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // In a real app, you should hash passwords!
    // For this demo, we check plain text matching the requested "easy" setup
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
      // Login success
      const user = rows[0];
      return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
