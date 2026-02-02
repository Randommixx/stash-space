import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from './store/store';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { VendorSignupPage } from './pages/auth/VendorSignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryPage } from './pages/InventoryPage';
import { AddFilmGearPage } from './pages/AddFilmGearPage';
import { EditFilmGearPage } from './pages/EditFilmGearPage';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { BrowseEquipment } from './pages/customer/BrowseEquipment';
import { MyBookings } from './pages/customer/MyBookings';
import { Favorites } from './pages/customer/Favorites';
import { CustomerProfile } from './pages/customer/CustomerProfile';
import { Cart } from './pages/customer/Cart';
import { EquipmentDetails } from './pages/customer/EquipmentDetails';
import { VendorBookingsPage } from './pages/VendorBookingsPage';
import { ActiveRentalsPage } from './pages/vendor/ActiveRentalsPage';
import { VendorAnalyticsPage } from './pages/vendor/VendorAnalyticsPage';
import { VendorProfilePage } from './pages/vendor/VendorProfilePage';
import { VendorSettingsPage } from './pages/vendor/VendorSettingsPage';
import ServicePersonnelPage from './pages/vendor/ServicePersonnelPage';
import PhotoVerificationPage from './pages/vendor/PhotoVerificationPage';
import AssetHandoverPage from './pages/vendor/AssetHandoverPage';
import RFQPage from './pages/vendor/RFQPage';
import CameraReportsPage from './pages/vendor/CameraReportsPage';
import ExpendablesPage from './pages/vendor/ExpendablesPage';
import TripLoggerPage from './pages/vendor/TripLoggerPage';
import FuelEntryPage from './pages/vendor/FuelEntryPage';
import GeofencePage from './pages/vendor/GeofencePage';
import { LandingPage } from './pages/LandingPage';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Vendor Auth Routes */}
            <Route path="/vendor/login" element={<LoginPage />} />
            <Route path="/vendor/register" element={<VendorSignupPage />} />
            <Route path="/login" element={<Navigate to="/vendor/login" replace />} />

            {/* Customer Auth Routes */}
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/register" element={<CustomerSignupPage />} />
            <Route path="/customer/signup" element={<CustomerSignupPage />} />

            {/* Vendor Protected Routes */}
            <Route element={<ProtectedRoute requiredRole="vendor"><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/inventory/add" element={<AddFilmGearPage />} />
              <Route path="/inventory/edit/:id" element={<EditFilmGearPage />} />
              <Route path="/bookings" element={<VendorBookingsPage />} />
              <Route path="/orders" element={<ActiveRentalsPage />} />
              <Route path="/analytics" element={<VendorAnalyticsPage />} />
              <Route path="/service-personnel" element={<ServicePersonnelPage />} />
              <Route path="/photo-verification" element={<PhotoVerificationPage />} />
              {/* Module A - Camera Department */}
              <Route path="/asset-handover" element={<AssetHandoverPage />} />
              <Route path="/rfq" element={<RFQPage />} />
              <Route path="/camera-reports" element={<CameraReportsPage />} />
              <Route path="/expendables" element={<ExpendablesPage />} />
              {/* Module B - Transport & Logistics */}
              <Route path="/trip-logger" element={<TripLoggerPage />} />
              <Route path="/fuel-entry" element={<FuelEntryPage />} />
              <Route path="/geofence" element={<GeofencePage />} />
              <Route path="/profile" element={<VendorProfilePage />} />
              <Route path="/settings" element={<VendorSettingsPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="customer"><CustomerLayout /></ProtectedRoute>}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/browse" element={<BrowseEquipment />} />
              <Route path="/customer/equipment/:id" element={<EquipmentDetails />} />
              <Route path="/customer/cart" element={<Cart />} />
              <Route path="/customer/bookings" element={<MyBookings />} />
              <Route path="/customer/favorites" element={<Favorites />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
