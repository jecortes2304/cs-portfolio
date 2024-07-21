import {GenericErrorResponse, GenericResponse} from "@/schemas/GenericSchemas";
import {ConstantsResponsesGenerics} from "@/utils/constants";
import {NextResponse} from "next/server";
import {render} from "@react-email/render";
import {sendEmail} from "@/lib/email/email";
import ContactEmailTemplate from "@/lib/email/templates/ContactEmailTemplate";
import {FormDataEmail} from "@/schemas/EmailSchemas";

export async function POST(request: Request) {
    try {
        const body: FormDataEmail = await request.json();

        const response = await sendEmail({
            to: body.email,
            subject: "Hellooo!",
            html: render(ContactEmailTemplate(
                {
                    name: body.name,
                    subject: body.subject,
                    email: body.email,
                    message: body.message
                }
            ))
        });

        if (response && response.rejected.length === 0) {
            const genericResponse: GenericResponse = {
                statusCode: ConstantsResponsesGenerics.OK.code,
                statusMessage: ConstantsResponsesGenerics.OK.message,
            };
            return NextResponse.json(genericResponse, {status: genericResponse.statusCode}
            );
        } else {
            const errorResponse: GenericErrorResponse = {
                statusCode: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code,
                statusMessage: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.message,
                errors: `Email service not configured correctly: ${response.rejected}`
            };
            return NextResponse.json(errorResponse, {
                status: errorResponse.statusCode
            });
        }
    } catch (error: any) {
        const errorResponse: GenericErrorResponse = {
            statusCode: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code,
            statusMessage: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.message,
            errors: error.toString()
        };
        return NextResponse.json((errorResponse), {
            status: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code
        });
    }
}
