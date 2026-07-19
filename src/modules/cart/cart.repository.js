import pool from "../../config/db.js";

export const getCartItemsByUserId = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM cart_items
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId]
    );

    return rows;
};

export const getCartItem = async (userId, productId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM cart_items
        WHERE user_id = $1
        AND product_id = $2;
        `,
        [userId, productId]
    );

    return rows[0];
};

export const addToCart = async (userId, productId, quantity) => {
    const { rows } = await pool.query(
        `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [userId, productId, quantity]
    );

    return rows[0];
};

export const updateCartItem = async (userId, productId, quantity) => {
    const { rows } = await pool.query(
        `
        UPDATE cart_items
        SET quantity = $3
        WHERE user_id = $1
        AND product_id = $2
        RETURNING *;
        `,
        [userId, productId, quantity]
    );

    return rows[0];
};

export const removeCartItem = async (userId, productId) => {
    await pool.query(
        `
        DELETE FROM cart_items
        WHERE user_id = $1
        AND product_id = $2;
        `,
        [userId, productId]
    );
};

export const clearCart = async (userId) => {
    await pool.query(
        `
        DELETE FROM cart_items
        WHERE user_id = $1;
        `,
        [userId]
    );
};