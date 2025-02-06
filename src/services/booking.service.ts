import api from "./api";

interface CreateBookingRequest {
  vehicleId: string;
  startDate: string;
  endDate: string;
}

interface Booking {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  Vehicle?: {
    brand: string;
    model: string;
    image: string;
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
};
