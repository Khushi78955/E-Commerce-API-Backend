import pool from "../../config/db.js";


export const getAllProducts = async () => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM products
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
        `
    );
    return rows;
}


export const getProductById = async (id) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM products
        WHERE id = $1
        AND deleted_at IS NULL
        `,
        [id]
    )
    return rows[0];
}



export const getProductBySlug = async (slug) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM products
        WHERE slug = $1
        AND deleted_at IS NULL
        `,
        [slug]
    )
    return rows[0];
}


export const getProductBySku = async (sku) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM products
        WHERE sku = $1
        AND deleted_at IS NULL
        `,
        [sku]
    )
    return rows[0];
}


export const createProduct = async ({category_id, name, slug, description, sku, price, discount_price, is_active}) => {
    const {rows} = await pool.query(
        `
        INSERT INTO products (category_id, name, slug, description, sku, price, discount_price, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, TRUE))
        RETURNING *
        `,
        [category_id, name, slug, description, sku, price, discount_price, is_active]
    )
    return rows[0];
}


export const updateProduct = async ({id, category_id, name, slug, description, sku, price, discount_price, is_active}) => {
    const { rows } = await pool.query(
        `
        UPDATE products
        SET
            category_id = $2,
            name = $3,
            slug = $4,
            description = $5,
            sku = $6,
            price = $7,
            discount_price = $8,
            is_active = $9,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
        `,
        [id, category_id, name, slug, description, sku, price, discount_price, is_active]
    )
    return rows[0];
}


export const deleteProduct = async (id) => {
    await pool.query(
        `
        UPDATE products
        SET deleted_at = NOW()
        WHERE id = $1;
        `,
        [id]
    )
}