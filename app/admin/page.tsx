import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getVisitorCounts,
  getTrafficSources,
  getTopPages,
  getDeviceBreakdown,
  getTopCities,
  getPeakHours,
  getBounceRate,
} from "@/lib/ga4";
import { getLeadCount } from "@/lib/sheets";
import MetricCard from "./components/MetricCard";
import TrafficSources from "./components/TrafficSources";
import TopPages from "./components/TopPages";
import DeviceBreakdown from "./components/DeviceBreakdown";
import CityList from "./components/CityList";
import PeakHours from "./components/PeakHours";
import SignOutButton from "./components/SignOutButton";

export const revalidate = 300;

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  let visitors, sources, pages, devices, cities, hours, bounceRate, leadCount;

  try {
    [visitors, sources, pages, devices, cities, hours, bounceRate, leadCount] =
      await Promise.all([
        getVisitorCounts(),
        getTrafficSources(),
        getTopPages(),
        getDeviceBreakdown(),
        getTopCities(),
        getPeakHours(),
        getBounceRate(),
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
            Verifique se as variáveis de ambiente do Google Cloud estão
            configuradas (GA_PROPERTY_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL,
            GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY).
          </p>
        </div>
      </div>
    );
  }

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
          <MetricCard key={v.label} label={v.label} value={v.value} />
        ))}
        <MetricCard label="Leads" value={leadCount} sublabel="Total na planilha" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TrafficSources data={sources} />
        <TopPages data={pages} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DeviceBreakdown data={devices} />
        <CityList data={cities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PeakHours data={hours} />
        <MetricCard
          label="Taxa de Rejeição"
          value={`${bounceRate}%`}
          sublabel="Últimos 30 dias"
        />
      </div>
    </div>
  );
}
