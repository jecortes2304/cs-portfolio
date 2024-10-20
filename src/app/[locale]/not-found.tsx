import React from "react";
import NotFoundComponent from "@/components/helpers/NotFoundComponent";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const t = useTranslations('NotFoundPage');
    return (
        <div id="details-error-page" className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white">
            <NotFoundComponent message={t('message')} description={t('description')}/>
        </div>
    );
}