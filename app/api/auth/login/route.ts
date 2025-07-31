import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query the database for the user
    const client = await pool.connect();
    try {
      const query = `
        SELECT id, client_id, email, password_hash, role, permissions, 
               first_name, last_name, status, failed_login_attempts, 
               locked_until, must_change_password
        FROM client_users 
        WHERE email = $1 AND status = 'ACTIVE'
      `;
      
      const result = await client.query(query, [email]);

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const user = result.rows[0];

      // Check if account is locked
      if (user.locked_until && new Date() < new Date(user.locked_until)) {
        return NextResponse.json(
          { error: 'Account is locked. Please try again later.' },
          { status: 423 }
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        // Increment failed login attempts
        const failedAttempts = (user.failed_login_attempts || 0) + 1;
        let lockUntil = null;

        // Lock account after 5 failed attempts for 15 minutes
        if (failedAttempts >= 5) {
          lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        }

        await client.query(
          'UPDATE client_users SET failed_login_attempts = $1, locked_until = $2 WHERE id = $3',
          [failedAttempts, lockUntil, user.id]
        );

        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

        // Reset failed login attempts and update last login
        await client.query(
          'UPDATE client_users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
          [user.id]
        );      // Create JWT token
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
      );

      const token = await new SignJWT({
        userId: user.id,
        clientId: user.client_id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      const response = NextResponse.json({
        message: 'Login successful',
        user: {
          id: user.id,
          clientId: user.client_id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          mustChangePassword: user.must_change_password,
        },
      });

      // Set HTTP-only cookie
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      return response;

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
