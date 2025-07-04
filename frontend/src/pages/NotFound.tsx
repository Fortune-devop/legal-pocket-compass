import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileQuestion, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <FileQuestion className="h-24 w-24 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We couldn't find the legal information you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="outline" className="w-full sm:w-auto">
              Start Legal Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
