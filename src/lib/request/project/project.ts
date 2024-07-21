import {ProjectGetAll, ProjectGetOne} from "@/schemas/ProjectSchemas";
import ProjectsData from '@/data/Projects';
import projectImages from '@/data/projectImages.json';


export async function getProjectById(id: number): Promise<ProjectGetOne> {
    const project = ProjectsData.find(project => project.id === id);
    return {
        project: project ? project : null,
        statusCode: project ? 200 : 404,
        statusMessage: project ? "Project fetched successfully" : "Project not found"
    };
}

export function getAllProjects(): ProjectGetAll {
    return {
        projects: ProjectsData,
        statusCode: 200,
        statusMessage: "Projects fetched successfully"
    };
}

type ProjectImagesType = {
    [key: string]: string[]
};

export async function getProjectImages(projectName: string): Promise<string[]> {
    return (projectImages as ProjectImagesType)[projectName.toLowerCase()] || [];
}