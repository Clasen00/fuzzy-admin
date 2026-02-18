import type { SessionState } from "./sessionSlice";

export const selectUser = (state: { session: SessionState }) => state.session.user;
export const selectIsAuthenticated = (state: { session: SessionState }) =>
  state.session.isAuthenticated;
export const selectSessionLoading = (state: { session: SessionState }) =>
  state.session.loading;
export const selectSessionError = (state: { session: SessionState }) =>
  state.session.error;
