import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';

export interface EvoAuthContextValue {
  user: User | null;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  loading: boolean;
  register: (email: string, password: string, displayName?: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerification: () => Promise<void>;
}

const EvoAuthContext = createContext<EvoAuthContextValue | undefined>(undefined);

export const EvoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.error('[EvoAuthProvider] Error observing auth state:', error);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error('[EvoAuthProvider] Auth listener error:', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName?: string): Promise<User> => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && displayName.trim()) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }
      try {
        await sendEmailVerification(cred.user);
      } catch (err) {
        console.warn('[EvoAuthProvider] Error sending verification email on register:', err);
      }
      return cred.user;
    },
    []
  );

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await signOut(auth);
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const sendVerification = useCallback(async (): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error('No hay ningún usuario autenticado para enviar la verificación.');
    }
    await sendEmailVerification(auth.currentUser);
  }, []);

  const value: EvoAuthContextValue = {
    user,
    uid: user ? user.uid : null,
    email: user ? user.email : null,
    displayName: user ? user.displayName : null,
    emailVerified: user ? user.emailVerified : false,
    loading,
    register,
    login,
    logout,
    resetPassword,
    sendVerification,
  };

  return <EvoAuthContext.Provider value={value}>{children}</EvoAuthContext.Provider>;
};

export const useEvoAuth = () => {
  const context = useContext(EvoAuthContext);
  if (!context) {
    throw new Error('useEvoAuth must be used within an EvoAuthProvider');
  }
  return context;
};
