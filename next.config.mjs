/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        
      },
      {
        protocol: 'https',
        hostname: '**',
        
      },
    ],
  },
};

export default nextConfig;
