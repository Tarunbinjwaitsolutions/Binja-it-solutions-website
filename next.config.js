import path from 'path';
import { fileURLToPath } from 'url';

import os from 'os';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLocalIPv4Addresses() {
  if (process.env.NODE_ENV !== 'development') return undefined;

  const interfaces = os.networkInterfaces();
  const addresses = ['localhost'];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

const devOrigins = getLocalIPv4Addresses();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'dh8ut0pnb37w5.cloudfront.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' }
    ]
  },
  experimental: {
    turbopackFileSystemCacheForDev: true
  },
  ...(devOrigins && { allowedDevOrigins: devOrigins }),
  async rewrites() {
    return [
      {
        // Proxies requests to a Python Flask API backend (handles AI chat, OpenRouter, MongoDB)
        source: '/chatbot-proxy/:path*',
        destination: `${process.env.LOCAL_CHATBOT_URL || 'https://chatbot-latest-b683.onrender.com'}/:path*`
      },
      {
        source: '/hrms-proxy/:path*',
        destination: `${process.env.LOCAL_HRMS_URL || 'https://dh8ut0pnb37w5.cloudfront.net/hrms'}/:path*`
      }
    ];
  }
};

export default nextConfig;
