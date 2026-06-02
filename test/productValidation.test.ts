import { productSchema, productUpdateSchema } from '../src/api/v1/validation/productValidation';

describe('Product validation', () => {
  it('accepts a valid product payload', () => {
    const { error } = productSchema.validate({
      name: 'Test Widget',
      price: 19.99,
      stock: 10,
    });

    expect(error).toBeUndefined();
  });

  it('rejects an invalid product payload', () => {
    const { error } = productSchema.validate({
      name: '',
      price: -5,
      stock: -1,
    });

    expect(error).toBeDefined();
  });

  it('accepts partial update payloads', () => {
    const { error } = productUpdateSchema.validate({
      price: 29.99,
    });

    expect(error).toBeUndefined();
  });
});
