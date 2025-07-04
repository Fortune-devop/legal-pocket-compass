import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { BookOpen, FileText, Menu, User, X, Shield } from "lucide-react";
import { LegalPocketIcon } from "@/components/icons";
import { UserMenu } from "@/components/user-menu";
import { useUser } from "@/contexts/AuthContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setIsAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Left: Logo and Nav Links */}
        <div className="mr-4 hidden md:flex items-center flex-1">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <LegalPocketIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              LegalPocket
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {isLoaded && isSignedIn && (
              <>
                <Link
                  to="/chat"
                  className={`flex items-center gap-1.5 ${
                    isActive("/chat")
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors`}
                >
                  <BookOpen
                    size={16}
                    className={
                      isActive("/chat") ? "text-primary" : ""
                    }
                  />
                  <span>Chat</span>
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 ${
                    isActive("/dashboard")
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors`}
                >
                  <FileText
                    size={16}
                    className={
                      isActive("/dashboard") ? "text-primary" : ""
                    }
                  />
                  <span>Dashboard</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/waitlist"
                    className={`flex items-center gap-1.5 ${
                      isActive("/admin/waitlist")
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    } transition-colors`}
                  >
                    <Shield
                      size={16}
                      className={
                        isActive("/admin/waitlist") ? "text-primary" : ""
                      }
                    />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>

        {/* Right: Auth UI and ThemeSwitch */}
        <div className="hidden md:flex items-center space-x-2">
          {isLoaded && isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/waitlist">
                <Button
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <BookOpen size={16} />
                  <span>Join the Waitlist</span>
                </Button>
              </Link>
            </>
          )}
          <ThemeSwitch />
        </div>

        {/* Only show menu toggle in mobile */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 border-b border-border animate-fade-in bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-4">
            {/* For authenticated users */}
            {isLoaded && isSignedIn ? (
              <>
                <Link
                  to="/chat"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 py-2 ${
                    isActive("/chat")
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Chat</span>
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 py-2 ${
                    isActive("/dashboard")
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  <FileText size={18} />
                  <span>Dashboard</span>
                </Link>

                {/* Admin link for mobile */}
                {isAdmin && (
                  <Link
                    to="/admin/waitlist"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 py-2 ${
                      isActive("/admin/waitlist")
                        ? "text-primary font-medium"
                        : "text-foreground"
                    }`}
                  >
                    <Shield size={18} />
                    <span>Admin</span>
                  </Link>
                )}
                <UserMenu />
              </>
            ) : (
              <>
                {/* For non-authenticated users */}
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <User size={18} />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/waitlist" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start gap-2">
                    <BookOpen size={18} />
                    <span>Join the Waitlist</span>
                  </Button>
                </Link>
                <UserMenu />
              </>
            )}
            <ThemeSwitch />
          </nav>
        </div>
      )}
    </header>
  );
}
