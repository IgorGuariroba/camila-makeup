interface DeviceData {
  device: string;
  sessions: number;
}

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
};

export default function DeviceBreakdown({ data }: { data: DeviceData[] }) {
  const total = data.reduce((sum, d) => sum + d.sessions, 0) || 1;

  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-4">Dispositivos</h3>
      <div className="space-y-3">
        {data.map((d) => {
          const pct = Math.round((d.sessions / total) * 100);
          return (
            <div key={d.device}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-nude-dark">
                  {DEVICE_LABELS[d.device] || d.device}
                </span>
                <span className="text-foreground">{pct}%</span>
              </div>
              <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
