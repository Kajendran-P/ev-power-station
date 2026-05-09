import { io } from 'socket.io-client';
const SOCKET_URL = 'https://ev-power-station.onrender.com';
let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { transports: ['websocket', 'polling'], autoConnect: true });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null; }
};
