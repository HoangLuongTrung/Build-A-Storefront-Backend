import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const {
    PG_HOST,
    PG_DB,
    PG_DB_TEST,
    PG_USER,
    PG_PASSWORD,
    ENV
} = process.env;
let client: any;

if (ENV === 'test') {
    client = new Pool({
      host: PG_HOST,
      database: PG_DB_TEST,
      user: PG_USER,
      password: PG_PASSWORD,
      port: 5432,
    });
  }
  
  if (ENV === 'dev') {
    client = new Pool({
      host: PG_HOST,
      database: PG_DB,
      user: PG_USER,
      password: PG_PASSWORD,
      port: 5432,
    });
  }

// const client = new Pool({
//     user: PG_USER,
//     host: PG_HOST,
//     database: PG_DB,
//     password: PG_PASSWORD,
//     port: 5432,
// });
export default client;