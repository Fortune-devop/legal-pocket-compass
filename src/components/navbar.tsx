import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { BookOpen, FileText, Menu, User, X, Shield } from "lucide-react";
import { LegalPocketIcon } from "@/components/icons";
import { UserMenu } from "@/components/user-menu";
import { useUser } from "@clerk/clerk-react";

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
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <LegalPocketIcon className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl">LegalPocket</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Only show these links to authenticated users */}
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
                  className={isActive("/chat") ? "text-primary" : ""}
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
                  className={isActive("/dashboard") ? "text-primary" : ""}
                />
                <span>Dashboard</span>
              </Link>
              {/* Admin link - only for admin users */}
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
              <div className="ml-2 h-6 w-px bg-border"></div> {/* Separator */}
            </>
          )}

          {/* Authentication UI */}
          {isLoaded && isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              {/* For non-authenticated users, show sign in and waitlist */}
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
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden gap-2 items-center">
          {isLoaded && isSignedIn && <UserMenu />}
          <ThemeSwitch />
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
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
