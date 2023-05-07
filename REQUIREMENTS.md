# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Users
- Create: `'users/create'`
- List: `'users/list'`
- Detail: `'users/:id'`
- Delete: `'delete_user/:id'`
- Update: `'update_user'`
- Authenticate: `'authenticate'`

#### Products
- Create: `'products/create'`
- List: `'products/list'`
- Detail: `'products/detail/:id'`
- Delete: `'products/delete/:id'`
- Update: `'products/update'`
- Popular: `'products/popular'`

#### Orders
- Create: `'orders/create'`
- List: `'orders/list'`
- Detail: `'orders/detail/:id'`
- Delete: `'orders/delete/:id'`
- Update: `'orders/update'`

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