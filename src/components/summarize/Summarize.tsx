import React from 'react';
import Work from "@/components/summarize/Work";
import {ComputerDesktopIcon, DevicePhoneMobileIcon, GlobeAltIcon, PuzzlePieceIcon} from "@heroicons/react/24/solid";
import { getTranslations } from "next-intl/server";

const Summarize: React.FC = async () => {
    const t = await getTranslations('HomePage.SummarizeSection');

    const works = [
        {
            key: 'desktop',
            icon: <ComputerDesktopIcon className="h-8 w-8" />
        },
        {
            key: 'mobile',
            icon: <DevicePhoneMobileIcon className="h-8 w-8" />
        },
        {
            key: 'web',
            icon: <GlobeAltIcon className="h-8 w-8" />
        },
        {
            key: 'games',
            icon: <PuzzlePieceIcon className="h-8 w-8" />
        }
    ];

    return (
        <div id="summarize" className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">{t('title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {works.map((work) => (
                        <Work
                            key={work.key}
                            titleKey={`works.${work.key}.title`}
                            descriptionKey={`works.${work.key}.description`}
                            icon={work.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Summarize;