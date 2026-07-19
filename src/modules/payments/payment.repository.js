import pool from "../../config/db.js";

export const getOrderById = async (orderId, userId) => {
    const {rows} = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1
            AND user_id = $2
        `,
        [orderId, userId]
    )
    return rows[0];
}


export const createPayment = async (orderId, transactionId, amount, status) => {
    const {rows} = await pool.query(
        `
        INSERT INTO payments (order_id, provider, transaction_id, amount, status)
        VALUES ($1, 'stripe', $2, $3, $4)
        RETURNING *
        `,
        [orderId, transactionId, amount, status]
    )
    return rows[0];
}


export const updatePaymentStatus = async (transactionId, status) => {
    const {rows} = await pool.query(
        `
        UPDATE payments
        SET
            status = $2,
            paid_at = NOW()
        WHERE transaction_id = $1
        RETURNING *
        `,
        [transactionId, status]
    )
    return rows[0];
}




export const updateOrderStatus = async (orderId, status) => {
    await pool.query(
        `
        UPDATE orders
        SET status = $2
        WHERE id = $1
        `,
        [orderId, status]
    );
};



export const getAllPayments = async () => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM payments
        ORDER BY created_at DESC
        `
    );
    return rows;
};


export const getPaymentByOrderId = async (orderId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM payments
        WHERE order_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [orderId]
    );
    return rows[0];
};