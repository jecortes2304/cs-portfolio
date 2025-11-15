export interface UserCreateSchema {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    address?: string;
    roleId?: number | null;
}

export interface UserUpdateSchema {
    name?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    city?: string;
    address?: string;
    roleId?: number | null;
    deleted?: boolean;
}

export interface UserSchemaDb {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    phone?: string | null;
    city?: string | null;
    address?: string | null;
    roleId?: number | null;
}

export interface UserSchema {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    phone?: string | null;
    city?: string | null;
    address?: string | null;
    roleId?: number | null;
}

export interface UserLoginSchema {
    username: string;
    password: string;
}

// Para respuestas enriquecidas (por ejemplo en tu panel admin)
export interface UserWithRoleSchema extends UserSchema {
    role?: {
        id: number;
        name: string;
        description?: string | null;
    } | null;
}