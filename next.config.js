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
                hostname: "cdn-h2h.s3.ap-southeast-1.amazonaws.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "cdn.vcgamers.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "cdn-panel.vcg.my.id",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;
