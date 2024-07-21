import {GenericResponse} from "@/schemas/GenericSchemas";
import {FormDataEmail} from "@/schemas/EmailSchemas";


export async function sendEmail(formData: FormDataEmail): Promise<GenericResponse> {
    const emailResponse = await fetch(`/api/v1/email/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const emailResponseData = await emailResponse.json();


    return {
        statusCode: 200,
        statusMessage:"Project fetched successfully"
    };
}