/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        KAZE_API_URL: process.env.KAZE_API_URL,
    }
};

export default nextConfig;
