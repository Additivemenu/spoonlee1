import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createItem = async (newItem: {
  title: string;
  description: string;
}) => {
  const response = await axios.post(`${BASE_URL}/items`, newItem);
  return response;
};

export const fetchItemList = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response;
};

export const fetchItemById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/items/${id}`);
  return response;
};

export const deleteItem = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/items/${id}`);
  return response;
};

export const updateItem = async (
  id: string,
  newItem: { title: string; description: string }
) => {
  const response = await axios.put(`${BASE_URL}/items/${id}`, newItem);
  return response;
};
