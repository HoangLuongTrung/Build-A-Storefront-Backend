import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Product Handler', () => {
  const product = {
    name: 'GTA V',
    price: 29,
    category: 'Game'
  };

  let token = '';

  beforeAll(async () => {
    const userData = {
      username: 'luongtrung',
      firstname: 'luong',
      lastname: 'trung',
      password: 'trung123',
    };

    const { body: userBody } = await request.post('/users/create').send(userData);
    token = userBody;
  });

  it('gets the create product endpoint', async (done) => {
    const res = await request
      .post('/products/create')
      .send(product)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('gets list products endpoint', async (done) => {
    const res = await request.get('/products/list');
    expect(res.status).toBe(200);
    done();
  });

  it('gets list popular products endpoint', async (done) => {
    const res = await request.get('/products/popular');
    expect(res.status).toBe(200);
    done();
  });

  it('gets product detail endpoint', async (done) => {
    const res = await request.get(`/products/detail/1`);
    expect(res.status).toBe(200);
    done();
  });

  it('gets the update product endpoint', async (done) => {
    const newProductData = {
      ...product,
      name: 'GTA V',
      price: 250,
      category: 'Game'
    };
    const res = await request
      .put(`/products/update`)
      .send(newProductData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('gets the delete product endpoint', async (done) => {
    const res = await request.delete(`/products/delete/15`).set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
