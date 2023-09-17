import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  className?: string;
  children?: ReactNode;
}
export const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props;

  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to="sign-in" replace />;
  }
  return children;
};
