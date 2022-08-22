## Register

This endpoint register new user.

### HTTP Request

`POST http://localhost:3001/users/register`

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| name |String|-|
| email|String |-|
| pasword |String |-|
| phone |String |-|

### Sample Return
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjYwNjQ1NDg2LCJleHAiOjE2NjEyNTAyODZ9.GR_ZSfjEckFiVlON-cThiYBVID4q1fOYSyIWx8jyIMg"

## Login

This endpoint login user.

### HTTP Request

`POST http://localhost:3001/users/login`

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| email|String |-|
| name |String |-|

### Sample Return
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjYwNjQ1NDg2LCJleHAiOjE2NjEyNTAyODZ9.GR_ZSfjEckFiVlON-cThiYBVID4q1fOYSyIWx8jyIMg"

## Update User

This endpoint update user info.

### HTTP Request

`POST http://localhost:3001/users/update`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| name |String|-|
| password |String |-|

### Sample Return
    "User updated successfully"

## All Products

This endpoint retrieve all products.

### HTTP Request

`GET http://localhost:3001/products`

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| cat_id |String (optional)|-|

### Sample Return
    "{
    "data": [
        {
            "id": 1,
            "name": "Baking Ingredients A",
            "img": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80",
            "desc": "This Baking Ingredients",
            "SKU": "k5oZK0lcTcPPbZO",
            "product_category_id": 1,
            "price": 74,
            "stock": 9
        },
        {
            "id": 2,
            "name": "Baking Ingredients B",
            "img": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80",
            "desc": "This Baking Ingredients",
            "SKU": "Sm7JXxhueMLgQy4",
            "product_category_id": 1,
            "price": 10,
            "stock": 8
        },
      ]
      }"

## Single Product

This endpoint retrieve single products.

### HTTP Request

`GET http://localhost:3001/products/:id`

### Query Parameters

-

### Sample Return
    "
        {
            "id": 1,
            "name": "Baking Ingredients A",
            "img": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80",
            "desc": "This Baking Ingredients",
            "SKU": "k5oZK0lcTcPPbZO",
            "product_category_id": 1,
            "price": 74,
            "stock": 9
        }
     "

## All Product Categories

This endpoint retrieve all product categories.

### HTTP Request

`GET http://localhost:3001/productcategories`

### Query Parameters

-

### Sample Return
    "
        {
    "data": [
        {
            "id": 1,
            "name": "Baking Ingredients",
        },
        {
            "id": 2,
            "name": "Biscuits & Cakes",
        },
      ]
      }
     "

## User's cart items 

This endpoint retrieve user's cart items.

### HTTP Request

`GET http://localhost:3001/carts`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

-

### Sample Return
    "
       [
    {
        "id": 2,
        "user_id": 5,
        "product_id": 1,
        "quantity": 4,
        "name": "Baking Ingredients A",
        "img": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80",
        "desc": "This Baking Ingredients",
        "SKU": "k5oZK0lcTcPPbZO",
        "product_category_id": 1,
        "price": 74,
        "stock": 9
    },
    {
        "id": 4,
        "user_id": 5,
        "product_id": 14,
        "quantity": 1,
        "name": "Jam, Spreads & Honey B",
        "img": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80",
        "desc": "This Jam, Spreads & Honey",
        "SKU": "qd9nhRSpcvoXVrk",
        "product_category_id": 7,
        "price": 28,
        "stock": 1
    },
   
]
     "

## User add cart items 

This endpoint add item to user's cart.

### HTTP Request

`POST http://localhost:3001/carts/add`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| product_id |Integer |-|
| quantity |Integer |-|

### Sample Return
    "add product to cart successfully"


## User edit cart items 

This endpoint edit item in user's cart.

### HTTP Request

`POST http://localhost:3001/carts/edit`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| product_id |Integer |-|
| quantity |Integer |-|

### Sample Return
    "update product quantity in cart successfully"

## User delete cart items 

This endpoint delete item in user's cart.

### HTTP Request

`POST http://localhost:3001/carts/delete`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| product_id |Integer |-|

### Sample Return
    "delete product in cart successfully"

## User's order 

This endpoint retrieve user's order.

### HTTP Request

`GET http://localhost:3001/orders`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

-

### Sample Return
    "
      wait still modifying
    "

## User add order (usually when checkout) 

This endpoint add item to user's cart.

### HTTP Request

`POST http://localhost:3001/orders/add`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| amount |Integer |-|
| delivery_address |String |-|
| payment_method |String |-|
| products |Array [{product_id:1, quantity:1}] |-|

### Sample Return
    "create order successfully"


## User edit order address 

This endpoint address od an order (only address other too complex).

### HTTP Request

`POST http://localhost:3001/orders/edit`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| delivery_address |String |-|

### Sample Return
    "update order successfully"

## User cancel order

This endpoint delete item in user's cart.

### HTTP Request

`POST http://localhost:3001/orders/delete`

### Request Header

|Key|Value|Description|
|--|--|--|
| Authorization |"Bearer token" |-|

### Query Parameters

|Parameter|Data Type|Description|
|--|--|--|
| order_id |Integer |-|

### Sample Return
    "cancel order successfully"
