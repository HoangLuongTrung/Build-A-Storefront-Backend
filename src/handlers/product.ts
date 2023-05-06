import { Application, Request, Response } from 'express';
import { ProductModel } from '../models/product';
import { verifyToken } from '../utils/utils';

const productsModel = new ProductModel();
const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = await productsModel.create({ name, price, category });
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

const getTopPopularProducts = async (req: Request, res: Response) => {
  try {
    const listPopularProduct = await productsModel.popularProducts();
    res.send(listPopularProduct);
  } catch (error) {
    res.send(error);
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productsModel.detail(+id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = await productsModel.update({ id, name, price, category });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
}

const deleteProductById = async (req: Request, res: Response ) => {
  try {
    const id = req.body.id;
    const isDelete = await productsModel.delete(id);
    res.send(isDelete);
  } catch (error) {
    res.send(error);
  }
}

export default function productRouter(app: Application) {
  app.post('/products/create', verifyToken, create);
  app.get('/products/list', getListProduct);
  app.get('/products/popular', getTopPopularProducts);
  app.get('/products/detail/:id', getProductById);
  app.put('/products/update', verifyToken, updateProduct);
  app.delete('/products/delete', verifyToken, deleteProductById);
}