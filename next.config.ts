import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.14',
                port: '9000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'minio.cortestudios.online',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
    serverExternalPackages: ['@prisma/client', 'bcrypt'],
    turbopack: {
        resolveAlias: {
            'next-intl/config': './src/i18n/request.ts',
        },
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
};

export default withNextIntl(nextConfig);
