import type { NextConfig } from "next";
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve('./../.env.shared') });

module.exports = {
  reactStrictMode: true,
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
};

export default nextConfig;
