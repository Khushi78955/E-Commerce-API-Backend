BEGIN;

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_oauth_accounts_user_id
ON oauth_accounts(user_id);

CREATE INDEX idx_refresh_tokens_user_id
ON refresh_tokens(user_id);

CREATE INDEX idx_refresh_tokens_expires_at
ON refresh_tokens(expires_at);

CREATE INDEX idx_email_verification_tokens_user_id
ON email_verification_tokens(user_id);

CREATE INDEX idx_password_reset_tokens_user_id
ON password_reset_tokens(user_id);

CREATE INDEX idx_user_sessions_user_id
ON user_sessions(user_id);

CREATE INDEX idx_login_attempts_email
ON login_attempts(email);

CREATE INDEX idx_login_attempts_attempted_at
ON login_attempts(attempted_at);

CREATE INDEX idx_user_roles_user_id
ON user_roles(user_id);

CREATE INDEX idx_user_roles_role_id
ON user_roles(role_id);

CREATE INDEX idx_role_permissions_role_id
ON role_permissions(role_id);

CREATE INDEX idx_role_permissions_permission_id
ON role_permissions(permission_id);

CREATE INDEX idx_products_category_id
ON products(category_id);

CREATE INDEX idx_products_slug
ON products(slug);

CREATE INDEX idx_products_sku
ON products(sku);

CREATE INDEX idx_products_is_active
ON products(is_active);

CREATE INDEX idx_product_images_product_id
ON product_images(product_id);

CREATE INDEX idx_inventory_quantity
ON inventory(quantity);

CREATE INDEX idx_addresses_user_id
ON addresses(user_id);

CREATE INDEX idx_cart_items_product_id
ON cart_items(product_id);

CREATE INDEX idx_wishlist_items_product_id
ON wishlist_items(product_id);

CREATE INDEX idx_orders_user_id
ON orders(user_id);

CREATE INDEX idx_orders_address_id
ON orders(address_id);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_orders_created_at
ON orders(created_at);

CREATE INDEX idx_order_items_order_id
ON order_items(order_id);

CREATE INDEX idx_order_items_product_id
ON order_items(product_id);

CREATE INDEX idx_payments_status
ON payments(status);

CREATE INDEX idx_payments_paid_at
ON payments(paid_at);

CREATE INDEX idx_coupons_code
ON coupons(code);

CREATE INDEX idx_coupon_usages_coupon_id
ON coupon_usages(coupon_id);

CREATE INDEX idx_coupon_usages_user_id
ON coupon_usages(user_id);

CREATE INDEX idx_coupon_usages_order_id
ON coupon_usages(order_id);

CREATE UNIQUE INDEX idx_addresses_default
ON addresses(user_id)
WHERE is_default = TRUE;

CREATE UNIQUE INDEX idx_product_images_primary
ON product_images(product_id)
WHERE is_primary = TRUE;

CREATE INDEX idx_orders_user_created_at
ON orders(user_id, created_at DESC);

COMMIT;