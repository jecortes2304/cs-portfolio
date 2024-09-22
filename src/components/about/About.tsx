import React from "react";
import Image from 'next/image';
import skillsData from "@/data/Skills";
import SkillContainer from "@/components/about/SkillContainer";
import {SkillSchema} from "@/schemas/SkillSchemas";
import {getTranslations} from "next-intl/server";

function getSkillsList() {
    return skillsData as SkillSchema[];
}

const About: React.FC = async () => {
    const t = await getTranslations('HomePage.AboutSection');

    const getSkillsListOrdered = () => {
        return getSkillsList().sort((a, b) => b.percent - a.percent);
    }

    return (
        <div id="about" className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-5">
                    <div className="avatar">
                        <div className="w-40 rounded-full">
                            <Image
                                src="/images/portfolio-foto.webp"
                                alt="Profile"
                                loading={"lazy"}
                                quality={100}
                                width={600}
                                height={600}
                            />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('title')}</h2>
                    <h4 className="text-xl text-blue-400 mb-6">{t('subtitle')}</h4>
                </div>

                <div className="text-gray-300 mb-12 max-w-5xl mx-auto text-center">
                    <p>{t('description')}</p>
                </div>

                <div className="flex flex-wrap -mx-2">
                    {getSkillsListOrdered().map((skill, index) => (
                        <SkillContainer key={index} name={skill.name} percent={skill.percent} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;