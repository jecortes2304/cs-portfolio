import {GenericResponse} from "@/schemas/GenericSchemas";

export type ProjectType = "mobile" | "web" | "desktop" | "game" | "cli" | "other";
export type ProjectStatus = "finished" | "inProgress" | "pending" | "discontinued";

export interface ProjectSchema {
    id: number
    userId: number
    name: string
    type: ProjectType
    bannerPath: string
    logoPath: string
    imagesPath: string
    repositoryUrl: string
    publishUrl: string
    status: ProjectStatus
    techStack: string []
    descriptionEs: string
    descriptionEn: string
    visible: boolean
}

export interface ProjectGetAll extends GenericResponse{
    projects: ProjectSchema []
}

export interface ProjectGetOne extends GenericResponse{
    project: ProjectSchema | null
}

export interface ProjectCreateSchema {
    userId: number;
    name: string;
    type: ProjectType;
    bannerPath?: string;
    logoPath?: string;
    imagesPath?: string;
    repositoryUrl?: string;
    publishUrl?: string;
    status: ProjectStatus;
    techStack: string[];
    descriptionEs: string;
    descriptionEn: string;
    visible?: boolean;
}

export interface ProjectUpdateSchema {
    name?: string;
    type?: ProjectType;
    bannerPath?: string | null;
    logoPath?: string | null;
    imagesPath?: string | null;
    repositoryUrl?: string | null;
    publishUrl?: string | null;
    status?: ProjectStatus;
    techStack?: string[];
    descriptionEs?: string;
    descriptionEn?: string;
    visible?: boolean;
    deleted?: boolean;
}

export interface ProjectGetAll extends GenericResponse {
    projects: ProjectSchema[];
}

export interface ProjectGetOne extends GenericResponse {
    project: ProjectSchema | null;
}
