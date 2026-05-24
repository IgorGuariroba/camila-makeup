import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface PaidVsOrganicData {
  paid: number;
  organic: number;
}

export default function PaidVsOrganic({ data }: { data: PaidVsOrganicData }) {
  const total = data.paid + data.organic || 1;
  const paidPct = Math.round((data.paid / total) * 100);
  const organicPct = Math.round((data.organic / total) * 100);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Pago vs Orgânico</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Compare o retorno dos anúncios com tráfego natural
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-card-foreground font-medium">Anúncios</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">pago</Badge>
              </div>
              <span className="text-card-foreground font-mono text-xs">
                {data.paid} <span className="text-muted-foreground">({paidPct}%)</span>
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500/80 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${paidPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-card-foreground font-medium">Orgânico</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">grátis</Badge>
              </div>
              <span className="text-card-foreground font-mono text-xs">
                {data.organic} <span className="text-muted-foreground">({organicPct}%)</span>
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-500"
                style={{ width: `${organicPct}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Total de sessões</span>
            <span className="font-mono">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
