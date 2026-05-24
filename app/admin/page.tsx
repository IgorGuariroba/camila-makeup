import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getVisitorCounts,
  getTrafficSources,
  getDeviceBreakdown,
  getAvgSessionDuration,
  getNewVsReturning,
  getPaidVsOrganic,
} from "@/lib/ga4";
import { getLeadCount } from "@/lib/sheets";
import MetricCard from "./components/MetricCard";
import TrafficSources from "./components/TrafficSources";
import DeviceBreakdown from "./components/DeviceBreakdown";
import NewVsReturning from "./components/NewVsReturning";
import PaidVsOrganic from "./components/PaidVsOrganic";
import SignOutButton from "./components/SignOutButton";

export const revalidate = 300;

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  let visitors,
    sources,
    devices,
    avgDuration,
    newVsReturning,
    paidVsOrganic,
    leadCount;

  try {
    [visitors, sources, devices, avgDuration, newVsReturning, paidVsOrganic, leadCount] =
      await Promise.all([
        getVisitorCounts(),
        getTrafficSources(),
        getDeviceBreakdown(),
        getAvgSessionDuration(),
        getNewVsReturning(),
        getPaidVsOrganic(),
        getLeadCount(),
      ]);
  } catch {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-2xl text-foreground">Dashboard</h1>
          <SignOutButton />
        </div>
        <div className="bg-[#141210] border border-red-500/20 rounded-xl p-8 text-center">
          <p className="text-red-400 mb-2">Erro ao carregar métricas</p>
          <p className="text-nude-dark text-sm">
            Verifique as configurações do Google Cloud ou faça login novamente.
          </p>
        </div>
      </div>
    );
  }

  const totalVisitors30d = visitors.find((v) => v.label === "30 dias")?.value || 1;
  const conversionRate = leadCount > 0
    ? ((leadCount / totalVisitors30d) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-2xl text-foreground">Dashboard</h1>
          <p className="text-nude-dark text-sm">{session.user?.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {visitors.map((v) => (
          <MetricCard key={v.label} label={v.label} value={v.value} sublabel="visitantes" />
        ))}
        <MetricCard label="Leads" value={leadCount} sublabel="Total na planilha" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="Tempo Médio"
          value={avgDuration}
          sublabel="Por visita (30 dias)"
        />
        <MetricCard
          label="Conversão"
          value={`${conversionRate}%`}
          sublabel="Visitantes → Leads"
        />
        <MetricCard
          label="Dispositivo"
          value={devices[0]?.device === "mobile" ? "Celular" : "Desktop"}
          sublabel={`${Math.round((devices[0]?.sessions / devices.reduce((s, d) => s + d.sessions, 0) || 1) * 100)}% dos acessos`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TrafficSources data={sources} />
        <PaidVsOrganic data={paidVsOrganic} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NewVsReturning data={newVsReturning} />
        <div className="bg-[#141210] border border-gold/10 rounded-xl p-5">
          <h3 className="text-foreground font-serif text-lg mb-2">Pixels Ativos</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-nude-dark">Google Analytics</span>
              <span className="text-green-400">Ativo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nude-dark">Google Ads</span>
              <span className="text-green-400">Ativo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nude-dark">Meta Pixel (Instagram)</span>
              <span className="text-nude-dark/40">Pendente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
