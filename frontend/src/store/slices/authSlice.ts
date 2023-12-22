import { createSlice } from '@reduxjs/toolkit';
import { AuthStateEnum } from '../../constants/enums/authStates';
import { type User } from '../../models/User';

export interface AuthState {
  status: AuthStateEnum;
  modalUnauthorizedStatus: boolean;
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  status: AuthStateEnum.notAuthenticated,
  modalUnauthorizedStatus: false,
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = AuthStateEnum.authenticated;
      state.user = payload.user;
      state.accessToken = payload.accessToken;
    },
    onLogout: (state) => {
      state.status = AuthStateEnum.notAuthenticated;
      state.accessToken = null;
      state.user = null;
      state.modalUnauthorizedStatus = false;
    },
    checkingCredentials: (state, { payload }) => {
      state.status = AuthStateEnum.checking;
      state.accessToken = payload;
    },
    showModalUnauthorized: (state) => {
      state.modalUnauthorizedStatus = true;
    },
    hideModalUnauthorized: (state) => {
      state.modalUnauthorizedStatus = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onLogin,
  onLogout,
  checkingCredentials,
  hideModalUnauthorized,
  showModalUnauthorized
} = authSlice.actions;