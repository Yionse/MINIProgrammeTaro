import axios from "taro-axios";

const instance = axios.create({
  baseURL: "http://localhost:8088",
  timeout: 5000,
  headers: {},
});

instance.interceptors.request.use(
  (value) => value,
  (error) => error
);

instance.interceptors.response.use(
  (value) => value?.data,
  (error) => error
);

export const get = <T>(url: string, data?: any): T => {
  return instance.get<T>(url, { params: data }) as T;
};

export const post = <T>(url: string, data?: any): T => {
  return instance.post<T>(url, data) as T;
};
