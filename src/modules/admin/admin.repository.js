import pool from "../../config/db.js";

export const getDashboardStats = async () => {
    const [users, products, orders, revenue] = await Promise.all([
        pool.query(
            `
            SELECT COUNT(*)::INT AS total_users
            FROM users
            WHERE deleted_at IS NULL
            `
        ),

        pool.query(
            `
            SELECT COUNT(*)::INT AS total_products
            FROM products
            WHERE deleted_at IS NULL
            `
        ),

        pool.query(
            `
            SELECT COUNT(*)::INT AS total_orders
            FROM orders
            `
        ),

        pool.query(
            `
            SELECT COALESCE(SUM(total),0) AS total_revenue
            FROM orders
            WHERE status = 'delivered'
            `
        )
    ]);

    return {
        totalUsers: users.rows[0].total_users,
        totalProducts: products.rows[0].total_products,
        totalOrders: orders.rows[0].total_orders,
        totalRevenue: revenue.rows[0].total_revenue
    }
}



export const getAllUsers = async () => {
    const { rows } = await pool.query(
    `
    SELECT id, first_name, last_name, email, is_email_verified, is_active, created_at, last_login_at
    FROM users
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    `);
    return rows;
};



export const getUserById = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT id, first_name, last_name, email, profile_image_url, is_email_verified, is_active, created_at, updated_at, last_login_at
        FROM users
        WHERE id = $1
          AND deleted_at IS NULL
        `,
        [userId]
    );
    return rows[0];
};



export const updateUserStatus = async (userId, isActive) => {
    const { rows } = await pool.query(
        `
        UPDATE users
        SET
            is_active = $2,
            updated_at = NOW()
        WHERE id = $1
        RETURNING id, first_name, last_name, email, is_active
        `,
        [userId, isActive]
    );
    return rows[0];
};