import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  // Check if user has admin role in metadata
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
