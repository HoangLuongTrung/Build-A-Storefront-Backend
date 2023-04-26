import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

// const client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
// });

const client = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'storefront',
    password: '!@#QWE123qwe',
    port: 5432, // default PostgreSQL port
  });

export default client;