import { Application, Request, Response } from 'express';
import { ProductModel } from '../models/product';

const productsModel = new ProductModel();
const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = await productsModel.create({name, price, category});
    res.send(product);
  } catch (error) {
    res.send(error);
  }
}

const getListProduct = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as unknown as string;
    const listProducts = await productsModel.list(name);
    res.send(listProducts);
  } catch (error) {
    res.send(error);
  }
}

export default function productRouter(app: Application) {
  app.post('/products/create', create);
  app.get('/products/list', getListProduct);
}