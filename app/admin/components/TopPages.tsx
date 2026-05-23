interface PageData {
  path: string;
  views: number;
}

export default function TopPages({ data }: { data: PageData[] }) {
  return (
    <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
      <h3 className="text-foreground font-serif text-lg mb-4">
        Páginas Mais Vistas
      </h3>
      <div className="space-y-2">
        {data.map((page, i) => (
          <div
            key={page.path}
            className="flex justify-between items-center text-sm py-1.5 border-b border-gold/5 last:border-0"
          >
            <span className="text-nude-dark">
              <span className="text-gold/40 mr-2">{i + 1}.</span>
              {page.path === "/" ? "Página inicial" : page.path}
            </span>
            <span className="text-foreground">{page.views}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
