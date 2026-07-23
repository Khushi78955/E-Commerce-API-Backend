import pool from "../../config/db.js";


export const updateUserProfileImage = async (userId, imageUrl) => {
    const query = `
        UPDATE users
        SET profile_image_url = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING id, profile_image_url;
    `;
    const { rows } = await pool.query(query, [imageUrl, userId]);
    return rows[0];
};



export const updateProductImage = async (productId, imageUrl) => {
    const query = `
        UPDATE products
        SET image_url = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING id, image_url;
    `;
    const { rows } = await pool.query(query, [imageUrl, productId]);
    return rows[0];
};