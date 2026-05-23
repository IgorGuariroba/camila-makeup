interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
}

export default function MetricCard({ label, value, sublabel }: MetricCardProps) {
  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <p className="text-nude-dark text-xs uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-foreground text-3xl font-serif">{value}</p>
      {sublabel && (
        <p className="text-nude-dark/60 text-xs mt-1">{sublabel}</p>
      )}
    </div>
  );
}
