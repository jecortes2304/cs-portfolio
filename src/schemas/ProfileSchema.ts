import {UserSchema} from "@/schemas/UserSchema";

export interface SocialNetworkSchema {
    id: number
    name: string
    url: string
    icon: string
    visible: boolean
}

export interface ProfileDataSchema {
    id: number
    profileImage: string
    cvUrl: string
    aboutMe: string
    summary: string
    socials: [SocialNetworkSchema]
}

export interface ProfileSchema {
    id: number
    user: UserSchema
    profileData: ProfileDataSchema
}

export interface SocialNetworkCreateSchema {
    name: string;
    url: string;
    icon: string;
    visible?: boolean;
}

export interface SocialNetworkUpdateSchema {
    id?: number; // si viene, se actualiza; si no, se crea nueva
    name?: string;
    url?: string;
    icon?: string;
    visible?: boolean;
    deleted?: boolean;
}

export interface ProfileCreateSchema {
    userId: number;
    profileImage?: string | null;
    cvUrl?: string | null;
    aboutMe?: string | null;
    summary?: string | null;
    socials?: SocialNetworkCreateSchema[];
}

export interface ProfileUpdateSchema {
    profileImage?: string | null;
    cvUrl?: string | null;
    aboutMe?: string | null;
    summary?: string | null;
    socials?: SocialNetworkUpdateSchema[]; // reemplazo/merge sencillo
    deleted?: boolean;
}

// Para respuestas (agregado completo)
export type ProfileResponseSchema = ProfileSchema;
