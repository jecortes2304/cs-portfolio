"use client"
import React, {useEffect, useState} from "react";
import {ProjectSchema} from "@/schemas/ProjectSchemas";
import {useLocale, useTranslations} from "next-intl";


const DescriptionSection: React.FC<{ project: ProjectSchema }> = ({project}: { project: ProjectSchema }) => {
    const t = useTranslations('DetailsPage.InfoProjectSection');

    const locale = useLocale()
    const [description, setDescription] = useState<string>("")
    useEffect(() => {
        setDescription(locale === 'en' ? project.descriptionEn : project.descriptionEs);
    }, [locale, project.descriptionEn, project.descriptionEs]);

    const addLinksIfExists = (description: string) => {
        const regex = /https?:\/\/[^\s,]+/g;
        const urls = description.match(regex);
        if (urls) {
            urls.forEach(url => {
                description = description.replace(url, `<a class="text-blue-500" href="${url}" target="_blank">(Linkedin)</a>` );
            });
        }
        return description;
    };

    return (
        <div className={""}>
            <h4 className="text-sm lg:text-lg font-semibold mb-2">{t('description')}:</h4>
            <p className="text-justify text-sm text-gray-400"
               dangerouslySetInnerHTML={{__html: addLinksIfExists(description)}}/>
        </div>
    );
}

export default DescriptionSection;
