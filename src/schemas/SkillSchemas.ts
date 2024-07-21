import {GenericResponse} from "@/schemas/GenericSchemas";

export interface SkillSchema {
    id: number
    name: string
    percent: number
}

export interface SkillGetAll extends GenericResponse {
    skills: SkillSchema []
}

export interface SkillGetOne extends GenericResponse {
    skill: SkillSchema | null
}