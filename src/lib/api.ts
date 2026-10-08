import type { Category, Product } from "@/types/product";

const API_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await getJson<Product[]>(`${API_BASE_URL}/products`);

  return Array.isArray(data) ? data : [];
}

export async function fetchProduct(slug: string): Promise<Product> {
  const products = await fetchProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await getJson<Category[]>(`${API_BASE_URL}/categories`);

  return Array.isArray(data) ? data : [];
}

export async function fetchCategory(categoryId: string): Promise<Product[]> {
  const data = await getJson<Product[]>(
    `${API_BASE_URL}/products?category=${categoryId}`,
  );

  return Array.isArray(data) ? data : [];
}

export async function fetchCategoryById(categoryId: string): Promise<Category> {
  return getJson<Category>(`${API_BASE_URL}/categories/${categoryId}`);
}
