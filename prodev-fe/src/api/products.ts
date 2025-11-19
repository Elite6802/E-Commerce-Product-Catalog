import api from "./api";
import type { Product } from "../types/types";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const res = await api.get<Product[]>(`/products/category/${category}`);
  return res.data;
};

export const fetchProductDetails = async (
  id: number
): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/products/categories");
  return res.data;
};
