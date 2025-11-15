"use client";

import React from "react";
import {useTranslations} from "next-intl";
import Image from "next/image";

const NavBar: React.FC = () => {
    const t = useTranslations("AdminPanel.HomePage.NavBar");

    const handleLogout = () => {
        console.log("Logout...");
    };

    return (
        <div className="navbar flex justify-between px-6 py-3 border-b border-white/10">
            <div className="flex items-center gap-4">
                <label htmlFor="admin-drawer" className="btn btn-ghost lg:hidden">
                    ☰
                </label>
                <h2 className="font-semibold text-white">{t("title")}</h2>
            </div>

            <div>
                <div className="dropdown dropdown-end me-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src="/logo.webp" alt="Logo" width={80} height={80} />
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <button onClick={handleLogout}>
                                {t("logout")}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
