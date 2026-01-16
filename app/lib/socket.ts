import { Server } from 'socket.io';

export function initSocket(server: any) {
  if (!globalThis.io) {
    globalThis.io = new Server(server, {
      cors: { origin: '*' },
    });
  }
}
