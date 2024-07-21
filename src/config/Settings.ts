
export function getEnvsEmail() {
    return {
        smptHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpUser: process.env.SMTP_USER,
        smptPassword: process.env.SMTP_PASSWORD,
        smtpFromEmail: process.env.SMTP_FROM_EMAIL
    }
}

export function getEnvsDrive() {
    return {
        urlPortfolioEs: process.env.URL_DRIVE_PORTFOLIO_ES,
        urlPortfolioEn: process.env.URL_DRIVE_PORTFOLIO_EN
    }
}