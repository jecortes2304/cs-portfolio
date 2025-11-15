import {NextRequest, NextResponse} from "next/server";
import {ProjectRepository} from "@/lib/prisma/project.repository";
import {uploadProjectImageFromFile} from "@/lib/minio/projectStorage";

const projectRepository = new ProjectRepository();

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json({ success: false, message: "El ID de proyecto no es válido", project: null }, { status: 400 });
        }
        const project = await projectRepository.findById(id);
        if (!project) {
            return NextResponse.json({ success: false, message: "Proyecto no encontrado", project: null }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project fetched successfully", project }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, message: "Error interno del servidor", project: null }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    // const { user, response } = await requireAuth();
    // if (!user) return response!;
    try {
        const { id } = await context.params;
        const idNumber = Number(id);
        if (!idNumber || Number.isNaN(idNumber) || idNumber <= 0) {
            return NextResponse.json({ success: false, message: "El ID de proyecto no es válido" }, { status: 400 });
        }

        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            const fields: Record<string, any> = {};
            const keys = [
                "name",
                "type",
                "status",
                "descriptionEs",
                "descriptionEn",
                "repositoryUrl",
                "publishUrl",
                "visible",
                "techStack"
            ];
            for (const k of keys) {
                const v = formData.get(k);
                if (v !== null) fields[k] = String(v);
            }
            if (fields.visible !== undefined) fields.visible = String(fields.visible) === "true";
            if (fields.techStack !== undefined) {
                try {
                    fields.techStack = JSON.parse(fields.techStack);
                } catch {
                    fields.techStack = [];
                }
            }

            const logo = formData.get("logo") as File | null;
            const banner = formData.get("banner") as File | null;
            const images = formData.getAll("images") as File[];

            if (logo && logo.size > 0) {
                fields.logoPath = await uploadProjectImageFromFile(logo, fields.name || "", "logo");
            }
            if (banner && banner.size > 0) {
                fields.bannerPath = await uploadProjectImageFromFile(banner, fields.name || "", "banner");
            }
            if (images && images.length > 0) {
                for (const file of images) {
                    if (!file || file.size === 0) continue;
                    await uploadProjectImageFromFile(file, fields.name || "", "image");
                }
            }

            const updated = await projectRepository.update(idNumber, fields);
            if (!updated) {
                return NextResponse.json({ success: false, message: "Proyecto no encontrado" }, { status: 404 });
            }
            return NextResponse.json({ success: true, message: "Project updated successfully", project: updated }, { status: 200 });
        } else {
            const body = await req.json();
            const updated = await projectRepository.update(idNumber, body);
            if (!updated) {
                return NextResponse.json({ success: false, message: "Proyecto no encontrado" }, { status: 404 });
            }
            return NextResponse.json({ success: true, message: "Project updated successfully", project: updated }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Error al actualizar proyecto" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        if (!id || Number.isNaN(id) || id <= 0) {
            return NextResponse.json({ success: false, message: "El ID de proyecto no es válido" }, { status: 400 });
        }
        const ok = await projectRepository.deleteById(id);
        if (!ok) {
            return NextResponse.json({ success: false, message: "Proyecto no encontrado" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, message: "Error al eliminar proyecto" }, { status: 500 });
    }
}
