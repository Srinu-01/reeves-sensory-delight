
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/AdminDashboard';
import AdminLogin from '@/components/AdminLogin';

const Admin = () => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser || !isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default Admin;
