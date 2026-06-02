import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productService";

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: "ok" });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await getProductByIdService(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProductController = async (req: Request, res: Response) => {
  const created = await createProduct(req.body);
  res.status(201).json(created);
};

export const updateProductController = async (req: Request, res: Response) => {
  const updated = await updateProductService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.json(updated);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const deleted = await deleteProductService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.status(204).send();
};
