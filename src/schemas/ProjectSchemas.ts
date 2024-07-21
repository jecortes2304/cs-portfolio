import { Details, GenericResponse } from "@/schemas/GenericSchemas";

export type ProjectType = "mobile" | "web" | "desktop" | "game" | "other";
export type ProjectStatus = "finished" | "inProgress" | "pending" | "discontinued";

export interface ProjectSchema{
    id: number
    name: string
    type: ProjectType
    bannerPath: string
    logoPath: string
    imagesPath: string
    repositoryUrl: string
    publishUrl: string
    status: ProjectStatus
    techStack: string []
    description: string
}

export interface ProjectImagesSchema {
    [projectName: string]: string[];
}

export interface ProjectGetAll extends GenericResponse{
    projects: ProjectSchema []
}

export interface ProjectGetOne extends GenericResponse{
    project: ProjectSchema | null
}