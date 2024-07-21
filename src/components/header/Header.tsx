"use client"
import Image from "next/image";
import React, {useEffect, useCallback} from "react";
import Link from "next/link";
import LanguageToggle from "@/components/helpers/LanguageToggle";
import {useTranslations} from "next-intl";

const Header: React.FC = () => {
    const t = useTranslations('HomePage.HeaderSection');

    const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace(/.*#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const links = document.querySelectorAll('header a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => handleScroll(e as any, (e.currentTarget as HTMLAnchorElement).getAttribute('href') || ''));
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', (e) => handleScroll(e as any, (e.currentTarget as HTMLAnchorElement).getAttribute('href') || ''));
            });
        };
    }, [handleScroll]);

    return (
        <header className="sticky top-0 z-50 shadow-md" data-superjson-next-scroll-prevent-on-focus-boundary={true}>
            <div className="navbar bg-base-100 glassy py-4">
                <div className="navbar-start lg:hidden">
                    <Link href={"#hero"} className="btn btn-ghost" onClick={(e) => handleScroll(e, '#home')}>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={35}
                            height={35}
                            priority
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex justify-center items-center flex-1">
                    <Link href={"#hero"} className="mx-1 btn btn-ghost" onClick={(e) => handleScroll(e, '#home')}>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={35}
                            height={35}
                            priority
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                        />
                    </Link>
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <li className="text-white">
                            <Link href={"#summarize"}
                                  onClick={(e) => handleScroll(e, '#summarize')}>{t('resume')}</Link>
                        </li>
                        <li className="text-white">
                            <Link href={"#about"} onClick={(e) => handleScroll(e, '#about')}>{t('about')}</Link>
                        </li>
                        <li className="text-white">
                            <Link href={"#portfolio"}
                                  onClick={(e) => handleScroll(e, '#portfolio')}>{t('portfolio')}</Link>
                        </li>
                        <li className="text-white">
                            <Link href={"#contact"} onClick={(e) => handleScroll(e, '#contact')}>{t('contact')}</Link>
                        </li>
                    </ul>
                    <div className={"mx-4"}>
                        <LanguageToggle/>
                    </div>
                </div>
                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-[#222426] rounded-box w-52 gap-2">
                            <li className="text-white mt-2">
                                <Link href={"#hero"} onClick={(e) => handleScroll(e, '#hero')}>{t('home')}</Link>
                            </li>
                            <li className="text-white">
                                <Link href={"#summarize"}
                                      onClick={(e) => handleScroll(e, '#summarize')}>{t('resume')}</Link>
                            </li>
                            <li className="text-white">
                                <Link href={"#about"} onClick={(e) => handleScroll(e, '#about')}>{t('about')}</Link>
                            </li>
                            <li className="text-white">
                                <Link href={"#portfolio"}
                                      onClick={(e) => handleScroll(e, '#portfolio')}>{t('portfolio')}</Link>
                            </li>
                            <li className="text-white">
                                <Link href={"#contact"}
                                      onClick={(e) => handleScroll(e, '#contact')}>{t('contact')}</Link>
                            </li>
                            <div className={"divider divider-vertical"}>
                                <LanguageToggle/>

                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;