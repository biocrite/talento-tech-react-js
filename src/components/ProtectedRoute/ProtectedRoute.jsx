
import { Navigate } from "react-router-dom";
import { useAuth } from "@context";

export function ProtectedRoute({ children }) {
  const { user, isAdmin, authLoading } = useAuth();

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
