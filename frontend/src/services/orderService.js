import api from "./api";

export const placeOrder = async (payload) => {
  const response = await api.post("/api/orders", payload);
  return response.data.order;
};

export const getUserOrders = async () => {
  const response = await api.get("/api/orders/user/orders");
  return response.data.orders;
};

export const getOrder = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data.order;
};
