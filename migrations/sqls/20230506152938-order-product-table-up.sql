CREATE TABLE order_product (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  quantity INTEGER NOT NULL
);