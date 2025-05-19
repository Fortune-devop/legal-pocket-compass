import { useState, useEffect } from "react";
import { useClerk, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type WaitlistedUser = {
  id: string;
  email: string;
  name: string;
  joinedAt: string;
  approved: boolean;
};

const WaitlistAdmin = () => {
  const [users, setUsers] = useState<WaitlistedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth(); // Use Clerk's useAuth hook

  useEffect(() => {
    fetchWaitlistedUsers();
  }, []);

  const fetchWaitlistedUsers = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching waitlisted users...");

      // Get the session token from Clerk
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
            <div className="flex justify-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.approved ? (
                        <Badge variant="default">Approved</Badge>
                      ) : (
                        <Badge variant="secondary">Waiting</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {!user.approved && (
                        <Button size="sm" onClick={() => approveUser(user.id)}>
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No users in the waitlist
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistAdmin;
