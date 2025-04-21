
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="font-heading text-2xl font-bold mt-2">Welcome to LegalPocket</h1>
          <p className="text-muted-foreground text-center mt-1">
            Legal information made accessible
          </p>
        </div>

        <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder login form */}
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input className="w-full rounded border px-3 py-2" type="email" placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input className="w-full rounded border px-3 py-2" type="password" placeholder="••••••••" autoComplete="current-password" />
                  </div>
                  <Button className="w-full mt-2">Login</Button>
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

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information to create your LegalPocket account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder signup form */}
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input className="w-full rounded border px-3 py-2" type="email" placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input className="w-full rounded border px-3 py-2" type="password" placeholder="Create a password" autoComplete="new-password" />
                  </div>
                  <Button className="w-full mt-2">Sign Up</Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => handleTabChange("login")}
                  >
                    Login
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

