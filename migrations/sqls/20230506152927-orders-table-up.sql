CREATE TYPE status_order AS ENUM ('active', 'complete');
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL, 
  user_id INTEGER REFERENCES users(id) NOT NULL,
  status status_order NOT NULL
);