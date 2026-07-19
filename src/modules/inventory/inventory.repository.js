import pool from "../../config/db.js";

export const getInventoryByProductId = async (productId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM inventory
        WHERE product_id = $1
        `,
        [productId]
    )
    return rows[0];
}


export const createInventory = async (productId, quantity = 0) => {
    const {rows} = await pool.query(
        `
        INSERT INTO inventory (product_id, quantity)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [productId, quantity]
    )
    return rows[0];
}


export const updateInventory = async (productId, quantity) => {
    const {rows} = await pool.query(
        `
        UPDATE inventory
        SET
            quantity = $2,
            updated_at = NOW()
        WHERE product_id = $1
        RETURNING *;
        `,
        [productId, quantity]
    )
    return rows[0];
}