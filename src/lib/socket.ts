import { Server } from 'socket.io';

import { Events } from '../constants/Events';

export function startWs(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });
  // *user connection
  io.on(Events.CONNECTION, (socket) => {
    console.info('User connected');
    // *user disconnected
    socket.on(Events.DISCONNECT, () => {
      console.info('User disconnected');
    });
  });
}
