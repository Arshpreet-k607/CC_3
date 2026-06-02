import { createProductSchema } from "../src/api/v1/validation/productValidation";

describe("Product Validation", () => {
  test("Valid product data should pass", () => {
    // Arrange
    const data = {
      name: "Laptop",
      sku: "ABC1234",
      quantity: 10,
      price: 999.99,
      category: "electronics",
    };

    // Act
    const { error } = createProductSchema.validate(data);

    // Assert
    expect(error).toBeUndefined();
  });
});
