import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Create a Clerk user
      const signUpAttempt = await signUp?.create({
        emailAddress: email,
        unsafeMetadata: {
          waitlisted: true,
          joinedWaitlistAt: new Date().toISOString(),
        },
      });

      if (!signUpAttempt?.id) {
        throw new Error("Failed to create user account");
      }

      // 2. Also store in our database
      const response = await fetch("/api/admin/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: signUpAttempt.id,
          email: email,
          fullName: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to waitlist database");
      }

      // 3. Prepare email verification
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage ||
          "Failed to join waitlist. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="font-heading text-2xl font-bold mt-2">
            Join the LegalPocket Waitlist
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Be the first to access our legal assistance platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Early Access</CardTitle>
            <CardDescription>
              Join our waitlist to get notified when we launch
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold text-primary mb-2">
                  Thanks for joining!
                </h3>
                <p className="text-muted-foreground">
                  We've added you to our waitlist. We'll notify you when we're
                  ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Join Waitlist"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              We'll never share your information with third parties.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Waitlist;
