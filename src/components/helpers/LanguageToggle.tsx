"use client"
import React, {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';

type LocaleType = 'es'|'en';

const LanguageToggle = () => {
    const localeFromPath = usePathname().split('/')[1] as LocaleType;
    const [locale, setLocale] = useState<LocaleType>(localeFromPath || 'en');
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (locale: LocaleType) => {
        // Redirect to the new locale while preserving the current path
        setLocale(locale)
        router.push(`/${locale}${pathname.replace(/^\/(en|es)/, '')}`);
    };


    return (
        <div className={"flex justify-center"}>
            <button className={"btn btn-xs text-white text-xs btn-ghost"}
                    disabled={locale === 'en'}
                    onClick={() => changeLanguage('en')}>En
            </button>
            <div className="divider divider-horizontal"></div>
            <button className={"btn btn-xs text-white text-xs btn-ghost"}
                    disabled={locale === 'es'}
                    onClick={() => changeLanguage('es')}>Es
            </button>
        </div>
    );
};

export default LanguageToggle;