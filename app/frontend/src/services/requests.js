import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-15-228-73-111.sa-east-1.compute.amazonaws.com:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
