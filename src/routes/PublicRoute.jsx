import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>loading ...</div>;
  if (user) return <Navigate to="/admin" replace />;

  return children;
}
