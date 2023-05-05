import client from "../database";

export interface OrderProduct {
  productId: number;
  quanlity: number;
}

export interface Order {
  userId: number;
  status: 'active' | 'complete';
  orderProducts: OrderProduct[];
}

export class OrderModel {
  async create(userId: number, status: 'active' | 'complete', products: OrderProduct[]): Promise<Order> {
    try {
      const connect = await client.connect();
      const sqlNewOrder = `INSERT INTO orders(user_id, status) VALUES (${userId}, '${status}') RETURNING *`;
      const result = await connect.query(sqlNewOrder);
      const order = result.rows[0];
      const orderProducts = [];
      for (const product of products) {
        const sqlOrderProducts = `INSERT INTO order_product(product_id, order_id, quantity) VALUES ('${product.productId}', ${order.id}, ${product.quanlity}) RETURNING product_id, quantity`;
        const { rows } = await connect.query(sqlOrderProducts);
        orderProducts.push(rows[0]);
      }
      connect.release();
      return {
        ...order,
        products: orderProducts,
      };
    } catch (error) {
      throw new Error(`Could not create new order product ${error}`);
    }
  }

  async list(): Promise<any> {
    try {
      const connect = await client.connect();
      const sqlOrder = `SELECT * FROM orders`;
      const { rows } = await connect.query(sqlOrder);
      const productOrders = [];
      for (const order of rows) {
        const sqlProductOrder = `SELECT * FROM order_product WHERE order_id = ${order.id}`;
        const { rows: productOrder } = await connect.query(sqlProductOrder);
        productOrders.push({
          ...order,
          orderProducts: productOrder,
        });
      }
      connect.release();
      return productOrders;
    } catch (error) {
      throw new Error(`Could not get list order product ${error}`);
    }
  }
}