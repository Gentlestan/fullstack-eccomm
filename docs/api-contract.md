Frontend–Backend API Contract

E-commerce Web App

This document defines the API shape expected by the frontend.
Backend may add fields, but must not break or rename existing ones without coordination.

1️⃣ Authentication & User
POST /auth/login

Authenticate user and issue token/session.

Request

{
"email": "user@example.com",
"password": "string"
}

Response (200)

{
"token": "jwt-or-session-token",
"user": {
"id": "string",
"email": "user@example.com",
"role": "user | admin"
}
}

POST /auth/logout

Invalidate token/session.

Response (204)
No body

GET /auth/me

Return currently authenticated user.

Headers

Authorization: Bearer <token>

Response (200)

{
"id": "string",
"email": "user@example.com",
"role": "user | admin"
}

Errors

401 → unauthenticated

403 → invalid token

2️⃣ Products
GET /products

Fetch products with search, filtering, sorting.

Query Params

Param Type Description
q string Search keyword (name, brand, category, description)
category string Filter by category
brand string Filter by brand
minPrice number Minimum price
maxPrice number Maximum price
sort string price_asc, price_desc, rating, newest

Example

GET /products?q=samsung&sort=price_asc

Response (200)

[
{
"id": "p1",
"name": "Samsung Galaxy S23 Ultra",
"slug": "samsung-galaxy-s23-ultra",
"brand": "Samsung",
"category": "phone",
"price": 999,
"rating": 4.8,
"image": "url",
"inStock": true
}
]

GET /products/:slug

Fetch single product.

Response (200)

{
"id": "p1",
"name": "Samsung Galaxy S23 Ultra",
"slug": "samsung-galaxy-s23-ultra",
"description": "string",
"brand": "Samsung",
"category": "phone",
"price": 999,
"rating": 4.8,
"images": ["url"],
"inStock": true
}

Errors

404 → not found

3️⃣ Cart
GET /cart

Return current cart (authenticated user).

Response

{
"items": [
{
"productId": "p1",
"quantity": 2,
"price": 999
}
],
"total": 1998
}

POST /cart

Add/update item.

Request

{
"productId": "p1",
"quantity": 1
}

DELETE /cart/:productId

Remove item from cart.

4️⃣ Wishlist
GET /wishlist
[
{
"id": "p1",
"name": "Samsung Galaxy S23 Ultra",
"price": 999
}
]

POST /wishlist
{
"productId": "p1"
}

DELETE /wishlist/:productId
5️⃣ Orders
POST /orders

Create order from cart.

Response

{
"orderId": "o123",
"status": "pending",
"total": 1998
}

GET /orders

List user orders.

6️⃣ Roles & Authorization
Role Capabilities
user browse, buy, wishlist
admin manage products, view all orders

Backend must enforce roles.
Frontend will hide/show navigation based on role.

7️⃣ Error Format (global)

All errors should follow:

{
"message": "Human readable error",
"code": "OPTIONAL_ERROR_CODE"
}

8️⃣ Non-breaking rules

Backend may add:

new fields

optional fields

Backend must not:

rename fields

change types

remove fields without coordination
