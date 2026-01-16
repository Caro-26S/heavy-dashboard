// socket-server.ts
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient, RedisClientType } from 'redis';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

// 🔥 Cliente Redis tipado
const redis: RedisClientType = createClient({
  url: 'redis://localhost:6379',
});

await redis.connect();

redis.subscribe('dashboard:updated', (message: string) => {
  const data = JSON.parse(message);
  console.log('📢 Evento recibido desde Redis');
  io.emit('done', data);
});

io.on('connection', socket => {
  console.log('🟢 Cliente conectado');
});

httpServer.listen(3001, () => {
  console.log('🚀 Socket server en http://localhost:3001');
});
