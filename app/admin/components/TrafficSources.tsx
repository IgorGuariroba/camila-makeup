import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface Source {
  name: string;
  sessions: number;
}

export default function TrafficSources({ data }: { data: Source[] }) {
  const max = Math.max(...data.map((d) => d.sessions), 1);
  const total = data.reduce((sum, d) => sum + d.sessions, 0);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Origens do Tráfego</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {data.map((source) => {
            const pct = total > 0 ? Math.round((source.sessions / total) * 100) : 0;
            return (
              <div key={source.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-card-foreground font-medium">{source.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">{pct}%</span>
                    <span className="text-card-foreground font-mono text-xs">{source.sessions}</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500"
                    style={{ width: `${(source.sessions / max) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
