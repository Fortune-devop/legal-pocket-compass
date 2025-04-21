
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignIn, SignUp } from "@clerk/clerk-react";

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
                <SignIn path="/login" routing="path" />
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
                <SignUp path="/login" routing="path" />
                <Alert variant="default" className="bg-legal-yellow/20 border-legal-yellow mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    By signing up, you acknowledge that LegalPocket provides information,
                    not legal advice. Always consult with a qualified attorney for specific
                    legal concerns.
                  </AlertDescription>
                </Alert>
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

