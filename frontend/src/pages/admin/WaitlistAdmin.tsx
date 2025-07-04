import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface WaitlistedUser {
  id: string;
  email: string;
  waitlisted: boolean;
  createdAt: string;
  approved?: boolean;
}

const WaitlistAdmin = () => {
  const [users, setUsers] = useState<WaitlistedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth(); // Use our custom useAuth hook

  useEffect(() => {
    fetchWaitlistedUsers();
  }, []);

  const fetchWaitlistedUsers = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching waitlisted users...");

      // Get the session token from our auth context
      const token = await getToken();
      console.log("Auth token available:", !!token);

      // Include the token in your request
      const response = await fetch("/api/admin/waitlist", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response Status:", response.status);

      // Check for non-200 responses
      if (!response.ok) {
        console.error("API error:", response.status, response.statusText);
        // Try to get error details
        const errorData = await response.json().catch(() => ({}));
        console.error("Error details:", errorData);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Waitlist Data:", data);

      // Validate response format
      if (!data || !Array.isArray(data.users)) {
        console.error("Invalid API response format:", data);
        throw new Error("Invalid API response format");
      }

      console.log(`Found ${data.users.length} waitlisted users`);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch waitlisted users:", error);
      // Show error to user here
    } finally {
      setIsLoading(false);
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const token = await getToken();

      const response = await fetch("/api/admin/approve-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve user");
      }

      // Update the UI
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, approved: true } : user
        )
      );
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Management</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading waitlisted users...</div>
          ) : (
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No waitlisted users found.
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.approved ? (
                        <Badge variant="secondary">Approved</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      {!user.approved && (
                        <Button
                          size="sm"
                          onClick={() => approveUser(user.id)}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistAdmin;
