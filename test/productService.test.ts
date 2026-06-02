import { createProduct, getProducts } from '../src/api/v1/services/productService';

jest.mock('../src/api/v1/repositories/firestoreRepository', () => ({
  createDocument: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 10, stock: 5 }),
  getAllDocuments: jest.fn().mockResolvedValue([{ id: '1', name: 'Widget', price: 10, stock: 5 }]),
  getDocumentById: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 10, stock: 5 }),
  updateDocument: jest.fn().mockResolvedValue({ id: '1', name: 'Widget', price: 15, stock: 5 }),
  deleteDocument: jest.fn().mockResolvedValue(true),
}));

describe('ProductService', () => {
  it('creates a new product', async () => {
    const product = await createProduct({ name: 'Widget', price: 10, stock: 5 });

    expect(product).toEqual({ id: '1', name: 'Widget', price: 10, stock: 5 });
  });

  it('retrieves all products', async () => {
    const products = await getProducts();

    expect(products).toEqual([{ id: '1', name: 'Widget', price: 10, stock: 5 }]);
  });
});
