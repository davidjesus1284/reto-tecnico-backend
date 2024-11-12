import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string, headers?: Record<string, string>) {
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error en la solicitud:",
        error.response?.data || error.message
      );
      throw error;
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
}
