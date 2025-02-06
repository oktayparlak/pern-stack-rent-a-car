import api from "./api";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthResponseData {
  accessToken: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponseData> {
    try {
      const { data } = await api.post<ApiResponse<AuthResponseData>>(
        "/auths/login",
        credentials
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponseData> {
    try {
      const { data } = await api.post<ApiResponse<AuthResponseData>>(
        "/auths/register",
        credentials
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const { data } = await api.get<ApiResponse<User>>("/auths/me");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },
};
