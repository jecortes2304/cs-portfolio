import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";

type Props = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

export default function ContactEmailTemplate({ name, email, subject, message }: Props) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Heading style={heading}>Nuevo mensaje de contacto</Heading>
                    <Hr style={hr} />
                    <Text style={subheading}>Has recibido un nuevo mensaje de tu formulario de contacto:</Text>

                    <Section style={infoSection}>
                        <Text style={label}>Nombre:</Text>
                        <Text style={content}>{name}</Text>

                        <Text style={label}>Email:</Text>
                        <Text style={content}>{email}</Text>

                        <Text style={label}>Asunto:</Text>
                        <Text style={content}>{subject}</Text>
                    </Section>

                    <Text style={label}>Mensaje:</Text>
                    <Text style={messageStyle}>{message}</Text>

                    <Hr style={hr} />
                    <Text style={footer}>Este correo fue enviado desde tu formulario de contacto del portafolio.</Text>
                </Container>
            </Section>
        </Html>
    );
}

// Estilos para la plantilla de correo
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center" as const,
    color: "#333",
};

const subheading = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#484848",
    textAlign: "center" as const,
    marginBottom: "30px",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const infoSection = {
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    padding: "20px",
    marginBottom: "20px",
};

const label = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
};

const content = {
    fontSize: "16px",
    color: "#333",
    marginBottom: "15px",
};

const messageStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#333",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    padding: "15px",
    marginTop: "5px",
};

const footer = {
    fontSize: "12px",
    color: "#999",
    textAlign: "center" as const,
    marginTop: "20px",
};