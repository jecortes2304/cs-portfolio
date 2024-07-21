"use client"
import {useRouter} from 'next/navigation';
import React, {useCallback, useTransition} from 'react';
import {useLocale} from "next-intl";

const LanguageToggle = () => {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const changeLanguage = useCallback((locale: string) => {
        startTransition(() => {
            router.replace(`/${locale}`)
        });
    }, [router]);

    return (
        <div className={"flex justify-center"}>
            <button className={"btn btn-xs text-white text-xs btn-ghost"}
                    disabled={isPending || locale === 'en'}
                    onClick={() => changeLanguage('en')}>En
            </button>
            <div className="divider divider-horizontal"></div>
            <button className={"btn btn-xs text-white text-xs btn-ghost"}
                    disabled={isPending || locale === 'es'}
                    onClick={() => changeLanguage('es')}>Es
            </button>
        </div>
    );
};

export default LanguageToggle;