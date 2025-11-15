import {NextRequest, NextResponse} from "next/server";
import {ProjectRepository} from "@/lib/prisma/project.repository";
import {uploadProjectImageFromFile} from "@/lib/minio/projectStorage";

const projectRepository = new ProjectRepository();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const visible = searchParams.get("visible");

        const filters: any = {};
        if (userId) filters.userId = Number(userId);
        if (visible !== null) filters.visible = visible === "true";

        const projects =
            Object.keys(filters).length > 0
                ? await projectRepository.findByFilters(filters)
                : await projectRepository.findAll();

        return NextResponse.json(
            {
                success: true,
                message: "Projects fetched successfully",
                projects,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error al obtener proyectos",
                projects: [],
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    // const { user, response } = await requireAuth();
    // if (!user) return response!;

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
        return NextResponse.json(
            {
                success: false,
                message: "Content-Type must be multipart/form-data",
            },
            { status: 400 }
        );
    }

    try {
        const formData = await req.formData();

        const name = String(formData.get("name") || "");
        const type = String(formData.get("type") || "");
        const status = String(formData.get("status") || "");
        const descriptionEs = String(formData.get("descriptionEs") || "");
        const descriptionEn = String(formData.get("descriptionEn") || "");
        const techStackRaw = String(formData.get("techStack") || "[]");

        const techStack = JSON.parse(techStackRaw) as string[];

        if (
            !name ||
            !type ||
            !status ||
            !descriptionEs ||
            !descriptionEn ||
            !Array.isArray(techStack)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Faltan campos requeridos: name, type, status, descriptions, techStack",
                },
                { status: 400 }
            );
        }

        const logoFile = formData.get("logo") as File | null;
        const bannerFile = formData.get("banner") as File | null;
        const imagesFiles = formData.getAll("images") as File[];

        let logoPath = "";
        let bannerPath = "";

        if (logoFile && logoFile.size > 0) {
            logoPath = await uploadProjectImageFromFile(logoFile, name, "logo");
        }

        if (bannerFile && bannerFile.size > 0) {
            bannerPath = await uploadProjectImageFromFile(
                bannerFile,
                name,
                "banner"
            );
        }

        const project = await projectRepository.create({
            userId: 1,
            name,
            type: type as any,
            status: status as any,
            descriptionEs,
            descriptionEn,
            techStack,
            bannerPath,
            logoPath,
            imagesPath: "",
            repositoryUrl: String(formData.get("repositoryUrl") || ""),
            publishUrl: String(formData.get("publishUrl") || ""),
            visible: String(formData.get("visible") || "true") === "true",
        });

        if (imagesFiles && imagesFiles.length > 0) {
            for (const file of imagesFiles) {
                if (!file || file.size === 0) continue;
                await uploadProjectImageFromFile(file, name, "image");
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: "Project created successfully",
                project,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Error al crear proyecto",
            },
            { status: 500 }
        );
    }
}