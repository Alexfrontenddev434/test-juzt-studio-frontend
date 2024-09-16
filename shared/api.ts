/* import axios from 'axios'; */
import { isDevMode } from './helpers';

const baseURL = isDevMode ? 'http://localhost:3005/api' : 'https://test-juzt-studio-backend.vercel.app/api';
//const baseURL = 'http://localhost:3005/api';

/* const apiClient = axios.create({
  baseURL,
  timeout: 50_000,
  headers: {
    ContentType: 'application/json',
  },
}); */

export const fetchData = async (endpoint: string, method = 'GET', data = null, options: any = {}) => {
  try {
    const getQueryParams = () => {
      return options.query ? '?' + new URLSearchParams(options.query) : '';
    };

    const query = baseURL + '/' + endpoint + getQueryParams();

    const response: any = {};
    response.data = await (
      await fetch(`${query}`, {
        method,
        body: data ? JSON.stringify(data) : null,
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    return response;
  } catch (error: any) {
    throw error.message;
  }
};
