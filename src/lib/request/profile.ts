import {GenericResponse} from "@/schemas/GenericSchemas";
import {ProfileSchema} from "@/schemas/ProfileSchema";

export interface FetchError extends Error {
    info?: string;
    status?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

// GET /api/profile/:userId
export const fetchProfileByUserId = async (
    userId: number | string
): Promise<{ success: boolean; message: string; profile: ProfileSchema | null }> => {
    const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
        method: "GET",
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        const error: FetchError = new Error(data.message || "No se pudo obtener el perfil");
        error.info = "PROFILE_FETCH_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return data;
};

// PUT /api/profile/:userId (upsert)
export const upsertProfileByUserId = async (
    userId: number | string,
    payload: Partial<{
        profileImage: string | null;
        cvUrl: string | null;
        aboutMe: string | null;
        summary: string | null;
        socials: {
            id?: number;
            name?: string;
            url?: string;
            icon?: string;
            visible?: boolean;
            deleted?: boolean;
        }[];
    }>
): Promise<{ success: boolean; message: string; profile?: ProfileSchema }> => {
    const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data: GenericResponse & { profile?: ProfileSchema } = await res.json();

    if (!res.ok) {
        const error: FetchError = new Error(
            data.statusMessage || "No se pudo actualizar el perfil"
        );
        error.info = "PROFILE_UPDATE_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return data as any;
};
