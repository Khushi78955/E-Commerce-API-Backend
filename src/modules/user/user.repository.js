import pool from "../../config/db.js";


export const getUserProfile = async (userId) => {
    const {rows} = await pool.query(
        `
        SELECT id, first_name, last_name, email, profile_image_url, is_email_verified, is_active, created_at, updated_at, last_login_at
        FROM users
        WHERE id = $1
          AND deleted_at IS NULL
        `,
        [userId]
    )
    return rows[0];
}



export const getUserById = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
          AND deleted_at IS NULL
        `,
        [userId]
    );
    return rows[0];
}




export const updateUserProfile = async (userId, {first_name, last_name, profile_image_url}) => {
    const { rows } = await pool.query(
        `
        UPDATE users
        SET
            first_name = $2,
            last_name = $3,
            profile_image_url = $4,
            updated_at = NOW()
        WHERE id = $1
          AND deleted_at IS NULL
        RETURNING id, first_name, last_name, email, profile_image_url, is_email_verified, is_active, created_at, updated_at, last_login_at
        `,
        [userId, first_name, last_name, profile_image_url]
    );
    return rows[0];
};




export const updatePassword = async (userId, passwordHash) => {
    await pool.query(
        `
        UPDATE users
        SET
            password_hash = $2,
            updated_at = NOW()
        WHERE id = $1
          AND deleted_at IS NULL
        `,
        [userId, passwordHash]
    );
};



export const softDeleteUser = async (userId) => {
    await pool.query(
        `
        UPDATE users
        SET
            is_active = FALSE,
            deleted_at = NOW(),
            updated_at = NOW()
        WHERE id = $1
          AND deleted_at IS NULL
        `,
        [userId]
    )
};



export const revokeAllRefreshTokens = async (userId) => {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE user_id = $1
          AND revoked_at IS NULL
        `,
        [userId]
    );
};