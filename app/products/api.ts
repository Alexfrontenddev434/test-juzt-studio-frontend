import { fetchData } from '@/shared/api';

export async function getProducts(data: any = {}) {
  return fetchData('products', 'GET', null, {
    query: data,
  });
}

export async function getProductById(id: any) {
  return fetchData(`products/${id}`);
}

export async function createProduct(data: any) {
  return fetchData(`products/create`, 'POST', data);
}
