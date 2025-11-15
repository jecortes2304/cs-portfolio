// src/lib/prisma/user.repository.ts

import {User} from "@prisma/client";
import bcrypt from "bcrypt";
import {UserCreateSchema, UserSchemaDb, UserUpdateSchema, UserWithRoleSchema,} from "@/schemas/UserSchema";
import prisma from "@/lib/prisma";
import {CrudRepositoryComplete} from "@/lib/prisma/CrudRepository";

export class UserRepository
    extends CrudRepositoryComplete<UserCreateSchema | UserUpdateSchema, UserWithRoleSchema, number>
{
    async create(data: UserCreateSchema): Promise<UserWithRoleSchema> {
        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                password: passwordHash,
                phone: data.phone,
                city: data.city,
                address: data.address,
                roleId: data.roleId ?? undefined,
            },
            include: {
                role: true,
            },
        });

        return this.mapToSchema(user);
    }

    async findById(id: number): Promise<UserWithRoleSchema | null> {
        const user = await prisma.user.findFirst({
            where: { id, deleted: false },
            include: { role: true },
        });
        return user ? this.mapToSchema(user) : null;
    }

    async findAll(): Promise<UserWithRoleSchema[]> {
        const users = await prisma.user.findMany({
            where: { deleted: false },
            include: { role: true },
            orderBy: { createdAt: "desc" },
        });
        return users.map((u) => this.mapToSchema(u));
    }

    async update(id: number, data: UserUpdateSchema): Promise<UserWithRoleSchema | null> {
        const existing = await prisma.user.findFirst({ where: { id, deleted: false } });
        if (!existing) return null;

        let passwordHash: string | undefined;
        if (data.password) {
            passwordHash = await bcrypt.hash(data.password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                name: data.name ?? existing.name,
                lastname: data.lastname ?? existing.lastname,
                username: data.username ?? existing.username,
                email: data.email ?? existing.email,
                phone: data.phone ?? existing.phone,
                city: data.city ?? existing.city,
                address: data.address ?? existing.address,
                roleId: data.roleId ?? existing.roleId,
                password: passwordHash ?? existing.password,
                deleted: data.deleted ?? existing.deleted,
            },
            include: { role: true },
        });

        return this.mapToSchema(user);
    }

    async deleteById(id: number): Promise<boolean> {
        const existing = await prisma.user.findFirst({ where: { id, deleted: false } });
        if (!existing) return false;

        await prisma.user.update({
            where: { id },
            data: { deleted: true },
        });

        return true;
    }

    async findAllPaginated(page: number, pageSize: number): Promise<UserWithRoleSchema[]> {
        const skip = (page - 1) * pageSize;

        const users = await prisma.user.findMany({
            where: { deleted: false },
            include: { role: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return users.map((u) => this.mapToSchema(u));
    }

    async findByField<K extends keyof UserWithRoleSchema>(
        field: K,
        value: UserWithRoleSchema[K]
    ): Promise<UserWithRoleSchema | null> {
        const user = await prisma.user.findFirst({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: { role: true },
        });

        return user ? this.mapToSchema(user) : null;
    }

    async findAllByField<K extends keyof UserWithRoleSchema>(
        field: K,
        value: UserWithRoleSchema[K]
    ): Promise<UserWithRoleSchema[]> {
        const users = await prisma.user.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: { role: true },
        });

        return users.map((u) => this.mapToSchema(u));
    }

    async deleteAllByIds(ids: number[]): Promise<number> {
        const result = await prisma.user.updateMany({
            where: { id: { in: ids }, deleted: false },
            data: { deleted: true },
        });

        return result.count;
    }

    async count(): Promise<number> {
        return prisma.user.count({
            where: { deleted: false },
        });
    }

    async exists(id: number): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: { id, deleted: false },
            select: { id: true },
        });
        return !!user;
    }

    async findByFilters(filters: Partial<User>): Promise<UserWithRoleSchema[]> {
        const users = await prisma.user.findMany({
            where: {
                ...filters,
                deleted: false,
            } as any,
            include: { role: true },
        });

        return users.map((u) => this.mapToSchema(u));
    }

    async findAllPaginatedByField<K extends keyof UserWithRoleSchema>(
        field: K,
        value: UserWithRoleSchema[K],
        page: number,
        pageSize: number
    ): Promise<UserWithRoleSchema[]> {
        const skip = (page - 1) * pageSize;

        const users = await prisma.user.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: { role: true },
            skip,
            take: pageSize,
        });

        return users.map((u) => this.mapToSchema(u));
    }

    /**
     * Validación de credenciales para NextAuth
     * Acepta email o username como `identifier`.
     */
    async validateCred(
        identifier?: string,
        password?: string
    ): Promise<{ success: boolean; user: UserSchemaDb | null }> {
        if (!identifier || !password) {
            return { success: false, user: null };
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                    deleted: false,
                    OR: [
                        { email: identifier },
                        { username: identifier },
                    ],
                },
                include: {
                    role: true,
                },
            });

            if (!user) {
                return { success: false, user: null };
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return { success: false, user: null };
            }

            const userResponse: UserSchemaDb = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
                phone: user.phone,
                city: user.city,
                address: user.address,
                roleId: user.roleId ?? undefined,
            };

            return { success: true, user: userResponse };
        } catch (_e) {
            return { success: false, user: null };
        }
    }

    // mapper centralizado: Prisma.User (+ role) -> UserWithRoleSchema
    private mapToSchema(user: User & { role?: any | null }): UserWithRoleSchema {
        return {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone ?? undefined,
            city: user.city ?? undefined,
            address: user.address ?? undefined,
            roleId: user.roleId ?? undefined,
            role: user.role
                ? {
                    id: user.role.id,
                    name: user.role.name,
                    description: user.role.description,
                }
                : null,
        };
    }
}
