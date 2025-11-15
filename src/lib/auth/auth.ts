import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {UserRepository} from "@/lib/prisma/user.repository";

const userRepository = new UserRepository();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "domain-login",
            credentials: {
                username: {
                    label: "Email or Username",
                    type: "text",
                    placeholder: "email or username",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials): Promise<any> {
                try {
                    const identifier = credentials?.username;
                    const password = credentials?.password;

                    const { success, user } = await userRepository.validateCred(
                        identifier,
                        password
                    );

                    if (!success || !user) {
                        return null;
                    }

                    // Nunca devolvemos el password a NextAuth
                    const { password: _pw, ...safeUser } = user;

                    // Esto es lo que se inyecta como `user` en el callback jwt
                    return safeUser;
                } catch (e: any) {
                    // Lanzar error hace que NextAuth lo trate como fallo de login
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Primer login: `user` viene de `authorize`
            if (user) {
                token.id = (user as any).id;
                token.email = (user as any).email;
                token.name = `${(user as any).name} ${(user as any).lastname ?? ""}`.trim();
                token.roleId = (user as any).roleId ?? null;
            }

            // En siguientes requests, devolvemos el token tal cual.
            return token;
        },
        async session({ session, token }) {
            // Lo que expones al frontend
            if (session.user) {
                (session.user as any).id = token.id;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                (session.user as any).roleId = token.roleId;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
    pages: {
        // signIn: "/login", // descomenta si tienes página custom
    },
};
