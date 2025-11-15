import {ProjectGetAll, ProjectGetOne, ProjectSchema} from "@/schemas/ProjectSchemas";
import ProjectsData from '@/data/Projects';
import projectImages from '@/data/projectImages.json';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";
const CONTEXT_PATH_URL = `${BASE_URL}/api/v1/projects`;

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



export interface FetchError extends Error {
    info?: string;
    status?: string;
}



async function parseJsonSafe(res: Response) {
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Respuesta no JSON desde ${res.url}: ${text.slice(0, 200)}`);
    }
    return res.json();
}

export async function fetchProjectsAdmin(): Promise<ProjectSchema[]> {

    const res = await fetch(`${CONTEXT_PATH_URL}`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
    });
    const data = await parseJsonSafe(res);

    const results = data.projects;

    if (!res.ok || !data.success) throw new Error(data.message || "Error fetching projects");
    return results as ProjectSchema[];
}

export async function createProjectAdmin(form: FormData): Promise<ProjectSchema> {
    const res = await fetch(`${CONTEXT_PATH_URL}`, {
        method: "POST",
        body: form,
        credentials: "include",
    });
    const data = await parseJsonSafe(res);
    if (!res.ok || !data.success) throw new Error(data.message || "Error creating project");
    return data.project as ProjectSchema;
}

export async function updateProjectAdmin(id: number | string, form: FormData): Promise<ProjectSchema> {
    const res = await fetch(`${CONTEXT_PATH_URL}/${id}`, {
        method: "PUT",
        body: form,
        credentials: "include",
    });
    const data = await parseJsonSafe(res);
    if (!res.ok || !data.success) throw new Error(data.message || "Error updating project");
    return data.project as ProjectSchema;
}

export async function deleteProjectAdmin(id: number | string): Promise<boolean> {
    const res = await fetch(`${CONTEXT_PATH_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    const data = await parseJsonSafe(res);
    if (!res.ok || !data.success) throw new Error(data.message || "Error deleting project");
    return true;
}
