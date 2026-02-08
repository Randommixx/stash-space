import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { RootState } from '@/store/store';

interface VendorProtectedRouteProps {
  children: React.ReactNode;
  validateVendorId?: boolean;
}

/**
 * Enhanced protected route for vendor module pages
 * - Validates authentication
 * - Ensures user role is 'vendor'
 * - Optionally validates vendorId from route params matches authenticated user
 */
export const VendorProtectedRoute: React.FC<VendorProtectedRouteProps> = ({ 
  children, 
  validateVendorId = false 
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { vendorId } = useParams<{ vendorId: string }>();

  // Check authentication
  if (!isAuthenticated || !user) {
    return <Navigate to="/vendor/login" replace />;
  }

  // Check role
  if (user.role !== 'vendor') {
    // Redirect based on user role
    if (user.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else if (user.role === 'driver') {
      return <Navigate to="/driver/dashboard" replace />;
    } else if (user.role === 'camera_crew') {
      return <Navigate to="/crew/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Validate vendorId from route params matches authenticated user
  if (validateVendorId && vendorId && vendorId !== user.id) {
    // Attempting to access another vendor's data - redirect to own module
    return <Navigate to="/vendor/login" replace />;
  }

  return <>{children}</>;
};
