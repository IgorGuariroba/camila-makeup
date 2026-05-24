import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

interface NewVsReturningData {
  new: number;
  returning: number;
}

export default function NewVsReturning({ data }: { data: NewVsReturningData }) {
  const total = data.new + data.returning || 1;
  const newPct = Math.round((data.new / total) * 100);
  const retPct = Math.round((data.returning / total) * 100);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Novos vs Recorrentes</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Visitantes que voltam indicam interesse real
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-card-foreground font-medium">Novos</span>
              <span className="text-card-foreground font-mono text-xs">
                {data.new} <span className="text-muted-foreground">({newPct}%)</span>
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500"
                style={{ width: `${newPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-card-foreground font-medium">Recorrentes</span>
              <span className="text-card-foreground font-mono text-xs">
                {data.returning} <span className="text-muted-foreground">({retPct}%)</span>
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/80 rounded-full transition-all duration-500"
                style={{ width: `${retPct}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Taxa de retorno</span>
            <span className="font-mono">{retPct}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
