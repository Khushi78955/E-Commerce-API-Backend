# Database Design

## Database

PostgreSQL


# Goals

- Follow database normalization principles.
- Support production-scale e-commerce features.
- Separate authentication, authorization, catalog, shopping, payments, and system concerns.
- Ensure data integrity using constraints and transactions.
- Design for scalability and future expansion.



# Modules

## Authentication

- users
- oauth_accounts
- refresh_tokens
- email_verification_tokens
- password_reset_tokens
- login_attempts
- user_sessions



## Authorization

- roles
- permissions
- role_permissions
- user_roles



## Catalog

- categories
- products
- product_images
- inventory
- inventory_movements


## Shopping

- cart_items
- wishlist_items


## Customer

- addresses
- reviews



## Coupons

- coupons
- coupon_redemptions



## Orders

- orders
- order_items
- order_status_history



## Payments

- payments
- payment_refunds
- processed_webhooks



## Notifications

- notifications
- user_notifications



## Monitoring

- audit_logs



# Database Conventions

- BIGSERIAL primary keys
- TIMESTAMPTZ timestamps
- NUMERIC(10,2) for money
- Foreign keys for all relationships
- UNIQUE constraints where required
- CHECK constraints for business rules
- Soft deletes using deleted_at
- Transactions for checkout, refunds, and inventory updates
- Row-level locking during checkout