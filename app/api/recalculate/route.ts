// src/app/api/recalculate/route.ts
import { NextResponse } from 'next/server';
import { redis } from '../../lib/redis';
import { heavyQuery } from '../../lib/heavyQuery';

const CACHE_KEY = 'dashboard:data';

export async function POST() {
  // no esperamos respuesta pesada en el cliente
  recalculateInBackground();

  return NextResponse.json({ ok: true });
}

async function recalculateInBackground() {
  // Simula progreso
  for (let i = 1; i <= 3; i++) {
    await new Promise(res => setTimeout(res, 2000));
    globalThis.io?.emit('progress', i * 33);
  }

  const data = await heavyQuery();
  await redis.set(CACHE_KEY, JSON.stringify(data), 'EX', 60);

  globalThis.io?.emit('done', data);
}
