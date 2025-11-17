import type { NextConfig } from "next";
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve('./../.env.shared') });

module.exports = {
  reactStrictMode: true,
};

const nextConfig: NextConfig = {
  env: {
    // expõe explicitamente variáveis para o client
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
};

export default nextConfig;
