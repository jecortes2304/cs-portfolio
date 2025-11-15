export interface SkillSchema {
    id: number
    userId: number
    name: string
    percent: number
    visible: boolean
}

export interface SkillCreateSchema {
    userId: number;
    name: string;
    percent: number;
    visible?: boolean;
}

export interface SkillUpdateSchema {
    name?: string;
    percent?: number;
    visible?: boolean;
    deleted?: boolean;
}

export interface SkillSchema {
    id: number;
    userId: number;
    name: string;
    percent: number;
    visible: boolean;
}