import { Server } from 'socket.io';

import { Events } from '../constants/Events';
import User from '../models/User';

const channels: Record<string, User[]> = {};

export function startWs(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on(Events.CONNECTION, (socket) => {
    console.info('User connected');

    socket.on(Events.LOGIN, ({ username, siteId }) => {
      console.info({ username, siteId });
      // check if channel exists
      const c = channels[siteId];
      if (!c) {
        channels[siteId] = [];
        console.log(channels);
      }
      // check if user exists in channel
      const user = channels[siteId].find((u) => u.username === username);
      console.info(user);
      if (user) return;
      // add user to channel
      channels[siteId].push(new User(username, siteId));
      socket.join(siteId);
      socket.broadcast.to(siteId).emit(Events.USERS, channels[siteId]);
    });
    socket.on(Events.DISCONNECT, () => {
      console.info('User disconnected');
    });
  });
}
