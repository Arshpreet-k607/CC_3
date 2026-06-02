import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} 
from "../repositories/firestoreRepository";
import { Product } from "../models/productModel";

const COLLECTION = "products";

export async function createProduct(data: any): Promise<Product> {
  const now = new Date();

  const productToCreate = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  return await createDocument<Product>(COLLECTION, productToCreate);
}

export async function getProducts(): Promise<Product[]> {
  return await getAllDocuments<Product>(COLLECTION);
}

export async function getProductByIdService(id: string): Promise<Product | null> {
  return await getDocumentById<Product>(COLLECTION, id);
}

export async function updateProductService(
  id: string,
  data: any
): Promise<Product | null> {
  const existing = await getDocumentById<Product>(COLLECTION, id);
  if (!existing) return null;

  const { sku, ...allowedUpdates } = data;

  const updatedData = {
    ...allowedUpdates,
    updatedAt: new Date(),
  };

  return await updateDocument<Product>(COLLECTION, id, updatedData);
}

export async function deleteProductService(id: string): Promise<boolean> {
  const existing = await getDocumentById<Product>(COLLECTION, id);
  if (!existing) return false;

  await deleteDocument(COLLECTION, id);
  return true;
}
