import pool from "../../config/db.js";

export const getCartItemsByUser = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT c.product_id, c.quantity, p.name, p.price, p.discount_price, i.quantity AS stock
        FROM cart_items c
        JOIN products p
        ON c.product_id = p.id
        JOIN inventory i
        ON p.id = i.product_id
        WHERE c.user_id = $1
          AND p.is_active = TRUE
          AND p.deleted_at IS NULL
        `,
        [userId]
    );
    return rows;
};

export const getAddressById = async (addressId, userId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM addresses
        WHERE id = $1
          AND user_id = $2
        `,
        [addressId, userId]
    );
    return rows[0];
};

export const createOrder = async (client, userId, addressId, subtotal, discount, shippingCost, total) => {
    const { rows } = await client.query(
        `
        INSERT INTO orders (user_id, address_id, status, subtotal, discount, shipping_cost, total)
        VALUES ($1,$2,'pending',$3,$4,$5,$6)
        RETURNING *
        `,
        [userId, addressId, subtotal, discount, shippingCost, total]
    );
    return rows[0];
};

export const createOrderItem = async (client, orderId, productId, quantity, unitPrice, totalPrice) => {
    await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
        VALUES ($1,$2,$3,$4,$5)
        `,
        [orderId, productId, quantity, unitPrice, totalPrice]
    );
};

export const updateInventory = async (client, productId, quantity) => {
    await client.query(
        `
        UPDATE inventory
        SET quantity = quantity - $2
        WHERE product_id = $1
        `,
        [productId, quantity]
    );
};

export const clearCart = async (client, userId) => {
    await client.query(
        `
        DELETE FROM cart_items
        WHERE user_id = $1
        `,
        [userId]
    );
};

export const getOrdersByUser = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
};

export const getOrderById = async (orderId, userId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1
          AND user_id = $2
        `,
        [orderId, userId]
    );

    return rows[0];
};

export const getAllOrders = async () => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM orders
        ORDER BY created_at DESC
        `
    );

    return rows;
};

export const updateOrderStatus = async (orderId, status) => {
    const { rows } = await pool.query(
        `
        UPDATE orders
        SET status = $2
        WHERE id = $1
        RETURNING *
        `,
        [orderId, status]
    );

    return rows[0];
};