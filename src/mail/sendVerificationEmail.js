import transporter from "./transporter.js";
import env from "../config/env.js";

const sendVerificationEmail = async ({
    email,
    firstName,
    token,
}) => {
    const verificationLink = `${env.CLIENT_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `"E-Commerce API" <${env.SMTP_USER}>`,
        to: email,
        subject: "Verify Your Email",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Welcome to E-Commerce API</h2>
            <p>Hi ${firstName},</p>
            <p>Thank you for registering. Please verify your email address by clicking the button below</p>
            <a href="${verificationLink}"
            style="
                display:inline-block;
                padding:12px 24px;
                background:#2563eb;
                color:#ffffff;
                text-decoration:none;
                border-radius:6px;
            ">Verify Email</a>

            <p style="margin-top:24px;">If you didn't create an account, you can safely ignore this email</p>
            <p>This verification link will expire in 24 hours</p>
        </div>
        `,
    });
};

export default sendVerificationEmail;