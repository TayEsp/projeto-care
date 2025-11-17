import { NextResponse, NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get('session')?.value; // <-- nome correto

  // Bloqueia todas as rotas /plataform/* se não estiver autenticado
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/plataform')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Permite continuar se estiver autenticado
  return NextResponse.next();
}

// Protege todas as rotas /plataform/*
export const config = {
  matcher: ['/plataform/:path*'],
};