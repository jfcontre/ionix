import { store } from "@/store";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type DefaultHeaders = {
  Accept: string;
  'Content-Type'?: string | undefined
  Authorization: string;
};


export async function apiFetch<T>(
  method: HttpMethod,
  url: string,
  body?: any,
  headers?: Record<string, string>,
  isFormData: boolean = false
): Promise<T> {
  const state = store.getState();
  const token: string = state.auth.accessToken ?? '';

  const defaultHeaders: DefaultHeaders = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const combinedHeaders = { ...defaultHeaders, ...headers };
  if (body) {
    if (isFormData) {
      const formData = new FormData();

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      body = formData;
    } else {
      combinedHeaders["Content-Type"] = 'application/json'
      body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    method,
    headers: combinedHeaders,
    body: body
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message);
  }

  const data = (await response.json()) as T;

  return data;
}