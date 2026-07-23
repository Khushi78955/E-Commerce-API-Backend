import pool from "../../config/db.js";


export const getAllRoles = async () => {
    const { rows } = await pool.query(
        `
        SELECT id, name, description, created_at
        FROM roles
        ORDER BY id
        `
    )
    return rows
}


export const getRoleById = async (roleId) => {
    const { rows } = await pool.query(
        `
        SELECT id, name, description, created_at
        FROM roles
        WHERE id = $1
        `,
        [roleId]
    )
    return rows[0]
}


export const getAllPermissions = async () => {
    const { rows } = await pool.query(
        `
        SELECT id, name, description, created_at
        FROM permissions
        ORDER BY id
        `
    )
    return rows
}



export const assignRole = async (userId, roleId) => {
    await pool.query(
        `
        INSERT INTO user_roles(user_id, role_id)
        VALUES($1,$2)
        ON CONFLICT(user_id, role_id)
        DO NOTHING
        `,
        [userId, roleId]
    )
}

export const removeRole = async (userId, roleId) => {
    await pool.query(
        `
        DELETE FROM user_roles
        WHERE user_id = $1
          AND role_id = $2
        `,
        [userId, roleId]
    )
}