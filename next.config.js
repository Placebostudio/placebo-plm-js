/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'eiualxzcgjdfqkthsdce.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
};

module.exports = nextConfig;
