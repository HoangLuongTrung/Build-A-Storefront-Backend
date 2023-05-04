import { Application, Request, Response } from 'express';
import { OrderModel } from '../models/order';

const orderModel = new OrderModel();
const orderProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const status = req.body.status;
    const orderProducts = req.body.orderProducts;
    const orders = await orderModel.create(
      userId,
      status,
      orderProducts
    )
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
}

export default function orderRoutes(app: Application) {
  app.post('/orders/create', orderProducts);
}