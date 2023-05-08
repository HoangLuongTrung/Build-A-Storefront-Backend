import bcrypt from 'bcrypt';
import client from "../database";

export interface Authenticate {
  username: string;
  password: string;
}

export interface UpdateUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface InfoUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  firstname?: string; // To get value after update
  lastname?: string; // To get value after update
}

export interface User extends InfoUser {
  id: number;
}

export class UsersModel {
  /**
   * Create new user
   * @param user 
   * @returns 
   */
  async create(user: InfoUser): Promise<User> {
    const { firstName, lastName, username, password } = user;
    try {
      const connect = await client.connect();
      const hashPassword = bcrypt.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string, 10));
      const sql = `INSERT INTO users(username, password, firstname, lastname) VALUES ('${username}', '${hashPassword}', '${firstName}', '${lastName}') RETURNING *`;
      const result = await connect.query(sql);
      const user = result.rows[0];
      connect.release();
      return user;
    } catch (error) {
      throw new Error(`Could not add new user ${error}`);
    }
  }

  async list(): Promise<User[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users';
      const { rows } = await connect.query(sql);
      connect.release();
      return rows;
    } catch (error) {
      throw new Error(`Could not get list user ${error}`);
    }
  }

  async get(id: number): Promise<User> {
    try {
      const connect = await client.connect();
      const sql = `SELECT * FROM users WHERE id = ${id}`;
      const { rows } = await connect.query(sql);
      connect.release();
      return rows[0];
    } catch (error) {
      throw new Error(`Could not get user ${error}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const connect = await client.connect();
      const sql = `DELETE FROM users WHERE id = ${id}`;
      await connect.query(sql);
      connect.release();
      return true;
    } catch (error) {
      throw new Error(`Could not delete user ${error}`);
    }
  }

  async update(info: UpdateUser): Promise<User> {
    try {
      const { id, firstName, lastName } = info;
      const connect = await client.connect();
      const sql = `UPDATE users SET firstname = '${firstName}', lastname = '${lastName}' WHERE id = ${id} RETURNING *`;
      const { rows } = await connect.query(sql);
      connect.release();
      return rows[0];
    } catch (error) {
      throw new Error(`Could not update user ${error}`);
    }
  }

  async authenticate(authenticate: Authenticate): Promise<User | null> {
    try {
      const { username, password } = authenticate;
      const connect = await client.connect();
      const sql = `SELECT password FROM users  WHERE username = '${username}'`;
      const { rows } = await connect.query(sql);
      if (rows.length > 0) {
        const user = rows[0];
        if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      connect.release();
      return null;
    } catch (error) {
      throw new Error(`Could not access ${error}`);
    }
  }
}