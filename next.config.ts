import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },

       // Render backend (for production / deployed API)
    {
      protocol: "https",
      hostname: "eccomm-gadjet-backend.onrender.com",
      pathname: "/media/**",
    },
    
    ],
  },
};

export default nextConfig;
