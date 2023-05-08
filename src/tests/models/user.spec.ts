import { InfoUser, User, UsersModel } from '../../models/user';

const userModel = new UsersModel();

describe('User Model', () => {
  const user: InfoUser = {
    username: 'luongtrung',
    firstName: 'luong',
    lastName: 'trung',
    password: 'trung123',
  };

  async function createUser(user: InfoUser) {
    return userModel.create(user);
  }

  async function deleteUser(id: number) {
    return userModel.delete(id);
  }

  it('should create a user', async () => {
    const createdUser = await createUser(user);
    if (createdUser) {
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.firstname).toBe(user.firstName);
      expect(createdUser.lastname).toBe(user.lastName);
    }
    await deleteUser(createdUser.id);
  });

  it('should return a list of users', async () => {
    const result = await userModel.list();
    expect(result[0].username).toEqual('luongtrung');
    expect(result[0].firstname).toEqual('luong');
    expect(result[0].lastname).toEqual('trung');
  });

  it(' should return the correct users', async () => {
    const createdUser: User = await createUser(user);
    const users = await userModel.get(createdUser.id);
    expect(users).toEqual(createdUser);
    await deleteUser(createdUser.id);
  });

  it('should delete the user', async () => {
    const createdUser: User = await createUser(user);
    const isDelete = await deleteUser(createdUser.id);
    expect(isDelete).toEqual(true);
  });

  it('should update the user', async () => {
    const createdUser: User = await createUser(user);
    const newUserData = {
      firstName: 'luong update',
      lastName: 'trung update',
      id: 1
    };

    const response = await userModel.update(newUserData);
    
    expect(response.firstname).toEqual(newUserData.firstName);
    expect(response.lastname).toEqual(newUserData.lastName);

    await deleteUser(createdUser.id);
  });
});
