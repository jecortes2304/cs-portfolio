import {NextRequest, NextResponse} from "next/server";
import {UserRepository} from "@/lib/prisma/user.repository";

const userRepository = new UserRepository();

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const {id: routeId} = await context.params;
        const id = Number(routeId);

        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json(
                { message: "El ID de usuario no es válido" },
                { status: 400 }
            );
        }

        const user = await userRepository.findById(id);

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("[GET /api/users/:id] Error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
