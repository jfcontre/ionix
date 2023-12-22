import { AuthStateEnum } from '@/constants/enums/authStates';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode
  redirectTo?: string
}
const ProtectedRoute = ({ children, redirectTo = '/login' }: Props) => {
  const { checkCredentials, status } = useAuthStore();
  useEffect(() => {
    checkCredentials()
  }, [])

  return status === AuthStateEnum.authenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;