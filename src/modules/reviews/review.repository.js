import pool from "../../config/db.js";




export const createReview = async (userId, productId, rating, comment) => {
    const { rows } = await pool.query(
        `
        INSERT INTO reviews (user_id, product_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [userId, productId, rating, comment]
    );
    return rows[0];
};


export const getReviewByUserAndProduct = async (userId, productId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE user_id = $1
          AND product_id = $2
        `,
        [userId, productId]
    );
    return rows[0];
};


export const getReviewById = async (reviewId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE id = $1
        `,
        [reviewId]
    );
    return rows[0];
};


export const getReviewsByProduct = async (productId) => {
    const { rows } = await pool.query(
        `
        SELECT r.*, u.name
        FROM reviews r
        JOIN users u
          ON r.user_id = u.id
        WHERE r.product_id = $1
        ORDER BY r.created_at DESC
        `,
        [productId]
    );
    return rows;
};


export const updateReview = async (reviewId, rating, comment) => {
    const { rows } = await pool.query(
        `
        UPDATE reviews
        SET
            rating = COALESCE($2, rating),
            comment = COALESCE($3, comment),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
        `,
        [reviewId, rating, comment]
    );
    return rows[0];
};


export const deleteReview = async (reviewId) => {
    await pool.query(
        `
        DELETE FROM reviews
        WHERE id = $1
        `,
        [reviewId]
    );
};