import { ProductService } from '../src/api/v1/services/productService';

jest.mock('../src/api/v1/repositories/firestoreRepository', () => ({
  FirestoreRepository: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 10, stock: 5 }),
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Widget', price: 10, stock: 5 }]),
    findById: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 10, stock: 5 }),
    update: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 15, stock: 5 }),
    delete: jest.fn().mockResolvedValue(true),
  })),
}));

describe('ProductService', () => {
  it('creates a new product', async () => {
    const service = new ProductService();
    const product = await service.createProduct({ name: 'Widget', price: 10, stock: 5 });

    expect(product).toEqual({ id: '1', name: 'Widget', price: 10, stock: 5 });
  });

  it('retrieves all products', async () => {
    const service = new ProductService();
    const products = await service.getProducts();

    expect(products).toEqual([{ id: '1', name: 'Widget', price: 10, stock: 5 }]);
  });
});
