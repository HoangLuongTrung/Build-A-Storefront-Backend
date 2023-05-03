import client from "../database";

export interface BaseProduct {
  name: string;
  price: number;
  category?: string;
}

export interface FilterProduct {
  name?: string;
  price?: number;
  category?: string;
}

export interface Product extends BaseProduct {
  id: number;
}

export class ProductModel {
  async create(product: BaseProduct): Promise<Product> {
    const { name, price, category } = product;
    try {
      const connect = await client.connect();
      const sql = `INSERT INTO products(name, price, category) VALUES ('${name}', '${price}', '${category}') RETURNING *`;
      const result = await connect.query(sql);
      const product = result.rows[0];
      connect.release();
      return product;
    } catch (error) {
      throw new Error(`Could not create new product ${error}`);
    }
  }

  async list(name: string): Promise<Product[]> {
    try {
      const connect = await client.connect();
      const sql = `SELECT * FROM products WHERE LOWER(name) LIKE LOWER('${name || ''}%') ORDER BY name`;
      const { rows } = await connect.query(sql);
      connect.release();
      return rows;
    } catch (error) {
      throw new Error(`Could not get list products ${error}`);
    }
  }

  async popularProducts(): Promise<Product[]> {
    try {
      const connect = await client.connect();
      const sql = `SELECT * FROM products ORDER BY name LIMIT 5`;
      const { rows } = await connect.query(sql);
      connect.release();
      return rows;
    } catch (error) {
      throw new Error(`Could not get list popular products ${error}`);
    }
  }

  async detail(id: number): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql = `SELECT * FROM products WHERE id = ${id}`;
      const { rows } = await connect.query(sql);
      connect.release();
      return rows[0];
    } catch (error) {
      throw new Error(`Could not get detail product ${error}`);
    }
  }
}