import pool from "../../config/db.js";

export const getWishlistItemsByUserId = async (userId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM wishlist_items
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId]
    )
    return rows;
}

export const getWishlistItem = async (userId, productId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM wishlist_items
        WHERE user_id = $1
        AND product_id = $2;
        `,
        [userId, productId]
    )
    return rows[0];
}

export const addToWishlist = async (userId, productId) => {
    const { rows } = await pool.query(
        `
        INSERT INTO wishlist_items (user_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [userId, productId]
    );
    return rows[0];
}



export const removeWishlistItem = async (userId, productId) => {
    await pool.query(
        `
        DELETE FROM wishlist_items
        WHERE user_id = $1
        AND product_id = $2;
        `,
        [userId, productId]
    );
};