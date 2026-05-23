interface HourData {
  hour: number;
  sessions: number;
}

export default function PeakHours({ data }: { data: HourData[] }) {
  const max = Math.max(...data.map((d) => d.sessions), 1);

  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-4">
        Horários de Pico
      </h3>
      <div className="flex items-end gap-1 h-24">
        {data.map((h) => (
          <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-gold/40 rounded-t transition-all hover:bg-gold/60"
              style={{ height: `${(h.sessions / max) * 100}%`, minHeight: 2 }}
              title={`${h.hour}h: ${h.sessions} sessões`}
            />
            {h.hour % 6 === 0 && (
              <span className="text-nude-dark/50 text-[10px]">{h.hour}h</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
