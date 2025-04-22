import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeSwitch } from "@/components/theme-switch"
import { BookOpen, FileText, Menu, User, X } from "lucide-react"
import { LegalPocketIcon } from "@/components/icons"
import { UserMenu } from "@/components/user-menu"
import { useUser } from "@clerk/clerk-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isSignedIn } = useUser()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <LegalPocketIcon className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl">LegalPocket</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/chat" 
            className={`flex items-center gap-1.5 ${isActive('/chat') 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground'} transition-colors`}
          >
            <BookOpen size={16} className={isActive('/chat') ? 'text-primary' : ''} />
            <span>Chat</span>
          </Link>
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-1.5 ${isActive('/dashboard') 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground'} transition-colors`}
          >
            <FileText size={16} className={isActive('/dashboard') ? 'text-primary' : ''} />
            <span>Dashboard</span>
          </Link>
          <div className="ml-2 h-6 w-px bg-border"></div>
          {isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <BookOpen size={16} />
                  <span>Get Started</span>
                </Button>
              </Link>
            </>
          )}
          <ThemeSwitch />
        </nav>

        <div className="flex md:hidden gap-2 items-center">
          <ThemeSwitch />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 border-b border-border animate-fade-in bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/chat" 
              onClick={() => setIsMenuOpen(false)} 
              className={`flex items-center gap-2 py-2 ${isActive('/chat') ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              <BookOpen size={18} />
              <span>Legal Chat</span>
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setIsMenuOpen(false)} 
              className={`flex items-center gap-2 py-2 ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              <FileText size={18} />
              <span>Dashboard</span>
            </Link>
            <div className="h-px w-full bg-border my-2"></div>
            {isSignedIn ? (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <User size={18} />
                  <span>Profile</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <User size={18} />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start gap-2">
                    <BookOpen size={18} />
                    <span>Get Started</span>
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
