import {getProjectById} from "@/lib/request/project";
import {ProjectSchema} from "@/schemas/ProjectSchemas";
import GalleryClient from '@/components/details/GalleryClient';
import React from "react";
import InfoProjectSection from "@/components/details/InfoProjectSection";
import FirstLineSection from "@/components/details/FirstLineSection";

export default async function Details({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectResponse = await getProjectById(parseInt(id));

    if (projectResponse.statusCode !== 200 || !projectResponse.project) {
        return <div>Proyecto no encontrado</div>;
    }
    const project: ProjectSchema = projectResponse.project;

    return (
        <div id={"detailsPage"} className="bg-gray-900 text-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <FirstLineSection projectName={project.name}/>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <GalleryClient
                            projectName={project.name}
                            bannerPath={project.bannerPath}
                            projectType={project.type}
                        />
                    </div>
                    <InfoProjectSection project={project}/>
                </div>
            </div>
        </div>
    );
}