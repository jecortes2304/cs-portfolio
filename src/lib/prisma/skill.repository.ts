import {SkillCreateSchema, SkillSchema, SkillUpdateSchema} from "@/schemas/SkillSchemas";
import {Skill} from "@prisma/client";
import prisma from "@/lib/prisma";
import {CrudRepositoryComplete} from "@/lib/prisma/CrudRepository";

export class SkillRepository extends CrudRepositoryComplete<
    SkillCreateSchema | SkillUpdateSchema,
    SkillSchema,
    number
> {
    async create(data: SkillCreateSchema): Promise<SkillSchema> {
        // Validación básica
        if (data.percent < 0 || data.percent > 100) {
            throw new Error("Percent must be between 0 and 100");
        }

        const created = await prisma.skill.create({
            data: {
                userId: data.userId,
                name: data.name,
                percent: data.percent,
                visible: data.visible ?? true,
            },
        });

        return this.mapToSchema(created);
    }

    async findById(id: number): Promise<SkillSchema | null> {
        const skill = await prisma.skill.findFirst({
            where: { id, deleted: false },
        });

        return skill ? this.mapToSchema(skill) : null;
    }

    async findAll(): Promise<SkillSchema[]> {
        const skills = await prisma.skill.findMany({
            where: { deleted: false },
            orderBy: { createdAt: "desc" },
        });

        return skills.map((s) => this.mapToSchema(s));
    }

    async update(id: number, data: SkillUpdateSchema): Promise<SkillSchema | null> {
        const existing = await prisma.skill.findFirst({
            where: { id, deleted: false },
        });

        if (!existing) return null;

        if (data.percent !== undefined && (data.percent < 0 || data.percent > 100)) {
            throw new Error("Percent must be between 0 and 100");
        }

        const updated = await prisma.skill.update({
            where: { id },
            data: {
                name: data.name ?? existing.name,
                percent: data.percent ?? existing.percent,
                visible: data.visible ?? existing.visible,
                deleted: data.deleted ?? existing.deleted,
            },
        });

        return this.mapToSchema(updated);
    }

    async deleteById(id: number): Promise<boolean> {
        const existing = await prisma.skill.findFirst({
            where: { id, deleted: false },
        });

        if (!existing) return false;

        await prisma.skill.update({
            where: { id },
            data: { deleted: true },
        });

        return true;
    }

    async findAllPaginated(page: number, pageSize: number): Promise<SkillSchema[]> {
        const skip = (page - 1) * pageSize;

        const skills = await prisma.skill.findMany({
            where: { deleted: false },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return skills.map((s) => this.mapToSchema(s));
    }

    async findByField<K extends keyof SkillSchema>(
        field: K,
        value: SkillSchema[K]
    ): Promise<SkillSchema | null> {
        const skill = await prisma.skill.findFirst({
            where: {
                deleted: false,
                [field]: value,
            } as any,
        });

        return skill ? this.mapToSchema(skill) : null;
    }

    async findAllByField<K extends keyof SkillSchema>(
        field: K,
        value: SkillSchema[K]
    ): Promise<SkillSchema[]> {
        const skills = await prisma.skill.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
        });

        return skills.map((s) => this.mapToSchema(s));
    }

    async deleteAllByIds(ids: number[]): Promise<number> {
        const result = await prisma.skill.updateMany({
            where: { id: { in: ids }, deleted: false },
            data: { deleted: true },
        });

        return result.count;
    }

    async count(): Promise<number> {
        return prisma.skill.count({
            where: { deleted: false },
        });
    }

    async exists(id: number): Promise<boolean> {
        const skill = await prisma.skill.findFirst({
            where: { id, deleted: false },
            select: { id: true },
        });

        return !!skill;
    }

    async findByFilters(filters: Partial<SkillSchema>): Promise<SkillSchema[]> {
        const skills = await prisma.skill.findMany({
            where: {
                deleted: false,
                ...filters,
            } as any,
        });

        return skills.map((s) => this.mapToSchema(s));
    }

    async findAllPaginatedByField<K extends keyof SkillSchema>(
        field: K,
        value: SkillSchema[K],
        page: number,
        pageSize: number
    ): Promise<SkillSchema[]> {
        const skip = (page - 1) * pageSize;

        const skills = await prisma.skill.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return skills.map((s) => this.mapToSchema(s));
    }

    // Mapper centralizado
    private mapToSchema(skill: Skill): SkillSchema {
        return {
            id: skill.id,
            userId: skill.userId,
            name: skill.name,
            percent: skill.percent,
            visible: skill.visible,
        };
    }
}
