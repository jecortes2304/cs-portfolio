import {SkillCreateSchema, SkillSchema, SkillUpdateSchema} from "@/schemas/SkillSchemas";

export interface FetchError extends Error {
    info?: string;
    status?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

/**
 * GET /api/skills?userId=&visible=
 */
export const fetchSkills = async (params?: {
    userId?: number;
    visible?: boolean;
}): Promise<SkillSchema[]> => {
    const query = new URLSearchParams();

    if (params?.userId !== undefined) query.append("userId", String(params.userId));
    if (params?.visible !== undefined) query.append("visible", String(params.visible));

    const url =
        baseUrl + "/api/skills" + (query.toString() ? `?${query.toString()}` : "");

    const res = await fetch(url, { method: "GET", cache: "no-store" });

    if (!res.ok) {
        const error: FetchError = new Error("No se pudieron obtener las skills");
        error.info = "SKILL_FETCH_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return res.json();
};

/**
 * GET /api/skills/:id
 */
export const fetchSkillById = async (id: number | string): Promise<SkillSchema> => {
    const url = `${baseUrl}/api/skills/${id}`;
    const res = await fetch(url, { method: "GET", cache: "no-store" });

    if (res.status === 404) {
        const error: FetchError = new Error("Skill no encontrada");
        error.info = "SKILL_NOT_FOUND";
        error.status = res.status.toString();
        throw error;
    }

    if (!res.ok) {
        const error: FetchError = new Error("No se pudo obtener la skill");
        error.info = "SKILL_FETCH_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return res.json();
};

/**
 * POST /api/skills
 */
export const createSkill = async (
    payload: SkillCreateSchema
): Promise<SkillSchema> => {
    const res = await fetch(`${baseUrl}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error: FetchError = new Error("No se pudo crear la skill");
        error.info = "SKILL_CREATE_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return res.json();
};

/**
 * PUT /api/skills/:id
 */
export const updateSkill = async (
    id: number | string,
    payload: SkillUpdateSchema
): Promise<SkillSchema> => {
    const res = await fetch(`${baseUrl}/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.status === 404) {
        const error: FetchError = new Error("Skill no encontrada");
        error.info = "SKILL_NOT_FOUND";
        error.status = res.status.toString();
        throw error;
    }

    if (!res.ok) {
        const error: FetchError = new Error("No se pudo actualizar la skill");
        error.info = "SKILL_UPDATE_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return res.json();
};

/**
 * DELETE /api/skills/:id
 */
export const deleteSkill = async (id: number | string): Promise<void> => {
    const res = await fetch(`${baseUrl}/api/skills/${id}`, {
        method: "DELETE",
    });

    if (res.status === 404) {
        const error: FetchError = new Error("Skill no encontrada");
        error.info = "SKILL_NOT_FOUND";
        error.status = res.status.toString();
        throw error;
    }

    if (!res.ok) {
        const error: FetchError = new Error("No se pudo eliminar la skill");
        error.info = "SKILL_DELETE_ERROR";
        error.status = res.status.toString();
        throw error;
    }
};
