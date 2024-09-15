import { Server } from 'socket.io';

import { Events } from '../constants/Events';
import User from '../models/User';

const ChannelList = [
  { id: '1', name: 'Channel 1' },
  { id: '2', name: 'Channel 2' },
];

const users: Record<'username' | 'id', string>[] = [];
const channels: Record<'userId' | 'id', string>[] = [];

export function startWs(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on(Events.CONNECTION, (socket) => {
    console.info('User connected');

    socket.on(Events.LOGIN, ({ username }) => {
      console.info('User logged in', username);
      socket.emit(Events.CHANNELS, ChannelList);
    });

    socket.on(Events.JOIN_CHANNEL, ({ username, channelId }) => {
      const isUserInChannel = channels.some((user) => user.userId === username && user.id === channelId);
      if (isUserInChannel) {
        socket.emit(Events.ERROR, 'User already exists');
        return;
      }
      socket.join(channelId);
      channels.push({ userId: username, id: channelId });
      console.info({ channels });
      // emit to only channel
      io.to(channelId).emit(
        Events.USERS,
        channels.filter((u) => u.id === channelId)
      );
    });

    socket.on(Events.DISCONNECT, () => {
      console.info('User disconnected');
    });
  });
}
