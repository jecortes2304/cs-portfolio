import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // 🔹 MinIO local
            {
                protocol: 'http',
                hostname: '192.168.1.14',
                port: '9000',
                pathname: '/**',
            },
            // 🔹 MinIO producción
            {
                protocol: 'https',
                hostname: 'minio.cortestudios.online',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
};

export default withNextIntl(nextConfig);
