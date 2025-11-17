'use server'
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../lib/sessions'

export async function POST(req: NextRequest) {
  const { email, senha } = await req.json();

  const response = await fetch('http://localhost:3001/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    await createSession(access_token);

    return NextResponse.json({ status: 200 });
  } else {
    const err = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.message || "Erro fazer login" },
      { status: 400 }
    );
  }
}
