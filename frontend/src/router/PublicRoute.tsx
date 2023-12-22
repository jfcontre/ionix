import { AuthStateEnum } from '@/constants/enums/authStates';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode
  redirectTo?: string
}
const PublicRoute = ({ children, redirectTo = '/' }: Props) => {
  const { checkCredentials, status } = useAuthStore();
  useEffect(() => {
    checkCredentials()
  }, [])

  return status === AuthStateEnum.notAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PublicRoute;