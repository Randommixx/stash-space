import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Invoice {
  id: string;
  referenceNumber: string;
  bookingId: string;
  generatedAt: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface Booking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  invoice?: Invoice;
}

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  statusFilter: string;
}

const initialState: BookingsState = {
  bookings: [],
  isLoading: false,
  statusFilter: 'all',
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking['status']; invoice?: Invoice }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
        if (action.payload.invoice) {
          booking.invoice = action.payload.invoice;
        }
      }
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBookings, updateBookingStatus, setStatusFilter, setLoading } = bookingsSlice.actions;
export default bookingsSlice.reducer;