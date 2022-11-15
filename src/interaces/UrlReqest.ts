import { ApiLimiter } from "../ApiLimiter";

export interface IApiLimiter {
  getInstance: () => ApiLimiter;
  makeRequest: (
    method: MethodRequest,
    data: any | null
  ) => Promise<ApiResponse>;
  setRateLimit: (url: string, rateLimit: number) => void;
}

export interface UrlRequest {
  actualCallUrl: number;
  urlCall: string;
  dateCall: Date;
  rateLimitForUrl: number;
}

export interface ApiResponse {
  data: any;
  status: number;
  error: string;
}

export interface OptionsRequest {
  method: string;
  headers?: Record<string, string>;
}

export type MethodRequest = "GET" | "POST" | "PATCH" | "DELETE";
