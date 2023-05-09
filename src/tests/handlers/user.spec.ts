import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('User Handler', () => {
  const userData = {
    username: 'luongtrung',
    firstname: 'luong',
    lastname: 'trung',
    password: 'trung123',
  };

  let token = '';
  let userId = 1;;

  it('should gets the create endpoint', async (done) => {
    const res = await request.post('/users/create').send(userData);

    const { body, status } = res;
    token = body;

    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    userId = user.id;
    expect(status).toBe(200);
    done();
  });

  it('should gets the list user endpoint', async (done) => {
    const res = await request.get('/users/list').set('Authorization', 'bearer ' + token);
    if (token) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(401);
    }
    done();
  });

  it('should get user by id endpoint', async (done) => {
    const res = await request.get(`/users/${userId}`).set('Authorization', 'bearer ' + token);
    if (token) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(401);
    }
    done();
  });

  it('should get the update user endpoint', async (done) => {
    const newUserData = {
      ...userData,
      firstname: 'Hoang',
      lastname: 'Trung',
    };

    const res = await request
      .put(`/update_user`)
      .send(newUserData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the authenticate endpoint', async (done) => {
    const res = await request
      .post('/authenticate')
      .send({
        username: userData.username,
        password: userData.password,
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the authenticate endpoint with wrong password', async (done) => {
    const res = await request
      .post('/authenticate')
      .send({
        username: userData.username,
        password: 'wrongpassword',
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(401);
    done();
  });

  it('should get the delete user endpoint', async (done) => {
    const res = await request.delete(`/delete_user/${userId}`).set('Authorization', 'bearer ' + token);
    if (token) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(401);
    }
    done();
  });
});
