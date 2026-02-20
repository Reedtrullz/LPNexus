import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "default" | "surface" | "elevated" | "floating" | "interactive";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: GlassVariant;
}

export default function GlassCard({
  children,
  className = "",
  variant = "default",
}: GlassCardProps) {
  const variantClasses: Record<GlassVariant, string> = {
    default: "glass",
    surface: "glass-surface",
    elevated: "glass-elevated",
    floating: "glass-floating",
    interactive: "glass glass-interactive",
  };

  return (
    <div className={cn(variantClasses[variant], "rounded-3xl p-8", className)}>
      {children}
    </div>
  );
}
