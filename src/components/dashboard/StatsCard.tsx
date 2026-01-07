import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type Variant = "default" | "primary" | "success" | "warning" | "destructive";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactElement;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-card border-border",
  primary: "bg-primary/5 border-primary/20",
  success: "bg-success/5 border-success/20",
  warning: "bg-warning/5 border-warning/20",
  destructive: "bg-destructive/5 border-destructive/20",
};

const iconStyles: Record<Variant, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = "default",
}: StatsCardProps) {
  const resolvedVariant: Variant = variant;

  const isPositive = typeof change === "number" && change > 0;
  const isNegative = typeof change === "number" && change < 0;

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        variantStyles[resolvedVariant]
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="text-3xl font-bold text-foreground">{value}</p>

          {typeof change === "number" && (
            <div className="flex items-center gap-1.5">
              {isPositive && (
                <div className="flex items-center gap-1 text-success text-sm">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{change}%</span>
                </div>
              )}

              {isNegative && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{change}%</span>
                </div>
              )}

              {changeLabel && (
                <span className="text-xs text-muted-foreground">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${iconStyles[resolvedVariant]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
