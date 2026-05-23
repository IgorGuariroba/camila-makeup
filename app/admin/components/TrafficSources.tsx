interface Source {
  name: string;
  sessions: number;
}

export default function TrafficSources({ data }: { data: Source[] }) {
  const max = Math.max(...data.map((d) => d.sessions), 1);

  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-4">
        Origens do Tráfego
      </h3>
      <div className="space-y-3">
        {data.map((source) => (
          <div key={source.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-nude-dark">{source.name}</span>
              <span className="text-foreground">{source.sessions}</span>
            </div>
            <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gold/60 rounded-full transition-all"
                style={{ width: `${(source.sessions / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
