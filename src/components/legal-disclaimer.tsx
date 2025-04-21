
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LegalDisclaimerProps {
  minimal?: boolean;
  className?: string;
}

export function LegalDisclaimer({ minimal = false, className }: LegalDisclaimerProps) {
  return (
    <Alert 
      variant="default" 
      className={`bg-legal-yellow/20 border-legal-yellow ${className}`}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className={minimal ? "text-xs" : "text-sm"}>
        {minimal ? (
          "Not legal advice. For informational purposes only."
        ) : (
          "LegalPocket provides information for educational purposes only, not legal advice. Always consult with a qualified attorney for specific legal concerns."
        )}
      </AlertDescription>
    </Alert>
  )
}
