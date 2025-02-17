import api from "./api";

interface CreateBookingRequest {
  vehicleId: string;
  startDate: string;
  endDate: string;
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  priceADay: number;
  seats: number;
  power: number;
  fuelType: string;
  transmission: string;
  image: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const bookingService = {
  async createBooking(booking: CreateBookingRequest): Promise<Booking> {
    const { data } = await api.post<ApiResponse<Booking>>("/bookings", booking);
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },

  async getMyBookings(): Promise<Booking[]> {
    const { data } = await api.get<ApiResponse<Booking[]>>("/bookings/my");
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },

  // Admin metodları
  async getAllBookings(): Promise<Booking[]> {
    const { data } = await api.get<ApiResponse<Booking[]>>("/bookings");
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },

  async updateBookingStatus(
    id: string,
    status: "APPROVED" | "REJECTED" | "COMPLETED"
  ): Promise<Booking> {
    const { data } = await api.patch<ApiResponse<Booking>>(`/bookings/${id}`, {
      status,
    });
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },
};
