
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AccessibleFormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  description?: string;
  required?: boolean;
  className?: string;
}

export function AccessibleFormField({
  id,
  label,
  children,
  description,
  required = false,
  className,
}: AccessibleFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id} 
        className="flex items-center gap-1"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {description && (
        <p id={`${id}-description`} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
