import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Scale, Shield } from "lucide-react";

const Index = () => {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight md:text-4xl">
              Legal assistance shouldn't be intimidating
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl">
              LegalPocket makes legal information accessible with a friendly
              approach that avoids complex jargon and overwhelming detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Plain Language
              </h3>
              <p className="text-muted-foreground">
                Get legal information explained in simple, everyday language
                that's easy to understand.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Reliable Information
              </h3>
              <p className="text-muted-foreground">
                All information is sourced from credible legal resources with
                clear citations to relevant laws.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Jurisdiction Aware
              </h3>
              <p className="text-muted-foreground">
                Get information specific to your location, as laws vary across
                different states and countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight md:text-4xl">
              How LegalPocket Works
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl">
              A simple process designed to get you the information you need
              without the complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-legal-green flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">1</span>
                <div className="absolute h-full w-full rounded-full border-2 border-legal-green animate-pulse"></div>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Select Your Jurisdiction
              </h3>
              <p className="text-muted-foreground">
                Choose your location to get information relevant to the laws in
                your area.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-legal-blue flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">2</span>
                <div className="absolute h-full w-full rounded-full border-2 border-legal-blue animate-pulse"></div>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Ask Your Question
              </h3>
              <p className="text-muted-foreground">
                Type your legal question in plain language – no need for legal
                terminology.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-legal-pink flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">3</span>
                <div className="absolute h-full w-full rounded-full border-2 border-legal-pink animate-pulse"></div>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Get Clear Answers
              </h3>
              <p className="text-muted-foreground">
                Receive information with references to relevant laws, explained
                in straightforward language.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/waitlist">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Join Our Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold font-heading tracking-tight md:text-4xl">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#9b87f5"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "LegalPocket helped me understand my options during my lease
                dispute. The plain language explanations made a stressful
                situation much easier to navigate."
              </p>
              <div className="font-medium">Sarah T.</div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#9b87f5"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "The jurisdiction feature is amazing. I got information specific
                to my state's laws, which was crucial for my small business
                questions."
              </p>
              <div className="font-medium">Michael R.</div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#9b87f5"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I appreciated how LegalPocket was clear about when I should
                consult an attorney while still giving me helpful information to
                prepare."
              </p>
              <div className="font-medium">Lisa K.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-xl bg-primary/5 border border-primary/10 overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold font-heading tracking-tight md:text-4xl mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mb-8">
                Begin your legal journey with clear, accessible information
                tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/waitlist">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <BookOpen className="h-5 w-5" />
                    Join Our Waitlist
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto"
                  >
                    <FileText className="h-5 w-5" />
                    Browse Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
