import nodemailer from "nodemailer"
import {getEnvsEmail} from "@/config/Settings";

type EmailPayload = {
    to: string
    subject: string
    html: string
}

const {
    smptPassword,
    smptHost,
    smtpPort,
    smtpUser,
    smtpFromEmail
} = getEnvsEmail();


const smtpOptions = {
    host: smptHost,
    port: parseInt(smtpPort || ""),
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
    auth: {
        user: smtpUser || "",
        pass: smptPassword || "",
    },
}

export const sendEmail = async (data: EmailPayload) => {
    const transporter = nodemailer.createTransport({
        ...smtpOptions,
    })

    return await transporter.sendMail({
        from: smtpFromEmail,
        ...data,
    })
}