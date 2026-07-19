CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_active
ON users(is_active);

CREATE INDEX idx_users_deleted
ON users(deleted_at);

CREATE INDEX idx_oauth_accounts_user
ON oauth_accounts(user_id);

CREATE INDEX idx_oauth_accounts_provider_user
ON oauth_accounts(provider, provider_user_id);

CREATE INDEX idx_refresh_tokens_user
ON refresh_tokens(user_id);

CREATE INDEX idx_refresh_tokens_jti
ON refresh_tokens(jti);

CREATE INDEX idx_refresh_tokens_expires
ON refresh_tokens(expires_at);

CREATE INDEX idx_email_verification_user
ON email_verification_tokens(user_id);

CREATE INDEX idx_email_verification_expires
ON email_verification_tokens(expires_at);

CREATE INDEX idx_password_reset_user
ON password_reset_tokens(user_id);

CREATE INDEX idx_password_reset_expires
ON password_reset_tokens(expires_at);

CREATE INDEX idx_login_attempts_email
ON login_attempts(email);

CREATE INDEX idx_login_attempts_attempted_at
ON login_attempts(attempted_at);

CREATE INDEX idx_user_sessions_user
ON user_sessions(user_id);

CREATE INDEX idx_user_sessions_refresh
ON user_sessions(refresh_token_id);

CREATE INDEX idx_user_roles_user
ON user_roles(user_id);

CREATE INDEX idx_user_roles_role
ON user_roles(role_id);

CREATE INDEX idx_role_permissions_role
ON role_permissions(role_id);

CREATE INDEX idx_role_permissions_permission
ON role_permissions(permission_id);

CREATE INDEX idx_categories_parent
ON categories(parent_category_id);

CREATE INDEX idx_categories_slug
ON categories(slug);

CREATE INDEX idx_products_category
ON products(category_id);

CREATE INDEX idx_products_slug
ON products(slug);

CREATE INDEX idx_products_sku
ON products(sku);

CREATE INDEX idx_products_active
ON products(is_active);

CREATE INDEX idx_products_deleted
ON products(deleted_at);

CREATE INDEX idx_product_images_product
ON product_images(product_id);

CREATE INDEX idx_inventory_quantity
ON inventory(quantity);

CREATE INDEX idx_addresses_user
ON addresses(user_id);

CREATE INDEX idx_addresses_default
ON addresses(user_id, is_default);

CREATE INDEX idx_cart_items_user
ON cart_items(user_id);

CREATE INDEX idx_cart_items_product
ON cart_items(product_id);

CREATE INDEX idx_wishlist_items_user
ON wishlist_items(user_id);

CREATE INDEX idx_wishlist_items_product
ON wishlist_items(product_id);

CREATE INDEX idx_orders_user
ON orders(user_id);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_orders_created_at
ON orders(created_at);

CREATE INDEX idx_order_items_order
ON order_items(order_id);

CREATE INDEX idx_order_items_product
ON order_items(product_id);

CREATE INDEX idx_payments_order
ON payments(order_id);

CREATE INDEX idx_payments_status
ON payments(status);

CREATE INDEX idx_coupons_code
ON coupons(code);

CREATE INDEX idx_coupons_active
ON coupons(is_active);

CREATE INDEX idx_coupons_expires
ON coupons(expires_at);

CREATE INDEX idx_coupon_redemptions_user
ON coupon_redemptions(user_id);

CREATE INDEX idx_coupon_redemptions_order
ON coupon_redemptions(order_id);