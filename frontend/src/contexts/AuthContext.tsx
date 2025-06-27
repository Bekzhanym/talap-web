import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification as firebaseSendEmailVerification,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase';
import type { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert Firebase user to our User type
  const convertFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    displayName: firebaseUser.displayName,
  });

  // Save token to localStorage
  const saveToken = async (firebaseUser: FirebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  // Remove token from localStorage
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await firebaseSendEmailVerification(userCredential.user);
      await saveToken(userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveToken(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      removeToken();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Send email verification
  const sendEmailVerification = async () => {
    if (!auth.currentUser) {
      throw new Error('No user logged in');
    }
    try {
      await firebaseSendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error('Error sending email verification:', error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = convertFirebaseUser(firebaseUser);
        setUser(userData);
        await saveToken(firebaseUser);
      } else {
        setUser(null);
        removeToken();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendEmailVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 