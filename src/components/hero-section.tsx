
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { JurisdictionSelector } from "@/components/jurisdiction-selector";
import { AlertCircle, BookOpen, Scale } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function HeroSection() {
  const [jurisdiction, setJurisdiction] = useState("federal");

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(120,90,220,0.12),transparent_40%)]"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-primary/5 md:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <Scale className="h-4 w-4" />
              <span>Legal guidance made simple</span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Legal assistance that's{" "}
              <span className="bg-gradient-to-r from-primary to-legal-light bg-clip-text text-transparent">
                accessible to everyone
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Get straightforward answers to legal questions without the intimidating jargon or high costs.
            </p>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <JurisdictionSelector 
                onSelect={(value) => setJurisdiction(value)} 
                className="w-full sm:w-auto"
              />
              <Link to={`/chat?jurisdiction=${jurisdiction}`}>
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <BookOpen className="h-5 w-5" />
                  Start Legal Chat
                </Button>
              </Link>
            </div>
            
            <Alert variant="default" className="bg-legal-yellow/20 border-legal-yellow mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                LegalPocket provides information, not legal advice. Always consult with a qualified attorney for specific legal concerns.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="relative rounded-xl border bg-card p-4 shadow-lg">
              <div className="flex flex-col gap-6 px-2 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold leading-none">Friendly Legal Guidance</h3>
                    <p className="text-sm text-muted-foreground">Without the complexities</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="chat-bubble-user">
                    <p>Can a landlord enter my apartment without permission?</p>
                  </div>
                  <div className="chat-bubble-ai">
                    <p>
                      Generally, landlords need to provide notice before entering your apartment, except in emergencies. 
                      <span className="block mt-2 italic text-sm text-muted-foreground">
                        Based on <span className="legal-citation">Tenant Rights Act §42</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-xs">Continue reading</Button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-legal-blue/30 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-legal-pink/30 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
