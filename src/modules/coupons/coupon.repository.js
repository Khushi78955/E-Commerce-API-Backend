import pool from "../../config/db.js"


export const createCoupon = async (code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt) => {
    const { rows } = await pool.query(
        `
        INSERT INTO coupons (code, discount_type, discount_value, minimum_order_amount, usage_limit, expires_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt]
    );
    return rows[0];
};


export const getAllCoupons = async () => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM coupons
        ORDER BY created_at DESC
        `
    );

    return rows;
};


export const getCouponById = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM coupons
        WHERE id = $1
        `,
        [id]
    );

    return rows[0];
};


export const getCouponByCode = async (code) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM coupons
        WHERE code = $1
        `,
        [code]
    );

    return rows[0];
};


export const updateCoupon = async (id, updates) => {
    const fields = [];
    const values = [];
    let index = 1;
    for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
    }

    values.push(id);

    const { rows } = await pool.query(
        `
        UPDATE coupons
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *
        `,
        values
    );

    return rows[0];
};


export const deleteCoupon = async (id) => {
    const { rows } = await pool.query(
        `
        DELETE FROM coupons
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return rows[0];
};


export const incrementCouponUsage = async (id) => {
    await pool.query(
        `
        UPDATE coupons
        SET used_count = used_count + 1
        WHERE id = $1
        `,
        [id]
    );
};

export const validateCoupon = async (code) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM coupons
        WHERE code = $1
        `,
        [code]
    );

    return rows[0];
};