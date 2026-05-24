interface PaidVsOrganicData {
  paid: number;
  organic: number;
}

export default function PaidVsOrganic({ data }: { data: PaidVsOrganicData }) {
  const total = data.paid + data.organic || 1;
  const paidPct = Math.round((data.paid / total) * 100);
  const organicPct = Math.round((data.organic / total) * 100);

  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-2">
        Pago vs Orgânico
      </h3>
      <p className="text-nude-dark/60 text-xs mb-4">
        Compare o retorno dos anúncios com o tráfego natural
      </p>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-nude-dark">Anúncios (pago)</span>
            <span className="text-foreground">
              {data.paid} ({paidPct}%)
            </span>
          </div>
          <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500/70 rounded-full"
              style={{ width: `${paidPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-nude-dark">Orgânico (grátis)</span>
            <span className="text-foreground">
              {data.organic} ({organicPct}%)
            </span>
          </div>
          <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gold/60 rounded-full"
              style={{ width: `${organicPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
