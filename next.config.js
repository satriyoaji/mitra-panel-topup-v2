/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn-panel.vcg.my.id",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;
