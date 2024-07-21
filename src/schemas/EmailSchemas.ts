export interface FormDataEmail {
    name: string
    subject: string
    email: string
    message: string
}

export interface FormDataEmailErrors {
    name?: string
    subject?: string
    email?: string
    message?: string
}