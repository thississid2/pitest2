import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
    );

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: payload.userId,
        clientId: payload.clientId,
        email: payload.email,
        role: payload.role,
        permissions: payload.permissions,
      },
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
