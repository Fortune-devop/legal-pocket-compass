import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { AuthProvider, useUser } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import Waitlist from "./pages/Waitlist";
import WaitlistAdmin from "./pages/admin/WaitlistAdmin";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Check if user is waitlisted
  const isWaitlisted = user?.unsafeMetadata?.waitlisted === true;

  if (isWaitlisted) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>You're on our waitlist!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Thanks for your interest in LegalPocket. We'll notify you as soon
              as your account is approved.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isSignedIn ? children : <Navigate to="/login" replace />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/waitlist" element={<Waitlist />} />

          {/* Protected Routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/waitlist"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <WaitlistAdmin />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
