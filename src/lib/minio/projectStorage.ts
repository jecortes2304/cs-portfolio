import {minioClient} from "./client";

const bucket = process.env.MINIO_BUCKET_PROJECTS || "";
const publicUrl = process.env.MINIO_PUBLIC_URL || "";

function toSlug(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export async function uploadProjectImageFromFile(
    file: File,
    projectName: string,
    type: "logo" | "banner" | "image"
): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        const slug = toSlug(projectName || "project");
        const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
        const ext = extMatch ? extMatch[0].toLowerCase() : ".webp";
        const size = fileBuffer.length;
        const key = type === "image"
            ? `projects/${slug}/images/${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`
            : `projects/${slug}/${type}${ext}`;
        const res = await minioClient.putObject(bucket, key, fileBuffer, size, {
            "Content-Type": file.type || "image/webp",
        });

        console.log("[MINIO] putObject response:", res);
        console.log(
            `[MINIO] Uploaded ${file.name} as ${key} to bucket ${bucket}`
        );

        return `${publicUrl}/${bucket}/${key}`;
    } catch (err) {
        console.error("[MINIO] Error en uploadProjectImageFromFile:", err);
        throw err;
    }

}
