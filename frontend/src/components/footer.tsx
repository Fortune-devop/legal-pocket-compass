
import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-muted/40 border-t border-border py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg">LegalPocket</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Making legal information accessible and less intimidating.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-semibold text-sm">Services</h3>
            <Link to="/chat" className="text-muted-foreground hover:text-foreground text-sm">
              Legal Chat
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
              Document Templates
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
              Legal Guides
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-semibold text-sm">Company</h3>
            <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">
              About Us
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground text-sm">
              Pricing
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">
              Contact
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-semibold text-sm">Legal</h3>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy Policy
            </Link>
            <div className="text-muted-foreground text-sm">
              <span className="text-xs block mt-2">
                Not legal advice. For informational purposes only.
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LegalPocket. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
