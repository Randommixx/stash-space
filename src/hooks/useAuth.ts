import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout as logoutAction, loginStart, loginFailure } from '@/store/slices/authSlice';

// Mock user type for demo purposes
interface MockUser {
  uid: string;
  email: string;
  displayName: string;
}

export const useAuth = () => {
  const [loading] = useState(false);
  const [mockUser, setMockUser] = useState<MockUser | null>(null);
  const dispatch = useDispatch();

  // Mock email/password sign in - accepts any credentials
  const signInWithEmail = async (email: string, _password: string) => {
    dispatch(loginStart());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
    };
    
    setMockUser(user);
    return { user, error: null };
  };

  // Mock sign up - accepts any credentials
  const signUpWithEmail = async (email: string, _password: string) => {
    dispatch(loginStart());
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
    };
    
    setMockUser(user);
    return { user, error: null };
  };

  // Mock Google sign in
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: MockUser = {
      uid: `mock-google-${Date.now()}`,
      email: 'demo@gmail.com',
      displayName: 'Demo User',
    };
    
    setMockUser(user);
    return { user, error: null };
  };

  // Mock logout
  const logout = async () => {
    setMockUser(null);
    dispatch(logoutAction());
    return { error: null };
  };

  return {
    user: mockUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
  };
};
