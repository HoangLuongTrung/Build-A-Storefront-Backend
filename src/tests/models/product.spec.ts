import { BaseProduct, Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();

describe('Product Model', () => {
  const product: BaseProduct = {
    name: 'GTA 5',
    price: 2000,
    category: 'Game'
  };

  async function createProduct(product: BaseProduct) {
    return productModel.create(product);
  }

  async function deleteProduct(id: number) {
    return productModel.delete(id);
  }

  it('should add a product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct.name).toEqual(product.name);
    await deleteProduct(createdProduct.id);
  });

  it('should return a list of products', async () => {
    const productList: Product[] = await productModel.list('');
    const productCreated = productList.some(x => x.name === product.name);
    expect(productCreated).toEqual(true);
  });

  it('should return a list 5 popular products', async () => {
    const productList: Product[] = await productModel.popularProducts();
    expect(productList.length).toEqual(5);
  });

  it('should return the correct product', async () => {
    const createdProduct: Product = await createProduct(product);
    const productData = await productModel.detail(createdProduct.id);
    expect(productData).toEqual(createdProduct);
    await deleteProduct(createdProduct.id);
  });

  it('should update the product', async () => {
    const createdProduct: Product = await createProduct(product);
    const newProduct: Product = {
      name: 'GTA 6',
      price: 2500,
      id: createdProduct.id
    };
    const response = await productModel.update(newProduct);
    console.log("response.price", response.price);
    
    expect(response.name).toEqual(newProduct.name);
    expect(+response.price).toEqual(newProduct.price);
    await deleteProduct(createdProduct.id);
  });

  it('should delete the product', async () => {
    const createdProduct: Product = await createProduct(product);
    const isDelete = await productModel.delete(createdProduct.id);
    expect(isDelete).toEqual(true);
  });
});
