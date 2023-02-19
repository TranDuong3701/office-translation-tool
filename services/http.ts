import type { AxiosInstance, Method, ResponseType } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'
const apiBaseUrl = 'http://localhost:8000'

class Http {
  client: AxiosInstance

  private static setProgressBar() {
    NProgress.start()
  }

  private static hideProgressBar() {
    NProgress.done(true)
  }

  public request<T>(
    method: Method,
    url: string,
    data: Record<string, any> = {},
    responseType?: ResponseType,
  ) {
    return this.client.request({
      url,
      method,
      data,
      responseType,
    }) as Promise<{ data: T }>
  }

  public async get<T>(url: string, responseType?: ResponseType) {
    return (await this.request<T>('get', url, {}, responseType)).data as T
  }

  public async post<T>(
    url: string,
    data: Record<string, any>,
  ) {
    return (await this.request<T>('post', url, data)).data as T
  }

  public async put<T>(url: string, data: Record<string, any>) {
    return (await this.request<T>('put', url, data)).data
  }

  public async patch<T>(url: string, data: Record<string, any>) {
    return (await this.request<T>('patch', url, data)).data
  }

  public async delete<T>(url: string, data: Record<string, any> = {}) {
    return (await this.request<T>('delete', url, data)).data
  }

  constructor() {
    this.client = axios.create({
      baseURL: apiBaseUrl,
    })

    // Intercept the request to make sure the token is injected into the header.
    this.client.interceptors.request.use((config) => {
      Http.setProgressBar()
      return config
    })

    // Intercept the response and…
    this.client.interceptors.response.use((response) => {
      Http.hideProgressBar()

      return response
    }, (error) => {
      Http.hideProgressBar()

      return Promise.reject(error)
    })
  }
}

export const http = new Http()
