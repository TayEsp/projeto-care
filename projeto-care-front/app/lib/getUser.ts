import 'server-only'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUser() {

  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const payload = await jwt.verify(token, process.env.SECRET_KEY!)
    return payload;
  } catch {
    return null;
  }
}
