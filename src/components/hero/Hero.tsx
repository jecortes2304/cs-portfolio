import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import TypedSubtitle from "@/components/hero/TypedSubtitle";
import React from "react";
import { getEnvsDrive } from "@/config/Settings";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata = {
    title: 'Hero Section',
    description: 'Hero section of the home page.',
};


const Hero: React.FC = async () => {
    const { urlPortfolioEs, urlPortfolioEn } = getEnvsDrive();
    const locale = await getLocale();
    const t = await getTranslations('HomePage.HeroSection');

    return (
        <>
            <section id={"hero"} className="hero">
                <div className="hero min-h-screen relative">
                    <Image
                        src="/images/home-bg.webp"
                        alt="Background"
                        fill
                        style={{ objectFit: "cover" }}
                        quality={70}
                        loading={"lazy"}
                        placeholder="blur"
                        blurDataURL="/images/home-bg-lower.webp"
                    />
                    <div className="hero-overlay bg-opacity-30 absolute inset-0"></div>
                    <div className="hero-content text-neutral-content text-center relative z-10">
                        <div className="max-w-md px-4">
                            <h1 className="mb-3 md:mb-5 text-2xl md:text-3xl font-bold text-white">{t('name')}</h1>
                            <div className="flex justify-center my-2 md:my-3">
                                <Image
                                    src="/logo.webp"
                                    alt="logo"
                                    width={60}
                                    height={60}
                                    priority
                                    className="w-16 h-16 md:w-20 md:h-20"
                                />
                            </div>
                            <h1 className="my-6 md:my-10 title text-3xl md:text-4xl font-bold">{t('companyName')}</h1>
                            <div className="my-4 md:my-6">
                                <TypedSubtitle />
                            </div>
                            <p className="w-full mb-4 md:mb-5 text-sm md:text-base text-gray-300">
                                {t('description')}
                            </p>
                            <button className="btn btn-sm md:btn-md download-button">
                                <ArrowDownIcon className="w-4 h-4 md:w-6 md:h-6" />
                                <Link
                                    href={locale === "es" ? urlPortfolioEs! : urlPortfolioEn!}
                                    target="_blank" rel="noreferrer" className="text-sm md:text-base">
                                    {t('downloadCv')}
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;