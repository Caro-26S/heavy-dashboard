// app/api/recalculate/route.ts
import { NextResponse } from 'next/server';
import { redis } from '../../lib/redis';

export async function POST() {
  console.log('🔥 Recalculando datos');

  // Simula query pesada
  await new Promise(res => setTimeout(res, 3000));

  const data = {
    users: Math.floor(Math.random() * 1000),
    sales: Math.floor(Math.random() * 5000),
  };

  // Cache
  await redis.set('dashboard:data', JSON.stringify(data));

  // 🔥 PUBLICA EVENTO
  await redis.publish('dashboard:updated', JSON.stringify(data));

  return NextResponse.json({ ok: true });
}
