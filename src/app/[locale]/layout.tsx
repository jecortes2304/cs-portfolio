import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {NextIntlClientProvider} from "next-intl";

export const metadata: Metadata = {
    title: "CortesStudios",
    description: "Portfolio of CortesStudios",
};

export default async function HomeLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale = ['en', 'es'].includes(rawLocale) ? rawLocale : 'en';
    const messages = (await import(`../../../messages/${locale}.json`)).default;

    return (
        <html lang={locale}>
        <body className="bg-[#1a1a1a] text-white min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="flex-1">
                {children}
            </main>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}