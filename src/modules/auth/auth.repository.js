import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
    const query = 
    `
    SELECT id, first_name, last_name, email, password_hash, profile_image_url, is_email_verified, is_active, created_at, updated_at, last_login_at
    FROM users
    WHERE email = $1
        AND deleted_at IS NULL
    LIMIT 1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0]
}


export const findUserById = async (userId) => {
    const query = 
    `
    SELECT id, first_name, last_name, email, profile_image_url, is_email_verified, is_active, created_at, updated_at, last_login_at
    FROM users
    WHERE id = $1
        AND deleted_at IS NULL
    LIMIT 1;
    `;
    const {rows} = await pool.query(query, [userId]);
    return rows[0];

}

export const createUser = async (userData) => {
    const {firstName, lastName, email, passwordHash} = userData;
    const query = 
    `
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email, is_email_verified, created_at
    `;
    const values = [firstName, lastName, email, passwordHash];
    const {rows} = await pool.query(query, values);
    return rows[0];
}


export const findRoleByName = async (roleName) => {
    const query = 
    `
    SELECT id
    FROM roles
    WHERE name = $1
    LIMIT 1
    `;
    const {rows} = await pool.query(query, [roleName]);
    return rows[0];
}


export const assignRoleToUser = async (userId, roleId) => {
    const query = 
    `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    `;
    await pool.query(query, [userId, roleId]);
}


export const getUserRoles = async (userId) => {
    const query = 
    `
    SELECT r.id, r.name
    FROM user_roles ur
    JOIN roles r 
    ON ur.role_id = r.id
    WHERE ur.user_id = $1
    `;

    const {rows} = await pool.query(query, [userId]);
    return rows;
}


export const createRefreshToken = async ({userId, jti, tokenHash, expiresAt}) => {
    const query =
    `
    INSERT INTO refresh_tokens(user_id, jti, token_hash, expires_at)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `;
    const values = [userId, jti, tokenHash, expiresAt];
    const { rows } = await pool.query(query, values);
    return rows[0];
}


export const findRefreshToken = async (tokenHash) => {
    const query = 
    `
    SELECT rt.*, u.id AS user_id, u.email, u.is_active,u.is_email_verified
    FROM refresh_tokens rt
    JOIN users u
    ON rt.user_id = u.id
    WHERE rt.token_hash = $1
    AND rt.revoked_at IS NULL
    AND rt.expires_at > NOW()
    AND u.deleted_at IS NULL
    LIMIT 1
    `;
    const { rows } = await pool.query(query, [tokenHash]);
    return rows[0];
}


export const revokeRefreshToken = async (tokenId) => {
    const query = `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE id = $1;
    `;
    await pool.query(query, [tokenId]);
};

export const revokeAllRefreshTokens = async (userId) => {
    const query = `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE user_id = $1
        AND revoked_at IS NULL
    `;
    await pool.query(query, [userId]);
};


export const createUserSession = async({userId, refreshTokenId, deviceName, ipAddress, userAgent}) => {
    const query = 
    `
    INSERT INTO user_sessions (user_id, refresh_token_id, device_name, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `;
    const values = [userId, refreshTokenId, deviceName, ipAddress, userAgent];
    const { rows } = await pool.query(query, values);
    return rows[0];
}



export const deleteUserSession = async (refreshTokenId) => {
    const query = 
    `
    DELETE FROM user_sessions
    WHERE refresh_token_id = $1
    `;
    await pool.query(query, [refreshTokenId])
}


export const createLoginAttempt = async ({email, ipAddress, userAgent, successful}) => {
    const query = 
    `
    INSERT INTO login_attempts(email, ip_address, user_agent, successful)
    VALUES ($1, $2, $3, $4)
    `;
    const values = [email, ipAddress, userAgent, successful];
    await pool.query(query, values);
}

export const createEmailVerificationToken = async ({userId, tokenHash, expiresAt}) => {
    const query =
    `
    INSERT INTO email_verification_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id
    `;
    const values = [userId, tokenHash, expiresAt];
    const { rows } = await pool.query(query, values);
    return rows[0];
}


export const findEmailVerificationToken = async (tokenHash) => {
    const query = 
    `
    SELECT *
    FROM email_verification_tokens
    WHERE token_hash = $1
      AND used_at IS NULL
      AND expires_at > NOW()
    LIMIT 1;
    `;
    const { rows } = await pool.query(query, [tokenHash]);
    return rows[0];
}


export const markEmailVerificationTokenAsUsed = async (tokenId) => {
    const query = 
    `
    UPDATE email_verification_tokens
    SET used_at = NOW()
    WHERE id = $1;
    `;
    await pool.query(query, [tokenId]);
}

export const verifyUserEmail = async (userId) => {
    const query =
    `
    UPDATE users
    SET is_email_verified = TRUE,
        updated_at = NOW()
    WHERE id = $1;
    `;
    await pool.query(query, [userId]);
};


export const createPasswordResetToken = async ({userId, tokenHash, expiresAt}) => {
    const query = 
    `
    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id;
    `;
    const values = [userId, tokenHash, expiresAt];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export const findPasswordResetToken = async (tokenHash) => {
    const query = 
    `
    SELECT *
    FROM password_reset_tokens
    WHERE token_hash = $1
    AND used_at IS NULL
    AND expires_at > NOW()
    LIMIT 1;
    `;
    const { rows } = await pool.query(query, [tokenHash]);
    return rows[0];
};


export const markPasswordResetTokenAsUsed = async (tokenId) => {
    const query = 
    `
    UPDATE password_reset_tokens
    SET used_at = NOW()
    WHERE id = $1;
    `;
    await pool.query(query, [tokenId]);
};

export const updateUserPassword = async (userId, passwordHash) => {
    const query = 
    `
    UPDATE users
    SET password_hash = $1,
        updated_at = NOW()
    WHERE id = $2;
    `;
    await pool.query(query, [passwordHash, userId]);
};


export const findOAuthAccount = async (provider, providerUserId) => {
    const query = 
    `
    SELECT oa.*, u.id AS user_id, u.first_name, u.last_name, u.email, u.profile_image_url, u.is_email_verified, u.is_active
    FROM oauth_accounts oa
    JOIN users u
    ON oa.user_id = u.id
    WHERE oa.provider = $1
    AND oa.provider_user_id = $2
    AND u.deleted_at IS NULL
    LIMIT 1;
    `;

    const { rows } = await pool.query(query, [provider, providerUserId]);
    return rows[0];
};

export const createOAuthAccount = async ({userId, provider, providerUserId}) => {
    const query = 
    `
    INSERT INTO oauth_accounts (user_id, provider, provider_user_id)
    VALUES ($1, $2, $3)
    RETURNING id;
    `;
    const values = [userId, provider, providerUserId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const updateLastLogin = async (userId) => {
    const query = 
    `
    UPDATE users
    SET last_login_at = NOW()
    WHERE id = $1;
    `;
    await pool.query(query, [userId]);
};