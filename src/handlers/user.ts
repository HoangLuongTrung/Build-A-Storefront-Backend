import { Application, Request, Response } from 'express';
import { UsersModel } from '../models/user';
const usersModel = new UsersModel();

const create = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersModel.create({
      firstName,
      lastName,
      username,
      password,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

const getListUser = async (_req: Request, res: Response) => {
  try {
    const listUser = await usersModel.list();
    console.log(listUser);
    res.send(listUser);
  } catch (error) {
    res.send(error);
  }
}


const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await usersModel.get(+id);
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await usersModel.delete(+id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const id = req.body.id;
    const user = await usersModel.update({
      firstName,
      lastName,
      id
    })
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

export default function userRoutes(app: Application) {
  app.post('/users/create', create);
  app.get('/users/list', getListUser);
  app.get('/users/:id', getUserById);
  app.delete('/delete_user/:id', deleteUserById);
  app.put('/update_user', updateUser);
}