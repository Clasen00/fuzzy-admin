import { apiClient } from "./baseApi";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthUser> => {
    const response = await apiClient.post<AuthUser>("/auth/login", data);
    return response.data;
  },

  getProfile: async (): Promise<AuthUser> => {
    const response = await apiClient.get<AuthUser>("/auth/me");
    return response.data;
  },
};
