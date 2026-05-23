interface CityData {
  city: string;
  sessions: number;
}

export default function CityList({ data }: { data: CityData[] }) {
  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-4">Top Cidades</h3>
      <div className="space-y-2">
        {data.map((city, i) => (
          <div
            key={city.city}
            className="flex justify-between items-center text-sm py-1.5 border-b border-gold/5 last:border-0"
          >
            <span className="text-nude-dark">
              <span className="text-gold/40 mr-2">{i + 1}.</span>
              {city.city || "Desconhecida"}
            </span>
            <span className="text-foreground">{city.sessions}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
