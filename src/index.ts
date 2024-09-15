require('regenerator-runtime');
require('dotenv/config');

import { createServer } from 'http';

import app from './lib/app';
import { startWs } from './lib/socket';

const server = createServer(app);
const PORT = process.env.PORT || 4000;

startWs(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
