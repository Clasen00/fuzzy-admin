import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

import { selectIsAuthenticated, selectSessionLoading } from "@/entities/session";

import { ROUTES } from "@/shared/config";
import { Spinner } from "@/shared/ui";

interface AuthGuardProps {
  redirectTo?: string;
}

export function AuthGuard({ redirectTo = ROUTES.HOME }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectSessionLoading);

  if (loading) {
    return <Spinner fullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
