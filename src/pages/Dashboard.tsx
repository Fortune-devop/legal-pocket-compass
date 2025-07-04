import { UserDashboard } from "@/components/user-dashboard";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useAuth();

  // Log this to check auth status
  console.log("Auth status:", { isLoaded, isSignedIn, user });

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
