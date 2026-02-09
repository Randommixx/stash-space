import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from './store/store';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { VendorProtectedRoute } from './components/auth/VendorProtectedRoute';
import { RoleProtectedRoute, ModuleProtectedRoute } from './components/auth/RoleProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { CustomerLoginPage } from './pages/auth/CustomerLoginPage';
import { CustomerSignupPage } from './pages/auth/CustomerSignupPage';
import { VendorSignupPage } from './pages/auth/VendorSignupPage';
import VendorRoleSelectionPage from './pages/auth/VendorRoleSelectionPage';
import ProducerLoginPage from './pages/auth/ProducerLoginPage';
import CameraManLoginPage from './pages/auth/CameraManLoginPage';
import DriverLoginPage from './pages/auth/DriverLoginPage';
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
import ScenesImportPage from './pages/vendor/ScenesImportPage';
import CameraModulePage from './pages/vendor/modules/CameraModulePage';
import TransportModulePage from './pages/vendor/modules/TransportModulePage';
import CustomerRFQPage from './pages/customer/CustomerRFQPage';
import { LandingPage } from './pages/LandingPage';
import NotFound from "./pages/NotFound";

// Driver & Crew Dashboards
import DriverDashboard from './pages/driver/DriverDashboard';
import CrewDashboard from './pages/crew/CrewDashboard';

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
            <Route path="/vendor/login" element={<VendorRoleSelectionPage />} />
            <Route path="/vendor/driver/login" element={<DriverLoginPage />} />
            <Route path="/vendor/cameraman/login" element={<CameraManLoginPage />} />
            <Route path="/vendor/producer/login" element={<ProducerLoginPage />} />
            <Route path="/vendor/register" element={<VendorSignupPage />} />
            <Route path="/login" element={<Navigate to="/vendor/login" replace />} />

            {/* Customer Auth Routes */}
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/register" element={<CustomerSignupPage />} />
            <Route path="/customer/signup" element={<CustomerSignupPage />} />

            {/* Driver Dashboard & Routes */}
            <Route 
              path="/driver/dashboard" 
              element={
                <RoleProtectedRoute allowedRoles={['driver']}>
                  <DriverDashboard />
                </RoleProtectedRoute>
              } 
            />
            <Route 
              path="/driver/trips" 
              element={
                <RoleProtectedRoute allowedRoles={['driver', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="transport">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<TripLoggerPage />} />
            </Route>
            <Route 
              path="/driver/fuel" 
              element={
                <RoleProtectedRoute allowedRoles={['driver', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="transport">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<FuelEntryPage />} />
            </Route>
            <Route 
              path="/driver/geofence" 
              element={
                <RoleProtectedRoute allowedRoles={['driver', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="transport">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<GeofencePage />} />
            </Route>
            <Route 
              path="/driver/profile" 
              element={
                <RoleProtectedRoute allowedRoles={['driver']}>
                  <DashboardLayout />
                </RoleProtectedRoute>
              }
            >
              <Route index element={<VendorProfilePage />} />
            </Route>

            {/* Camera Crew Dashboard & Routes */}
            <Route 
              path="/crew/dashboard" 
              element={
                <RoleProtectedRoute allowedRoles={['camera_crew']}>
                  <CrewDashboard />
                </RoleProtectedRoute>
              } 
            />
            <Route 
              path="/crew/handover" 
              element={
                <RoleProtectedRoute allowedRoles={['camera_crew', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="camera">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<AssetHandoverPage />} />
            </Route>
            <Route 
              path="/crew/reports" 
              element={
                <RoleProtectedRoute allowedRoles={['camera_crew', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="camera">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<CameraReportsPage />} />
            </Route>
            <Route 
              path="/crew/expendables" 
              element={
                <RoleProtectedRoute allowedRoles={['camera_crew', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="camera">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<ExpendablesPage />} />
            </Route>
            <Route 
              path="/crew/rfq" 
              element={
                <RoleProtectedRoute allowedRoles={['camera_crew', 'producer', 'vendor', 'admin']}>
                  <ModuleProtectedRoute module="camera">
                    <DashboardLayout />
                  </ModuleProtectedRoute>
                </RoleProtectedRoute>
              }
            >
              <Route index element={<RFQPage />} />
            </Route>

            {/* Vendor Module Routes with vendorId validation */}
            <Route 
              path="/vendor/:vendorId/camera" 
              element={
                <VendorProtectedRoute validateVendorId>
                  <DashboardLayout />
                </VendorProtectedRoute>
              }
            >
              <Route index element={<CameraModulePage />} />
            </Route>
            <Route 
              path="/vendor/:vendorId/transport" 
              element={
                <VendorProtectedRoute validateVendorId>
                  <DashboardLayout />
                </VendorProtectedRoute>
              }
            >
              <Route index element={<TransportModulePage />} />
            </Route>

            {/* Producer/Vendor/Admin Protected Routes - Full Access */}
            <Route element={
              <RoleProtectedRoute allowedRoles={['producer', 'vendor', 'admin']}>
                <DashboardLayout />
              </RoleProtectedRoute>
            }>
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
              <Route path="/scenes-import" element={<ScenesImportPage />} />
              {/* Module B - Transport & Logistics */}
              <Route path="/trip-logger" element={<TripLoggerPage />} />
              <Route path="/fuel-entry" element={<FuelEntryPage />} />
              <Route path="/geofence" element={<GeofencePage />} />
              <Route path="/profile" element={<VendorProfilePage />} />
              <Route path="/settings" element={<VendorSettingsPage />} />
            </Route>

            {/* Customer Protected Routes */}
            <Route element={<ProtectedRoute requiredRole="customer"><CustomerLayout /></ProtectedRoute>}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/browse" element={<BrowseEquipment />} />
              <Route path="/customer/equipment/:id" element={<EquipmentDetails />} />
              <Route path="/customer/cart" element={<Cart />} />
              <Route path="/customer/bookings" element={<MyBookings />} />
              <Route path="/customer/favorites" element={<Favorites />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/rfq" element={<CustomerRFQPage />} />
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
