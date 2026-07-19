import pool from "../../config/db.js"

export const getAllAddressesByUserId = async (userId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM addresses
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId]
    )
    return rows;
}


export const getAddressById = async (id) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM addresses
        WHERE id = $1;
        `,
        [id]
    )
    return rows[0];
}


export const createAddress = async ({user_id, full_name, phone, address_line_1, address_line_2, city, state, country, postal_code, is_default}) => {
    const {rows} = await pool.query(
        `
        INSERT INTO addresses (user_id, full_name, phone, address_line_1, address_line_2, city, state, country, postal_code, is_default)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,COALESCE($10,FALSE))
        RETURNING *
        `,
        [user_id, full_name, phone, address_line_1, address_line_2, city, state, country, postal_code, is_default]
    )
    return rows[0];
}


export const updateAddress = async ({id, full_name, phone, address_line_1, address_line_2, city, state, country, postal_code, is_default}) => {
    const {rows} = await pool.query(
        `
        UPDATE addresses
        SET
            full_name = $2,
            phone = $3,
            address_line_1 = $4,
            address_line_2 = $5,
            city = $6,
            state = $7,
            country = $8,
            postal_code = $9,
            is_default = $10
        WHERE id = $1
        RETURNING *;
        `,
        [id, full_name, phone, address_line_1, address_line_2, city, state, country, postal_code, is_default]
    )
    return rows[0];
}



export const deleteAddress = async (id) => {
    await pool.query(
        `
        DELETE FROM addresses
        WHERE id = $1;
        `,
        [id]
    );
};


export const clearDefaultAddresses = async (userId) => {
    await pool.query(
        `
        UPDATE addresses
        SET is_default = FALSE
        WHERE user_id = $1;
        `,
        [userId]
    );
};