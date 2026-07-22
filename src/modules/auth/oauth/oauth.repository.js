import pool from "../../../config/db.js";

export const findOAuthAccount = async (provider, providerId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM oauth_accounts
        WHERE provider = $1
        AND provider_user_id = $2
        `,
        [provider, providerId]
    )
    return rows[0];
}



export const findUserByEmail = async (email) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        AND deleted_at IS NULL
        `,
        [email]
    )
    return rows[0];
}



export const createOAuthAccount = async ({userId, provider, providerUserId}) => {
    const { rows } = await pool.query(
        `
        INSERT INTO oauth_accounts (user_id, provider, provider_user_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [userId, provider, providerUserId]
    );
    return rows[0];
};



export const createOAuthUser = async ({firstName, lastName, email, passwordHash, isEmailVerified}) => {
    const { rows } = await pool.query(
        `
        INSERT INTO users (first_name, last_name, email, password_hash, is_email_verified)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
        `,
        [firstName, lastName, email, passwordHash, isEmailVerified]
    );
    return rows[0];
};