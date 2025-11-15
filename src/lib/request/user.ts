import type {UserWithRoleSchema} from "@/schemas/UserSchema";

export interface FetchError extends Error {
    info?: string;
    status?: string;
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

/**
 * Obtiene un usuario por id desde /api/users/[id]
 */
export const fetchUserById = async (
    id: number | string
): Promise<UserWithRoleSchema> => {
    const url = `${baseUrl}/api/users/${id}`;

    const res = await fetch(url, {
        method: "GET",
        // Opcional: evita cache si son datos sensibles / dinámicos
        cache: "no-store",
    });

    if (res.status === 400) {
        const error: FetchError = new Error("El ID de usuario no es válido");
        error.info = "INVALID_USER_ID";
        error.status = res.status.toString();
        throw error;
    }

    if (res.status === 404) {
        const error: FetchError = new Error("Usuario no encontrado");
        error.info = "USER_NOT_FOUND";
        error.status = res.status.toString();
        throw error;
    }

    if (!res.ok) {
        const error: FetchError = new Error("No se pudo obtener el usuario");
        error.info = "USER_FETCH_ERROR";
        error.status = res.status.toString();
        throw error;
    }

    return await res.json();
};
