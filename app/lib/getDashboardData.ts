import { redis } from './redis';
import { heavyQuery } from './heavyQuery';

const CACHE_KEY = 'dashboard:data';

export async function getDashboardData() {
  const cached = await redis.get(CACHE_KEY);

  if (cached) {
    return {
      data: JSON.parse(cached),
      fromCache: true,
    };
  }

  const data = await heavyQuery();

  await redis.set(CACHE_KEY, JSON.stringify(data), 'EX', 60);

  return {
    data,
    fromCache: false,
  };
}
