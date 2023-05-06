import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Order Handler', () => {
  let token: string;

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

  it('should create order product endpoint', async (done) => {
    const res = await request
      .post('/orders/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        userId: 1,
        status: "complete",
        orderProducts: [
          {
            productId: 4,
            quanlity: 10
          },
          {
            productId: 3,
            quanlity: 100
          }
        ]
      });
    expect(res.status).toBe(200);
    done();
  });

  it('gets list order product endpoint', async (done) => {
    request
      .get('/orders/list')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should gets the product detail endpoint', async (done) => {
    request
      .get(`/orders/detail/3`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should gets the delete order product endpoint', async (done) => {
    request
      .delete(`/orders/delete/3`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
