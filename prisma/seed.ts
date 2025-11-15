import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface AdminUser {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roleId: number;
}

async function main() {
    const env = process.env;

    const userAdmin: AdminUser = {
        name: env.ADMIN_NAME || "Super",
        lastname: env.ADMIN_LASTNAME || "Admin",
        username: env.ADMIN_USERNAME || "admin",
        email: env.ADMIN_EMAIL || "admin@example.com",
        password: env.ADMIN_PASSWORD || "admin123",
        roleId: env.ADMIN_ROLE_ID ? parseInt(env.ADMIN_ROLE_ID) : 1,
    };

    const passwordHash = await bcrypt.hash(userAdmin.password, 10);

    // Role admin
    const adminRole = await prisma.role.upsert({
        where: { name: "admin" },
        update: {},
        create: {
            name: "admin",
            description: "Administrator role with full access",
        },
    });

    // Contextos
    await prisma.permissionContext.createMany({
        data: [
            { name: "users", description: "User management" },
            { name: "projects", description: "Project management" },
            { name: "profiles", description: "Profile management" },
        ],
        skipDuplicates: true,
    });

    const allContexts = await prisma.permissionContext.findMany();

    // Permisos para admin
    for (const ctx of allContexts) {
        await prisma.permission.upsert({
            where: {id: 1, roleId: adminRole.id},
            update: {},
            create: {
                name: `admin_${ctx.name}`,
                roleId: adminRole.id,
                contextId: ctx.id,
                read: true,
                write: true,
                edit: true,
                delete: true,
            },
        });
    }

    // Evitar duplicar admin
    const existingAdmin = await prisma.user.findUnique({
        where: { email: userAdmin.email },
    });

    if (!existingAdmin) {
        const adminUser = await prisma.user.create({
            data: {
                name: userAdmin.name,
                lastname: userAdmin.lastname,
                username: userAdmin.username,
                email: userAdmin.email,
                password: passwordHash,
                roleId: adminRole.id,
            },
        });

        console.log("Seed completed ✅", { adminUser });
    } else {
        console.log("Admin ya existe, seed omitido ✅");
    }
}

main()
    .catch((e) => {
        console.error("Error en seed ❌", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
