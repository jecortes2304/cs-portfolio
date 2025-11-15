// /lib/prisma/project.repository.ts

import {Project} from "@prisma/client";
import {CrudRepositoryComplete} from "@/lib/prisma/CrudRepository";
import {ProjectCreateSchema, ProjectSchema, ProjectUpdateSchema} from "@/schemas/ProjectSchemas";
import prisma from "@/lib/prisma";

export class ProjectRepository extends CrudRepositoryComplete<
    ProjectCreateSchema | ProjectUpdateSchema,
    ProjectSchema,
    number
> {
    async create(data: ProjectCreateSchema): Promise<ProjectSchema> {
        const created = await prisma.project.create({
            data: {
                userId: data.userId,
                name: data.name,
                type: data.type,
                bannerPath: data.bannerPath,
                logoPath: data.logoPath,
                imagesPath: data.imagesPath,
                repositoryUrl: data.repositoryUrl,
                publishUrl: data.publishUrl,
                status: data.status,
                techStack: data.techStack,
                descriptionEs: data.descriptionEs,
                descriptionEn: data.descriptionEn,
                visible: data.visible ?? true,
            },
        });

        return this.mapToSchema(created);
    }

    async findById(id: number): Promise<ProjectSchema | null> {
        const project = await prisma.project.findFirst({
            where: { id, deleted: false },
        });

        return project ? this.mapToSchema(project) : null;
    }

    async findAll(): Promise<ProjectSchema[]> {
        const projects = await prisma.project.findMany({
            where: { deleted: false },
            orderBy: { createdAt: "desc" },
        });

        return projects.map((p) => this.mapToSchema(p));
    }

    async update(id: number, data: ProjectUpdateSchema): Promise<ProjectSchema | null> {
        const existing = await prisma.project.findFirst({
            where: { id, deleted: false },
        });

        if (!existing) return null;

        const updated = await prisma.project.update({
            where: { id },
            data: {
                name: data.name ?? existing.name,
                type: data.type ?? existing.type,
                bannerPath:
                    data.bannerPath !== undefined ? data.bannerPath : existing.bannerPath,
                logoPath:
                    data.logoPath !== undefined ? data.logoPath : existing.logoPath,
                imagesPath:
                    data.imagesPath !== undefined
                        ? data.imagesPath
                        : existing.imagesPath,
                repositoryUrl:
                    data.repositoryUrl !== undefined
                        ? data.repositoryUrl
                        : existing.repositoryUrl,
                publishUrl:
                    data.publishUrl !== undefined
                        ? data.publishUrl
                        : existing.publishUrl,
                status: data.status ?? existing.status,
                techStack: data.techStack ?? existing.techStack,
                descriptionEs: data.descriptionEs ?? existing.descriptionEs,
                descriptionEn: data.descriptionEn ?? existing.descriptionEn,
                visible: data.visible ?? existing.visible,
                deleted: data.deleted ?? existing.deleted,
            },
        });

        return this.mapToSchema(updated);
    }

    async deleteById(id: number): Promise<boolean> {
        const existing = await prisma.project.findFirst({
            where: { id, deleted: false },
        });
        if (!existing) return false;

        await prisma.project.update({
            where: { id },
            data: { deleted: true },
        });

        return true;
    }

    async findAllPaginated(page: number, pageSize: number): Promise<ProjectSchema[]> {
        const skip = (page - 1) * pageSize;

        const projects = await prisma.project.findMany({
            where: { deleted: false },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return projects.map((p) => this.mapToSchema(p));
    }

    async findByField<K extends keyof ProjectSchema>(
        field: K,
        value: ProjectSchema[K]
    ): Promise<ProjectSchema | null> {
        const project = await prisma.project.findFirst({
            where: {
                deleted: false,
                [field]: value,
            } as any,
        });

        return project ? this.mapToSchema(project) : null;
    }

    async findAllByField<K extends keyof ProjectSchema>(
        field: K,
        value: ProjectSchema[K]
    ): Promise<ProjectSchema[]> {
        const projects = await prisma.project.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
        });

        return projects.map((p) => this.mapToSchema(p));
    }

    async deleteAllByIds(ids: number[]): Promise<number> {
        const result = await prisma.project.updateMany({
            where: { id: { in: ids }, deleted: false },
            data: { deleted: true },
        });

        return result.count;
    }

    async count(): Promise<number> {
        return prisma.project.count({
            where: { deleted: false },
        });
    }

    async exists(id: number): Promise<boolean> {
        const project = await prisma.project.findFirst({
            where: { id, deleted: false },
            select: { id: true },
        });

        return !!project;
    }

    async findByFilters(filters: Partial<ProjectSchema>): Promise<ProjectSchema[]> {
        const projects = await prisma.project.findMany({
            where: {
                deleted: false,
                ...filters,
            } as any,
            orderBy: { createdAt: "desc" },
        });

        return projects.map((p) => this.mapToSchema(p));
    }

    async findAllPaginatedByField<K extends keyof ProjectSchema>(
        field: K,
        value: ProjectSchema[K],
        page: number,
        pageSize: number
    ): Promise<ProjectSchema[]> {
        const skip = (page - 1) * pageSize;

        const projects = await prisma.project.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return projects.map((p) => this.mapToSchema(p));
    }

    private mapToSchema(project: Project): ProjectSchema {
        return {
            id: project.id,
            userId: project.userId,
            name: project.name,
            type: project.type,
            bannerPath: project.bannerPath ?? "",
            logoPath: project.logoPath ?? "",
            imagesPath: project.imagesPath ?? "",
            repositoryUrl: project.repositoryUrl ?? "",
            publishUrl: project.publishUrl ?? "",
            status: project.status,
            techStack: project.techStack,
            descriptionEs: project.descriptionEs,
            descriptionEn: project.descriptionEn,
            visible: project.visible,
        };
    }
}
