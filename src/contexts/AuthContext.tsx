
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if this is an admin email and create admin credentials if needed
      if (email === 'admin@reeves.com' && user?.uid) {
        try {
          const adminDocRef = doc(db, 'admin_credentials', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          
          if (!adminDoc.exists()) {
            await setDoc(adminDocRef, {
              uid: user.uid,
              email: user.email,
              role: 'admin',
              isAdmin: true,
              createdAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Error creating admin credentials:', error);
        }
      }
      
      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, phone: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      if (user?.uid) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name,
          email,
          phone,
          createdAt: new Date().toISOString()
        });
      }
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      toast.success('Logged out successfully!');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Logout failed');
    }
  };

  const checkAdminStatus = async (user: User) => {
    try {
      if (user.uid) {
        const adminDoc = await getDoc(doc(db, 'admin_credentials', user.uid));
        setIsAdmin(adminDoc.exists() && adminDoc.data()?.isAdmin === true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        checkAdminStatus(user);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
