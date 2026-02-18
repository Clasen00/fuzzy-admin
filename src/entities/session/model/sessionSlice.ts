import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { AuthUser, LoginRequest } from "@/shared/api";
import { authApi } from "@/shared/api";

export interface SessionState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const TOKEN_KEY = "accessToken";
const REMEMBER_KEY = "rememberMe";

function getStorage(): Storage {
  const remember = localStorage.getItem(REMEMBER_KEY) === "true";
  return remember ? localStorage : sessionStorage;
}

function getSavedToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

function saveToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_KEY, "true");
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export const login = createAsyncThunk(
  "session/login",
  async (
    { credentials, remember }: { credentials: LoginRequest; remember: boolean },
    { rejectWithValue },
  ) => {
    try {
      const user = await authApi.login(credentials);
      saveToken(user.accessToken, remember);
      return user;
    } catch (error: any) {
      const message = error.response?.data?.message ?? "Неверный логин или пароль";
      return rejectWithValue(message);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "session/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = getSavedToken();
    if (!token) return rejectWithValue("Нет токена");

    try {
      const user = await authApi.getProfile();
      return user;
    } catch {
      clearToken();
      return rejectWithValue("Сессия истекла");
    }
  },
);

const initialState: SessionState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      clearToken();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
