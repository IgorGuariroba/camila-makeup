interface NewVsReturningData {
  new: number;
  returning: number;
}

export default function NewVsReturning({ data }: { data: NewVsReturningData }) {
  const total = data.new + data.returning || 1;
  const newPct = Math.round((data.new / total) * 100);
  const retPct = Math.round((data.returning / total) * 100);

  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-2">
        Novos vs Recorrentes
      </h3>
      <p className="text-nude-dark/60 text-xs mb-4">
        Pessoas que voltam ao site indicam interesse real
      </p>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-nude-dark">Novos visitantes</span>
            <span className="text-foreground">
              {data.new} ({newPct}%)
            </span>
          </div>
          <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gold/60 rounded-full"
              style={{ width: `${newPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-nude-dark">Visitantes recorrentes</span>
            <span className="text-foreground">
              {data.returning} ({retPct}%)
            </span>
          </div>
          <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gold/40 rounded-full"
              style={{ width: `${retPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
