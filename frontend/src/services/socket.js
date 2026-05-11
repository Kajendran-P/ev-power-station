import API from './api';

// Socket.IO is not supported on Vercel Serverless.
// This module provides HTTP polling fallback for real-time features.
let pollingInterval = null;
let listeners = {};

export const getSocket = () => {
  // Return a mock socket-like object that uses HTTP polling
  return {
    on: (event, callback) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },
    emit: (event, data) => {
      // For SOS location updates, send via HTTP
      if (event === 'sos:location-update') {
        API.put(`/sos/${data.sosId}`, { techLat: data.lat, techLng: data.lng }).catch(() => {});
      }
    },
    off: (event) => {
      delete listeners[event];
    },
    connected: true,
    disconnect: () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
      }
    }
  };
};

// Start polling for SOS updates
export const startSOSPolling = (sosId, callback, intervalMs = 5000) => {
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(async () => {
    try {
      const res = await API.get(`/sos/${sosId}`);
      if (res.data && callback) callback(res.data);
    } catch {
      // Silently fail — will retry on next interval
    }
  }, intervalMs);
  return pollingInterval;
};

export const disconnectSocket = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
  listeners = {};
};
