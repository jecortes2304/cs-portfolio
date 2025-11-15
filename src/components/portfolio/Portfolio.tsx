import React from "react";
import {getAllProjects} from "@/lib/request/project";
import ProjectContainer from "@/components/portfolio/ProjectContainer";
import {getTranslations} from 'next-intl/server';

const Portfolio: React.FC = async () => {
    const projects = getAllProjects().projects;
    const t = await getTranslations('HomePage.PortfolioSection');

    return (
        <section id="portfolio" className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">{t('title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project) => (
                        project.visible && <ProjectContainer key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;