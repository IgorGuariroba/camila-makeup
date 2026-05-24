import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface DeviceData {
  device: string;
  sessions: number;
}

const DEVICE_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  desktop: { label: "Desktop", icon: <Monitor className="h-4 w-4" /> },
  mobile: { label: "Mobile", icon: <Smartphone className="h-4 w-4" /> },
  tablet: { label: "Tablet", icon: <Tablet className="h-4 w-4" /> },
};

export default function DeviceBreakdown({ data }: { data: DeviceData[] }) {
  const total = data.reduce((sum, d) => sum + d.sessions, 0) || 1;

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Dispositivos</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {data.map((d) => {
            const pct = Math.round((d.sessions / total) * 100);
            const config = DEVICE_CONFIG[d.device] || { label: d.device, icon: null };
            return (
              <div key={d.device}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2 text-card-foreground">
                    <span className="text-muted-foreground">{config.icon}</span>
                    <span className="font-medium">{config.label}</span>
                  </div>
                  <span className="text-card-foreground font-mono text-xs">{pct}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
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
