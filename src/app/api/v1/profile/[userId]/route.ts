import {UserSchema} from "@/schemas/UserSchema";
import {Profile, ProfileData, SocialNetwork, User} from "@prisma/client";
import {CrudRepositoryComplete} from "@/lib/prisma/CrudRepository";
import {
    ProfileCreateSchema,
    ProfileResponseSchema,
    ProfileSchema,
    ProfileUpdateSchema,
    SocialNetworkCreateSchema
} from "@/schemas/ProfileSchema";
import prisma from "@/lib/prisma";

export class ProfileRepository extends CrudRepositoryComplete<
    ProfileCreateSchema | ProfileUpdateSchema,
    ProfileResponseSchema,
    number
> {
    // ------------ MAPPERS ------------

    async create(data: ProfileCreateSchema): Promise<ProfileResponseSchema> {
        // Si ya existe profile para ese userId -> error o usar upsert
        const existing = await prisma.profile.findUnique({
            where: { userId: data.userId },
        });

        if (existing && !existing.deleted) {
            throw new Error("El perfil para este usuario ya existe");
        }

        const profile = await prisma.profile.create({
            data: {
                user: {
                    connect: { id: data.userId },
                },
                profileData: {
                    create: {
                        profileImage: data.profileImage ?? null,
                        cvUrl: data.cvUrl ?? null,
                        aboutMe: data.aboutMe ?? null,
                        summary: data.summary ?? null,
                        socials: {
                            create: (data.socials || []).map((s: SocialNetworkCreateSchema) => ({
                                name: s.name,
                                url: s.url,
                                icon: s.icon,
                                visible: s.visible ?? true,
                            })),
                        },
                    },
                },
            },
            include: {
                user: true,
                profileData: {
                    include: { socials: true },
                },
            },
        });

        return this.mapProfile(profile);
    }

    async findById(id: number): Promise<ProfileResponseSchema | null> {
        const profile = await prisma.profile.findFirst({
            where: { id, deleted: false },
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return profile ? this.mapProfile(profile) : null;
    }

    async findAll(): Promise<ProfileResponseSchema[]> {
        const profiles = await prisma.profile.findMany({
            where: { deleted: false },
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return profiles.map((p) => this.mapProfile(p));
    }

    // ------------ CRUD BÁSICO (por profile.id) ------------

    async update(
        id: number,
        data: ProfileUpdateSchema
    ): Promise<ProfileResponseSchema | null> {
        const existing = await prisma.profile.findFirst({
            where: { id, deleted: false },
            include: {
                profileData: { include: { socials: true } },
            },
        });

        if (!existing) return null;

        // Actualizar ProfileData
        let profileDataUpdate: any = {};
        if (data.profileImage !== undefined)
            profileDataUpdate.profileImage = data.profileImage;
        if (data.cvUrl !== undefined) profileDataUpdate.cvUrl = data.cvUrl;
        if (data.aboutMe !== undefined) profileDataUpdate.aboutMe = data.aboutMe;
        if (data.summary !== undefined) profileDataUpdate.summary = data.summary;

        // Manejo simple de socials: si vienen en payload, soft-delete existentes y crear/actualizar nuevas
        if (data.socials) {
            profileDataUpdate.socials = {
                // marcamos todas como deleted
                updateMany: {
                    where: { profileDataId: existing.profileData?.id },
                    data: { deleted: true },
                },
                // creamos nuevas (ignoramos id para simplificar flujo)
                create: data.socials
                    .filter((s) => !s.deleted)
                    .map((s) => ({
                        name: s.name ?? "",
                        url: s.url ?? "",
                        icon: s.icon ?? "",
                        visible: s.visible ?? true,
                    })),
            };
        }

        const updated = await prisma.profile.update({
            where: { id },
            data: {
                deleted: data.deleted ?? existing.deleted,
                profileData:
                    Object.keys(profileDataUpdate).length > 0
                        ? existing.profileData
                            ? {
                                update: profileDataUpdate,
                            }
                            : {
                                create: profileDataUpdate,
                            }
                        : undefined,
            },
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return this.mapProfile(updated);
    }

    async deleteById(id: number): Promise<boolean> {
        const existing = await prisma.profile.findFirst({
            where: { id, deleted: false },
        });

        if (!existing) return false;

        await prisma.profile.update({
            where: { id },
            data: { deleted: true },
        });

        return true;
    }

    async findAllPaginated(
        page: number,
        pageSize: number
    ): Promise<ProfileResponseSchema[]> {
        const skip = (page - 1) * pageSize;

        const profiles = await prisma.profile.findMany({
            where: { deleted: false },
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return profiles.map((p) => this.mapProfile(p));
    }

    async findByField<K extends keyof ProfileResponseSchema>(
        field: K,
        value: ProfileResponseSchema[K]
    ): Promise<ProfileResponseSchema | null> {
        const profile = await prisma.profile.findFirst({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return profile ? this.mapProfile(profile) : null;
    }

    async findAllByField<K extends keyof ProfileResponseSchema>(
        field: K,
        value: ProfileResponseSchema[K]
    ): Promise<ProfileResponseSchema[]> {
        const profiles = await prisma.profile.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return profiles.map((p) => this.mapProfile(p));
    }

    // ------------ EXTRA DEL CRUD COMPLETO ------------

    async deleteAllByIds(ids: number[]): Promise<number> {
        const result = await prisma.profile.updateMany({
            where: { id: { in: ids }, deleted: false },
            data: { deleted: true },
        });

        return result.count;
    }

    async count(): Promise<number> {
        return prisma.profile.count({
            where: { deleted: false },
        });
    }

    async exists(id: number): Promise<boolean> {
        const profile = await prisma.profile.findFirst({
            where: { id, deleted: false },
            select: { id: true },
        });

        return !!profile;
    }

    async findByFilters(
        filters: Partial<ProfileResponseSchema>
    ): Promise<ProfileResponseSchema[]> {
        const profiles = await prisma.profile.findMany({
            where: {
                deleted: false,
                ...filters,
            } as any,
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return profiles.map((p) => this.mapProfile(p));
    }

    async findAllPaginatedByField<K extends keyof ProfileResponseSchema>(
        field: K,
        value: ProfileResponseSchema[K],
        page: number,
        pageSize: number
    ): Promise<ProfileResponseSchema[]> {
        const skip = (page - 1) * pageSize;

        const profiles = await prisma.profile.findMany({
            where: {
                deleted: false,
                [field]: value,
            } as any,
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        return profiles.map((p) => this.mapProfile(p));
    }

    async findByUserId(userId: number): Promise<ProfileResponseSchema | null> {
        const profile = await prisma.profile.findFirst({
            where: { userId, deleted: false },
            include: {
                user: true,
                profileData: { include: { socials: true } },
            },
        });

        return profile ? this.mapProfile(profile) : null;
    }

    async upsertByUserId(
        userId: number,
        data: ProfileUpdateSchema | ProfileCreateSchema
    ): Promise<ProfileResponseSchema> {
        const existing = await prisma.profile.findFirst({
            where: { userId, deleted: false },
            include: { profileData: { include: { socials: true } } },
        });

        if (!existing) {
            // crear nuevo perfil
            return this.create({
                userId,
                profileImage: "profileImage" in data ? data.profileImage : null,
                cvUrl: "cvUrl" in data ? data.cvUrl : null,
                aboutMe: "aboutMe" in data ? data.aboutMe : null,
                summary: "summary" in data ? data.summary : null,
                socials: "socials" in data ? (data.socials as any) : [],
            });
        }

        // actualizar existente por id
        return (await this.update(existing.id, data)) as ProfileResponseSchema;
    }

    private mapUser(user: User): UserSchema {
        return {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone ?? "",
            city: user.city ?? "",
            address: user.address ?? "",
        };
    }

    // ------------ HELPERS ÚTILES ------------

    private mapSocial(s: SocialNetwork): any {
        return {
            id: s.id,
            name: s.name,
            url: s.url,
            icon: s.icon,
            visible: s.visible,
        };
    }

    private mapProfile(
        profile: Profile & {
            user: User;
            profileData?: (ProfileData & { socials: SocialNetwork[] }) | null;
        }
    ): ProfileResponseSchema {
        return <ProfileSchema>{
            id: profile.id,
            user: this.mapUser(profile.user),
            profileData: profile.profileData
                ? {
                    id: profile.profileData.id,
                    profileImage: profile.profileData.profileImage ?? null,
                    cvUrl: profile.profileData.cvUrl ?? null,
                    aboutMe: profile.profileData.aboutMe ?? null,
                    summary: profile.profileData.summary ?? null,
                    socials: (profile.profileData.socials || [])
                        .filter((s) => !s.deleted)
                        .map((s) => this.mapSocial(s)),
                }
                : null,
        };
    }
}
