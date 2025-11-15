import {Html} from "@react-email/html";
import {Text} from "@react-email/text";
import {Section} from "@react-email/section";
import {Container} from "@react-email/container";
import {Heading} from "@react-email/heading";
import {Hr} from "@react-email/hr";

type Props = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactEmailTemplate({ name, email, subject, message }: Props) {
    return (
        <Html>
            <Section style={outer}>
                <Container style={card}>
                    {/* Header */}
                    <div style={header}>
                        <Heading style={headerTitle}>Nuevo mensaje de contacto</Heading>
                        <Text style={headerSubtitle}>Has recibido un mensaje desde tu portafolio</Text>
                    </div>

                    {/* Intro */}
                    <div style={introBox}>
                        <Text style={introText}>
                            A continuación encontrarás los detalles del mensaje recibido a través del formulario de contacto.
                        </Text>
                    </div>

                    <Hr style={divider} />

                    {/* Info grid */}
                    <div style={infoGrid}>
                        <div style={infoItem}>
                            <span style={infoLabel}>Nombre</span>
                            <span style={infoValue}>{name}</span>
                        </div>

                        <div style={infoItem}>
                            <span style={infoLabel}>Email</span>
                            <a style={infoLink} href={`mailto:${email}`}>
                                {email}
                            </a>
                        </div>

                        <div style={infoItemFull}>
                            <span style={infoLabel}>Asunto</span>
                            <span style={infoValue}>{subject}</span>
                        </div>
                    </div>

                    {/* Message */}
                    <div style={messageWrap}>
                        <span style={infoLabel}>Mensaje</span>
                        <div style={messageBox}>
                            <Text style={messageText}>{message}</Text>
                        </div>
                    </div>

                    <Hr style={divider} />

                    {/* Footer */}
                    <Text style={footNote}>
                        Este correo fue enviado desde tu formulario de contacto del portafolio.
                    </Text>
                </Container>
            </Section>
        </Html>
    );
}

/* ===== Styles (blue, clean, professional) ===== */

const colors = {
    bg: "#f5f7fb",
    cardBg: "#ffffff",
    border: "#e7ecf5",
    text: "#111827",
    subtext: "#6b7280",
    primary: "#2563eb",
    primaryDark: "#1e40af",
    primarySoft: "#eff6ff",
};

const outer: React.CSSProperties = {
    backgroundColor: colors.bg,
    padding: "32px 16px",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const card: React.CSSProperties = {
    margin: "0 auto",
    width: "100%",
    maxWidth: "640px",
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(2, 6, 23, 0.06)",
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
};

const header: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    padding: "28px 24px",
    textAlign: "center",
    color: "#fff",
};

const headerTitle: React.CSSProperties = {
    margin: 0,
    fontSize: 22,
    lineHeight: "28px",
    fontWeight: 800,
    letterSpacing: "0.3px",
    color: "#fff",
};

const headerSubtitle: React.CSSProperties = {
    margin: "6px 0 0 0",
    fontSize: 13,
    lineHeight: "18px",
    color: "rgba(255,255,255,0.85)",
};

const introBox: React.CSSProperties = {
    padding: "18px 24px 0 24px",
};

const introText: React.CSSProperties = {
    margin: 0,
    fontSize: 14,
    lineHeight: "22px",
    color: colors.subtext,
};

const divider: React.CSSProperties = {
    borderColor: colors.border,
    margin: "16px 0",
};

const infoGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    padding: "0 24px 8px 24px",
};

const infoItem: React.CSSProperties = {
    backgroundColor: colors.primarySoft,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: "12px 14px",
};

const infoItemFull: React.CSSProperties = {
    ...infoItem,
    gridColumn: "1 / -1",
};

const infoLabel: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    color: colors.subtext,
    marginBottom: 6,
    letterSpacing: "0.2px",
};

const infoValue: React.CSSProperties = {
    display: "block",
    fontSize: 15,
    color: colors.text,
    fontWeight: 600,
    wordBreak: "break-word",
};

const infoLink: React.CSSProperties = {
    ...infoValue,
    color: colors.primary,
    textDecoration: "none",
};

const messageWrap: React.CSSProperties = {
    padding: "8px 24px 20px 24px",
};

const messageBox: React.CSSProperties = {
    marginTop: 8,
    backgroundColor: colors.primarySoft,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: "14px 16px",
};

const messageText: React.CSSProperties = {
    margin: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: colors.text,
    whiteSpace: "pre-wrap",
    fontFamily:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
};

const footNote: React.CSSProperties = {
    margin: "8px 0 22px 0",
    fontSize: 12,
    color: colors.subtext,
    textAlign: "center",
    padding: "0 24px 16px 24px",
};
