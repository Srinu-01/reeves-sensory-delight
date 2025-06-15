
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  table: string;
  userId: string;
}

interface PreOrder {
  id: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'preparing' | 'completed' | 'cancelled';
  userId: string;
}

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?.uid) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile({
            name: userData.name || 'Guest User',
            email: currentUser.email || '',
            phone: userData.phone || '',
            joinDate: userData.createdAt?.toDate?.()?.toISOString() || currentUser.metadata.creationTime || new Date().toISOString()
          });
        } else {
          // Fallback if user document doesn't exist
          setUserProfile({
            name: currentUser.displayName || 'Guest User',
            email: currentUser.email || '',
            phone: '',
            joinDate: currentUser.metadata.creationTime || new Date().toISOString()
          });
        }

        // Fetch user bookings
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid),
          orderBy('date', 'desc')
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const userBookings = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(userBookings);

        // Fetch user pre-orders
        const preOrdersQuery = query(
          collection(db, 'preorders'),
          where('userId', '==', currentUser.uid),
          orderBy('date', 'desc')
        );
        const preOrdersSnapshot = await getDocs(preOrdersQuery);
        const userPreOrders = preOrdersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PreOrder[];
        setPreOrders(userPreOrders);

      } catch (error) {
        console.error('Error fetching user data:', error);
        // Set fallback data on error
        if (currentUser) {
          setUserProfile({
            name: currentUser.displayName || 'Guest User',
            email: currentUser.email || '',
            phone: '',
            joinDate: currentUser.metadata.creationTime || new Date().toISOString()
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return {
    userProfile,
    bookings,
    preOrders,
    loading
  };
};
