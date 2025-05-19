// filepath: c:\Users\dfort\Pocket-Legal\frontend\src\pages\VerifyEmail.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp, useAuth, useUser } from "@clerk/clerk-react";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { user } = useUser();

  useEffect(() => {
    // Get the email from sessionStorage
    const email = sessionStorage.getItem("pendingVerificationEmail");
    if (email) setUserEmail(email);

    // Check if we have an active signUp - if not, redirect to signup
    if (!signUp?.status) {
      navigate("/");
    }
  }, []);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const attempt = await signUp?.attemptEmailAddressVerification({
        code,
      });

      if (attempt?.status === "complete") {
        // THIS IS THE IMPORTANT PART - Set the active session after verification
        if (attempt.createdSessionId) {
          // Handle session activation here if necessary
          console.log("Session activated with ID:", attempt.createdSessionId);
        }
        if (user?.unsafeMetadata?.waitlisted) {
          navigate("/waitlist-confirmation");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setError(null);
      alert("Verification code resent to your email");
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage ||
          "Failed to resend code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Enter the verification code sent to your email.
        </p>
        <form onSubmit={handleVerifyEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          onClick={handleResendCode}
          className="mt-2 w-full"
          disabled={isLoading}
        >
          Resend verification code
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
