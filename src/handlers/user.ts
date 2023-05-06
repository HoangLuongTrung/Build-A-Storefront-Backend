import { Application, Request, Response } from 'express';
import { User, UsersModel } from '../models/user';
import { getTokenByUser, verifyToken } from '../utils/utils';
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
    const token = getTokenByUser(user);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

const getListUser = async (_req: Request, res: Response) => {
  try {
    const listUser = await usersModel.list();
    res.send(listUser);
  } catch (error) {
    res.send(error);
  }
}


const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await usersModel.get(+id);
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

const validateAuth = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user: User | null = await usersModel.authenticate({ username: username, password: password })
    res.json(getTokenByUser(user));
  } catch (error) {
    res.send(error);
  }

}

export default function userRoutes(app: Application) {
  app.post('/users/create', create);
  app.get('/users/list', getListUser);
  app.get('/users/:id', getUserById);
  app.delete('/delete_user/:id', verifyToken, deleteUserById);
  app.put('/update_user', updateUser);
  app.post('/authenticate', validateAuth);
}