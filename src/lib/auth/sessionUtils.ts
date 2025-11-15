import {getServerSession} from "next-auth";
import {UserRepository} from "@/lib/prisma/user.repository";
import {authOptions} from "@/lib/auth/auth";

const userRepository = new UserRepository();

/**
 * Devuelve el usuario autenticado (sanitizado) o null si no es válido.
 */
export async function getAuthenticatedUser() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return null;
    }

    const rawUser: any = session.user;
    const id = Number(rawUser.id);

    if (!id || Number.isNaN(id)) {
        return null;
    }

    // Confirmamos que el usuario sigue existiendo y no está borrado
    const user = await userRepository.findById(id);
    if (!user) {
        return null;
    }

    // Aquí `user` ya es un UserWithRoleSchema (sin password).
    return user;
}

/**
 * Versión helper para usar en rutas:
 * Si no hay usuario -> devuelve { user: null, response: NextResponse unauthorized }
 */
export async function requireAuth() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return {
            user: null,
            response: new Response(
                JSON.stringify({
                    success: false,
                    message: "Unauthorized",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            ),
        };
    }

    return { user, response: null };
}
