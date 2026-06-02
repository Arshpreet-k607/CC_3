import { Router } from "express";
import {
  healthCheck,
  getAllProducts,
  getProductById,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";

import { validateRequest } from "../middleware/validateRequest";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/productValidation";

const router = Router();

router.get("/health", healthCheck);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.post(
  "/products",
  validateRequest(createProductSchema),
  createProductController
);

router.put(
  "/products/:id",
  validateRequest(updateProductSchema),
  updateProductController
);

router.delete("/products/:id", deleteProductController);

export default router;
