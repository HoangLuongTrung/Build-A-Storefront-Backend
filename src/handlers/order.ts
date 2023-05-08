import { Application, Request, Response } from 'express';
import { OrderModel } from '../models/order';
import { verifyToken } from '../utils/utils';

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

const getListProductOrder = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.list();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
}

const getOrderDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderDetail = await orderModel.detail(+id);
    res.send(orderDetail);
  } catch (error) {
    res.send(error);
  }
}

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isDelete = await orderModel.delete(+id);
    res.send(isDelete);
  } catch (error) {
    res.send(error);
  }
}

const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const orderProducts = req.body.orderProducts;
    const update = await orderModel.update(id, status, orderProducts);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
}

export default function orderRoutes(app: Application) {
  app.post('/orders/create', verifyToken, orderProducts);
  app.get('/orders/list', verifyToken, getListProductOrder);
  app.get('/orders/detail/:id', verifyToken, getOrderDetail);
  app.delete('/orders/delete/:id', verifyToken, deleteOrder);
  app.put('/orders/update', verifyToken, updateOrder);
}