import api from "./api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const userService = {
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const { data: response } = await api.patch<ApiResponse<User>>(
      "/users/profile",
      data
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  },
};
