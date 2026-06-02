import { FirestoreRepository } from '../repositories/firestoreRepository';
import { Product } from '../models/productModel';

export class ProductService {
  private repository = new FirestoreRepository<Product>('products');

  async createProduct(product: Product) {
    return this.repository.create(product);
  }

  async getProducts() {
    return this.repository.findAll();
  }

  async getProductById(id: string) {
    return this.repository.findById(id);
  }

  async updateProduct(id: string, product: Partial<Product>) {
    return this.repository.update(id, product);
  }

  async deleteProduct(id: string) {
    return this.repository.delete(id);
  }
}
