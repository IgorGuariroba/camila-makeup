import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export default function MetricCard({ label, value, sublabel, trend, icon }: MetricCardProps) {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/20 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            {label}
          </p>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="flex items-end gap-2">
          <p className="text-card-foreground text-3xl font-serif font-semibold tracking-tight">
            {value}
          </p>
          {trend && (
            <span className="mb-1">
              {trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-400" />}
              {trend === "down" && <TrendingDown className="h-4 w-4 text-red-400" />}
              {trend === "neutral" && <Minus className="h-4 w-4 text-muted-foreground" />}
            </span>
          )}
        </div>
        {sublabel && (
          <p className="text-muted-foreground/70 text-xs mt-1.5">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  );
}
