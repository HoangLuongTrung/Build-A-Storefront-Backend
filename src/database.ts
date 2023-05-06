import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
    PG_HOST,
    PG_DB,
    PG_USER,
    PG_PASSWORD
} = process.env;

const client = new Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DB,
    password: PG_PASSWORD,
    port: 5432,
});
export default client;