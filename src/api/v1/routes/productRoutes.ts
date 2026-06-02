import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import validateRequest from '../middleware/validateRequest';
import { productSchema, productUpdateSchema } from '../validation/productValidation';

const router = express.Router();
router.post('/', validateRequest(productSchema), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', validateRequest(productUpdateSchema, true), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
