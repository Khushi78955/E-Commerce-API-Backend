BEGIN;

INSERT INTO roles (name, description)
VALUES
('admin', 'Administrator with full access'),
('customer', 'Regular customer');

INSERT INTO permissions (name, description)
VALUES
('user.read', 'Read users'),
('user.create', 'Create users'),
('user.update', 'Update users'),
('user.delete', 'Delete users'),

('product.read', 'Read products'),
('product.create', 'Create products'),
('product.update', 'Update products'),
('product.delete', 'Delete products'),

('category.read', 'Read categories'),
('category.create', 'Create categories'),
('category.update', 'Update categories'),
('category.delete', 'Delete categories'),

('order.read', 'Read orders'),
('order.update', 'Update orders'),

('coupon.read', 'Read coupons'),
('coupon.create', 'Create coupons'),
('coupon.update', 'Update coupons'),
('coupon.delete', 'Delete coupons');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (
    'product.read',
    'category.read',
    'order.read'
)
WHERE r.name = 'customer';

INSERT INTO categories (name, slug, description)
VALUES
('Electronics', 'electronics', 'Electronic gadgets and devices'),
('Fashion', 'fashion', 'Clothing and accessories'),
('Books', 'books', 'Books and educational material'),
('Home & Kitchen', 'home-kitchen', 'Home and kitchen essentials'),
('Sports', 'sports', 'Sports and fitness equipment');

COMMIT;