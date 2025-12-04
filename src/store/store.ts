import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import inventorySlice from './slices/inventorySlice';
import bookingsSlice from './slices/bookingsSlice';
import photoVerificationSlice from './slices/photoVerificationSlice';
import servicePersonnelSlice from './slices/servicePersonnelSlice';
import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    inventory: inventorySlice,
    bookings: bookingsSlice,
    photoVerification: photoVerificationSlice,
    servicePersonnel: servicePersonnelSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;