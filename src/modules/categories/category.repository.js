import pool from "../../config/db.js";

export const getAllCategories = async () => {
    const query = 
    `
    SELECT *
    FROM categories
    ORDER BY name ASC
    `;
    const {rows} = await pool.query(query);
    return rows;
}


export const getCategoryById = async (id) => {
    const query = 
    `
    SELECT *
    FROM categories
    WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}


export const getCategoryByName = async (name) => {
    const query = 
    `
    SELECT *
    FROM categories
    WHERE name = $1
    `;
    const { rows } = await pool.query(query, [name]);
    return rows[0];
}


export const getCategoryBySlug = async (slug) => {
    const query =
    `
    SELECT *
    FROM categories
    WHERE slug = $1
    `;
    const { rows } = await pool.query(query, [slug]);
    return rows[0];
}


export const createCategory = async ({name, slug, description, parent_category_id}) => {
    const query = 
    `
    INSERT INTO categories (name, slug, description, parent_category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const values = [name, slug, description ?? null, parent_category_id ?? null];
    const { rows } = await pool.query(query, values);
    return rows[0];
}



export const updateCategory = async ({id, name, slug, description, parent_category_id}) => {
    const query =
    `
    UPDATE categories
    SET
        name = $1,
        slug = $2,
        description = $3,
        parent_category_id = $4
    WHERE id = $5
    RETURNING *;
    `;
    const values = [name, slug, description, parent_category_id, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}


export const deleteCategory = async (id) => {
    const query =
    `
    DELETE FROM categories
    WHERE id = $1
    RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}