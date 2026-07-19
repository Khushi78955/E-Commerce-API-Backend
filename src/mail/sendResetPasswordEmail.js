import transporter from "./transporter.js";
import env from "../config/env.js";

const sendResetPasswordEmail = async ({ email, firstName, token }) => {
    const resetLink = `${env.CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"E-Commerce API" <${env.SMTP_USER}>`,
        to: email,
        subject: "Reset Your Password",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Password Reset Request</h2>
            <p>Hi ${firstName},</p>
            <p>We received a request to reset your password.</p>
            <p>Click the button below to create a new password:</p>

            <a href="${resetLink}"
            style="
                display:inline-block;
                padding:12px 24px;
                background:#2563eb;
                color:#fff;
                text-decoration:none;
                border-radius:6px;
            ">Reset Password</a>

            <p style="margin-top:24px;">
            If you didn't request a password reset,
            you can safely ignore this email.
            </p>

            <p>This link expires shortly for security reasons.</p>
        </div>
        `,
    });
};

export default sendResetPasswordEmail;