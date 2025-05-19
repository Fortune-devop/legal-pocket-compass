import { UserDashboard } from "@/components/user-dashboard";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();

  // Log this to check auth status
  console.log("Auth status:", { isLoaded, isSignedIn, userId });

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
