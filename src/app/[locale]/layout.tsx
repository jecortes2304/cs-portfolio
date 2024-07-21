import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Footer from "@/components/footer/Footer";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";

export const metadata: Metadata = {
    title: "CortesStudios",
    description: "Portfolio of CortesStudios",
};

export default async function HomeLayout({children}: {children: React.ReactNode;}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className="bg-[#1a1a1a] text-white min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="flex-grow">
                {children}
            </main>
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}