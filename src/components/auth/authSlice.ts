import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface LoginPayload {
    username: string; 
    password: string; 
}

export interface AuthState {
    isLoggedIn: boolean; 
    logging: boolean; 
    currentUser?: User; 
}

const initialState: AuthState = {
    isLoggedIn: false, 
    logging: false, 
    currentUser: undefined,   

}

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    // Log in actions
    loginStart: (state, action: PayloadAction<LoginPayload>) => {
        state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
        state.isLoggedIn = true; 
        state.logging = false; 
        state.currentUser = action.payload; 
    },
    loginFailed: (state, action: PayloadAction<string>) => {
        state.logging = false; 
    },
    // Log out actions
    logoutStart: (state) => {
        state.isLoggedIn = false;
        state.currentUser = undefined; 
    },
  },
});

// Export acions
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
} = authSlice.actions;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;

// Selectors
export const dataStartLogin = (state: any) => state.auth.isLoggedIn; 
export const dataLoginSuccess = (state: any) => state.auth.logging; 
