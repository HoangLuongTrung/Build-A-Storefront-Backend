# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Users
- Create: `'users/create' [POST]`
- List: `'users/list' [GET]`
- Detail: `'users/:id' [GET]`
- Delete: `'delete_user/:id' [DELETE]`
- Update: `'update_user' [PUT]`
- Authenticate: `'authenticate' [POST]`

#### Products
- Create: `'products/create' [POST]`
- List: `'products/list' [GET]`
- Detail: `'products/detail/:id' [GET]`
- Delete: `'products/delete/:id' [DELETE]`
- Update: `'products/update' [PUT]`
- Popular: `'products/popular' [GET]`

```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], category:varchar(50))
```

#### Orders
- Create: `'orders/create' [POST]`
- List: `'orders/list' [GET]`
- Detail: `'orders/detail/:id' [GET]`
- Delete: `'orders/delete/:id' [DELETE]`
- Update: `'orders/update' [PUT]`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Orders Product
- order_id INTEGER REFERENCES orders(id)
- product_id INTEGER REFERENCES products(id)
- quantity INTEGER

## Database Schema
#### Users
Table: Users (id:serial[primary key], username:varchar(50), password:varchar(150), firstname:varchar(50), lastname:varchar(50))

#### Products
Table: Products(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, price numeric NOT NULL, category VARCHAR(50));

#### Order 
Table: Order (id SERIAL PRIMARY KEY NOT NULL, user_id INTEGER REFERENCES users(id) NOT NULL, status status_order NOT NULL);

#### Order Product 
Table: Order_Product (id SERIAL PRIMARY KEY NOT NULL, product_id INTEGER REFERENCES products(id) NOT NULL, order_id INTEGER REFERENCES orders(id) NOT NULL, quantity INTEGER NOT NUL);

#### Create enum status
CREATE: CREATE TYPE status_order AS ENUM ('active', 'complete');