

export interface GenericResponse {
    statusCode: number
    statusMessage: string
}

export interface Details{
    totalItems: number
    page: number
    count: number
}

export type LocaleType = 'en' | 'es'

export interface GenericErrorResponse extends GenericResponse{
    errors?: string | string []
}

