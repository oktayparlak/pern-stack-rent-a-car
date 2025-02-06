import api from "./api";

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
    const { data } = await api.post<ApiResponse<AuthResponseData>>(
      "/auths/login",
      credentials
    );
    return data.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponseData> {
    const { data } = await api.post<ApiResponse<AuthResponseData>>(
      "/auths/register",
      credentials
    );
    return data.data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<ApiResponse<User>>("/auths/me");
    return data.data;
  },
};
