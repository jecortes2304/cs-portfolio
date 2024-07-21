import React from "react";
import {getTranslations} from "next-intl/server";

interface WorkProps {
    titleKey: string;
    descriptionKey: string;
    icon: React.ReactNode;
}

const Work: React.FC<WorkProps> = async ({ titleKey, descriptionKey, icon }: WorkProps) => {
    const t = await getTranslations('HomePage.SummarizeSection');

    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
                <div className="bg-transparent border-2 border-icon p-3 rounded-full">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t(titleKey)}</h3>
                <p className="text-gray-400 text-sm">{t(descriptionKey)}</p>
            </div>
        </div>
    );
}

export default Work;