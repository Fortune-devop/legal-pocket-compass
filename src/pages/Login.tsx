import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSignIn, useSignUp } from "@clerk/clerk-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();

  const validateForm = (isSignup: boolean) => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      setError(
        "Password must contain 1 uppercase letter and 1 special character"
      );
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const signInAttempt = await signIn?.create({
        identifier: email,
        password,
      });

      if (signInAttempt?.status === "complete") {
        await setActiveSignIn?.({ session: signInAttempt.createdSessionId });

        if ((signInAttempt.userData as any)?.unsafeMetadata?.waitlisted) {
          navigate("/waitlist-confirmation");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      const signUpAttempt = await signUp?.create({
        emailAddress: email,
        password,
      });

      if (signUpAttempt?.status === "complete") {
        await setActiveSignUp?.({ session: signUpAttempt.createdSessionId });
        navigate("/dashboard");
      } else {
        // Prepare verification before navigating
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Store email in sessionStorage to help user experience
        sessionStorage.setItem("pendingVerificationEmail", email);

        navigate("/verify-email");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="font-heading text-2xl font-bold mt-2">
            Welcome to LegalPocket
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Legal information made accessible
          </p>
        </div>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => handleTabChange("signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up Currently Limited</CardTitle>
                <CardDescription>
                  We're currently accepting new users through our waitlist
                  program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    LegalPocket is currently in private beta. Please join our
                    waitlist to get early access when spots become available.
                  </p>
                  <Button
                    onClick={() => navigate("/waitlist")}
                    className="w-full"
                  >
                    Join Our Waitlist
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  Are you an existing user?
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleTabChange("login")}
                  className="w-full"
                >
                  Login Instead
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
