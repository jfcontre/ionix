import { useDispatch, useSelector } from 'react-redux';
import {
  onLogin,
  onLogout,
  type RootState,
} from '../store';
import { TokenDecode, type User, } from '../models/User';
import { AuthService } from '@/services/AuthService';
import { localStorageEnum } from '@/constants/enums/localStorage';
import { AuthStateEnum } from '@/constants/enums/authStates';
import { getDataLocalStorage, persistDataLocalStorage } from '@/utils/localStorage';
import { NotificationService } from '@/services/NotificationService';
import { jwtDecode } from "jwt-decode";
import { LoginFormInput } from '@/models/Login';

interface _useAuthStore {
  status: AuthStateEnum;
  modalUnauthorizedStatus: boolean;
  user: User | null;
  login: (data: LoginFormInput) => Promise<boolean>;
  logout: () => void;
  checkCredentials: () => Promise<boolean>;
}

export const useAuthStore = (): _useAuthStore => {
  const { status, user, modalUnauthorizedStatus } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const login = async (data: LoginFormInput): Promise<boolean> => {
    try {
      const res = await AuthService.login(data)
      persistDataLocalStorage({
        data: res.accessToken,
        entity: localStorageEnum.token,
        shouldEncrypt: false
      });

      dispatch(onLogin(res));

      return true;
    } catch (error) {

      if (error instanceof Error) {
        NotificationService.error(error.message)
      } else {
        NotificationService.error("Error in the server")
      }
    }

    dispatch(onLogout());
    return false;
  };

  const logout = (): void => {
    localStorage.removeItem(localStorageEnum.token);
    dispatch(onLogout());
  };

  const checkCredentials = async (): Promise<boolean> => {
    const token: string | null = getDataLocalStorage(localStorageEnum.token);

    if (token === null) {
      logout();
      return false;
    }

    const decoded: TokenDecode = jwtDecode(token);
    try {

      const data = {
        accessToken: token,
        user: decoded.user,
      }
      dispatch(onLogin(data));
      return true
    } catch (e) {
      console.log(e)
    }
    logout();
    return false;
  };

  return {
    //* properties
    status,
    modalUnauthorizedStatus,
    user,
    //* methods
    login,
    logout,
    checkCredentials,
  };
};