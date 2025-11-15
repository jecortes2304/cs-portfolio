import {NextRequest, NextResponse} from "next/server";
import {SkillRepository} from "@/lib/prisma/skill.repository";
import {SkillCreateSchema} from "@/schemas/SkillSchemas";


const skillRepository = new SkillRepository();

// GET /api/skills?userId=&visible=
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const visible = searchParams.get("visible");

        const filters: any = {};

        if (userId) filters.userId = Number(userId);
        if (visible !== null) filters.visible = visible === "true";

        const skills = Object.keys(filters).length
            ? await skillRepository.findByFilters(filters)
            : await skillRepository.findAll();

        return NextResponse.json(skills, { status: 200 });
    } catch (error) {
        console.error("[GET /api/skills] Error:", error);
        return NextResponse.json(
            { message: "Error al obtener skills" },
            { status: 500 }
        );
    }
}

// POST /api/skills
export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as SkillCreateSchema;

        if (!body.userId || !body.name || body.percent === undefined) {
            return NextResponse.json(
                { message: "Faltan campos requeridos (userId, name, percent)" },
                { status: 400 }
            );
        }

        const skill = await skillRepository.create(body);
        return NextResponse.json(skill, { status: 201 });
    } catch (error: any) {
        console.error("[POST /api/skills] Error:", error);
        return NextResponse.json(
            { message: error.message || "Error al crear skill" },
            { status: 500 }
        );
    }
}
