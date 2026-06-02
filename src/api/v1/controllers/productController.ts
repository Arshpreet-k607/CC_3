import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';
import { HTTP_STATUS } from '../../../constants/httpConstants';

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(HTTP_STATUS.CREATED).json(product);
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getProducts();
    return res.status(HTTP_STATUS.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Product not found' });
    }
    return res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    return next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Product not found' });
    }
    return res.status(HTTP_STATUS.OK).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Product not found' });
    }
    return res.status(HTTP_STATUS.OK).json({ message: 'Product deleted' });
  } catch (error) {
    return next(error);
  }
};
