import client from "../database";

export interface OrderProduct {
  productId: number;
  quanlity: number;
}

export interface OrderProductMapping {
  product_id: number;
  quantity: number;
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

  async list(): Promise<Order[]> {
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

  async detail(id: number): Promise<Order> {
    try {
      const connect = await client.connect();
      const sqlOrder = `SELECT * FROM orders WHERE id = ${id}`;
      const { rows } = await connect.query(sqlOrder);
      const sqlProductOrder = `SELECT * FROM order_product WHERE order_id = ${rows[0].id}`;
      const { rows: orderProducts } = await connect.query(sqlProductOrder);

      return {
        ...rows[0],
        orderProducts: orderProducts
      };
    } catch (error) {
      throw new Error(`Could not get detail order product ${error}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const connect = await client.connect();
      const sqlDeleteOrder = `DELETE FROM orders WHERE id = ${id}`;
      await connect.query(sqlDeleteOrder)
      const sqlDeleteProductOrder = `DELETE FROM order_product WHERE order_id = ${id}`;
      await connect.query(sqlDeleteProductOrder)
      return true;
    } catch (error) {
      throw new Error(`Could not delete order product ${error}`);
    }
  }

  async update(id: number, status: 'active' | 'complete', orderProducts: OrderProductMapping[]): Promise<Order> {
    try {
      const connect = await client.connect();
      const sqlOrder = `UPDATE orders SET status = '${status}' WHERE id = ${id} RETURNING *`;
      const { rows } = await connect.query(sqlOrder);
      const order = rows[0];
      const products = [];
      for (const product of orderProducts) {
        const sqlProductOrder = `UPDATE order_product SET product_id = ${product.product_id}, quantity = ${product.quantity} WHERE order_id = ${id} RETURNING product_id, quantity`;
        const { rows } = await connect.query(sqlProductOrder);
        products.push(rows[0]);
      }
      return {
        ...order,
        orderProducts: products
      };
    } catch (error) {
      throw new Error(`Could not update order product ${error}`);
    }
  }
}