import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { Spin } from 'antd';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight:'60vh', display:'grid', placeItems:'center' }}><Spin /></div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}
