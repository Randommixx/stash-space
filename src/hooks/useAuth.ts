import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loginSuccess, logout as logoutAction, loginStart, loginFailure } from '@/store/slices/authSlice';

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
      
      if (user) {
        // Defer Redux dispatch to avoid deadlock
        setTimeout(() => {
          dispatch(loginSuccess({
            id: user.uid,
            email: user.email || '',
            name: user.displayName || user.email?.split('@')[0] || 'User',
            role: 'vendor', // Default role, can be determined by user metadata
          }));
        }, 0);
      } else {
        dispatch(logoutAction());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const signInWithEmail = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      dispatch(loginFailure());
      return { user: null, error: error.message };
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      dispatch(loginFailure());
      return { user: null, error: error.message };
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { user: result.user, error: null };
    } catch (error: any) {
      dispatch(loginFailure());
      return { user: null, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  return {
    user: firebaseUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
  };
};
