import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/api/products");
  return response.data.products;
};

export const getProduct = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data.product;
};
