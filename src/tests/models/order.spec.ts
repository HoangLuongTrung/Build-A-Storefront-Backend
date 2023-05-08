import { Order, OrderMapping, OrderModel } from '../../models/order';
import { User, UsersModel } from '../../models/user';
import { Product, ProductModel } from '../../models/product';

const orderModel = new OrderModel();

describe('Order Model', () => {
  const userModel = new UsersModel();
  const productModel = new ProductModel();

  let order: OrderMapping;
  let user_id: number;
  let product_id: number;

  beforeAll(async () => {
    const user: User = await userModel.create({
      username: 'luongtrung',
      firstName: 'luong',
      lastName: 'trung',
      password: 'trung123',
    });

    user_id = user.id;

    const product: Product = await productModel.create({
      name: 'GTV 5',
      price: 2000,
    });

    product_id = product.id;

    order = {
      orderProducts: [
        {
          productId:product.id,
          quantity: 5,
        },
      ],
      user_id,
      status: 'active',
    };
  });

  it('should create a order product', async () => {
    const createdOrder = await orderModel.create(order.user_id, order.status, order.orderProducts);
    expect(createdOrder.user_id).toEqual(order.user_id);
  });

  it('should return a list of orders', async () => {
    const createdOrder: Order = await orderModel.create(order.user_id, order.status, order.orderProducts);
    const orderList = await orderModel.list();
    const isExistInListOrder = orderList.some(x => x.user_id === createdOrder.user_id);
    expect(isExistInListOrder).toEqual(true);
  });

  it('show method should return the correct orders', async () => {
    const createdOrder: Order = await orderModel.create(order.user_id, order.status, order.orderProducts);
    const orderData = await orderModel.detail(createdOrder.id);
    expect(orderData.id).toEqual(createdOrder.id);
  });

  it('should update the order', async () => {
    const createdOrder: Order = await orderModel.create(order.user_id, order.status, order.orderProducts);
    const orderData = {
      products: [
        {
          product_id,
          quantity: 20,
        },
      ],
      user_id,
      status: 'complete',
    };
    const resonse = await orderModel.update(createdOrder.id, "complete", orderData.products);
    expect(resonse.status).toEqual(orderData.status);
  });

  it('should delete the order item', async () => {
    const isDelete = await orderModel.delete(1);
    expect(isDelete).toEqual(true);
  });
});
