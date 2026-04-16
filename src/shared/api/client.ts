import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://k8s.mectest.ru/test-app',
});