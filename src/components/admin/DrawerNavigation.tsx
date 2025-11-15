"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import NavBar from "./NavBar";
import {navItems} from "./navItems";
import {useLocale, useTranslations} from "next-intl";

const DrawerNavigation: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("AdminPanel.HomePage.Drawer");

    return (
        <div className="drawer lg:drawer-open h-screen">
            <input id="admin-drawer" type="checkbox" className="drawer-toggle"/>

            <div className="drawer-content bg-base-300 flex flex-col h-screen">
                <NavBar/>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="admin-drawer" className="drawer-overlay lg:hidden"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4 gap-4">
                    <div className="flex flex-col w-full items-center mb-8">
                        <div className="avatar mt-6">
                            <div className="w-20 rounded-2xl">
                                <Image src="/logo.webp" alt="Logo" width={80} height={80}/>
                            </div>
                        </div>
                        <span className="mt-4 font-bold text-lg">
              {t("brand")}
            </span>
                    </div>

                    {navItems.map(({href, label, icon: Icon}) => {
                        const active = pathname === href;
                        return (
                            <li key={href} className="text-lg">
                                <Link
                                    href={`/${locale}${href}`}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                                        active
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-5 w-5"/>
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default DrawerNavigation;
