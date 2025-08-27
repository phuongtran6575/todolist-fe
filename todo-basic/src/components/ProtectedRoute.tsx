import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (!token) {
    // nếu chưa login thì đá về trang login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;