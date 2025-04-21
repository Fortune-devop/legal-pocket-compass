
import { cn } from "@/lib/utils";

interface ThinkingDotsProps {
  className?: string;
}

export function ThinkingDots({ className }: ThinkingDotsProps) {
  return (
    <div className={cn("thinking-dots", className)}>
      <span className="animate-pulse"></span>
      <span className="animate-pulse delay-150"></span>
      <span className="animate-pulse delay-300"></span>
    </div>
  );
}
