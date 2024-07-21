"use client"
import React from 'react';
import {ReactTyped} from 'react-typed';
import {useTranslations} from "next-intl";

const TypedSubtitle = () => {
    const t = useTranslations('HomePage.HeroSection.TypedSubtitle');
    return (
        <h2 className="md:text-4xl font-semibold text-white">
            <ReactTyped
                strings={[t('title1'), t('title2'), t('title3')]}
                typeSpeed={40}
                backSpeed={50}
                loop
            />
        </h2>
    );
};

export default TypedSubtitle;