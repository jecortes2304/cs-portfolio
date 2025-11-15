import {NextRequest, NextResponse} from "next/server";
import {SkillRepository} from "@/lib/prisma/skill.repository";
import {SkillUpdateSchema} from "@/schemas/SkillSchemas";

const skillRepository = new SkillRepository();

// GET /api/skills/:id
export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json(
                { message: "El ID de skill no es válido" },
                { status: 400 }
            );
        }

        const skill = await skillRepository.findById(id);
        if (!skill) {
            return NextResponse.json(
                { message: "Skill no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(skill, { status: 200 });
    } catch (error) {
        console.error("[GET /api/skills/:id] Error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

// PUT /api/skills/:id
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json(
                { message: "El ID de skill no es válido" },
                { status: 400 }
            );
        }

        const body = (await req.json()) as SkillUpdateSchema;
        const updated = await skillRepository.update(id, body);

        if (!updated) {
            return NextResponse.json(
                { message: "Skill no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
        console.error("[PUT /api/skills/:id] Error:", error);
        return NextResponse.json(
            { message: error.message || "Error al actualizar skill" },
            { status: 500 }
        );
    }
}

// DELETE /api/skills/:id  (soft delete)
export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json(
                { message: "El ID de skill no es válido" },
                { status: 400 }
            );
        }

        const ok = await skillRepository.deleteById(id);
        if (!ok) {
            return NextResponse.json(
                { message: "Skill no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Skill eliminada" }, { status: 200 });
    } catch (error) {
        console.error("[DELETE /api/skills/:id] Error:", error);
        return NextResponse.json(
            { message: "Error al eliminar skill" },
            { status: 500 }
        );
    }
}
