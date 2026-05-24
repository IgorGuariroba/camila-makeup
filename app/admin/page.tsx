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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Target,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
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
      <div className="p-6 max-w-6xl mx-auto">
        <Header email={session.user?.email} />
        <Card className="border-destructive/20 bg-card/80">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
            <p className="text-destructive font-medium mb-1">Erro ao carregar métricas</p>
            <p className="text-muted-foreground text-sm">
              Verifique as configurações do Google Cloud ou faça login novamente.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalVisitors30d = visitors.find((v) => v.label === "30 dias")?.value || 1;
  const conversionRate = leadCount > 0
    ? ((leadCount / totalVisitors30d) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Header email={session.user?.email} />

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Visão Geral
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {visitors.map((v) => (
            <MetricCard
              key={v.label}
              label={v.label}
              value={v.value}
              sublabel="visitantes"
              icon={<Users className="h-3.5 w-3.5" />}
            />
          ))}
          <MetricCard
            label="Leads"
            value={leadCount}
            sublabel="Total na planilha"
            icon={<Target className="h-3.5 w-3.5" />}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <MetricCard
            label="Tempo Médio"
            value={avgDuration}
            sublabel="Por visita (30 dias)"
            icon={<Clock className="h-3.5 w-3.5" />}
          />
          <MetricCard
            label="Conversão"
            value={`${conversionRate}%`}
            sublabel="Visitantes → Leads"
            icon={<Activity className="h-3.5 w-3.5" />}
            trend={Number(conversionRate) > 2 ? "up" : Number(conversionRate) > 0 ? "neutral" : "down"}
          />
          <MetricCard
            label="Dispositivo Principal"
            value={devices[0]?.device === "mobile" ? "Celular" : "Desktop"}
            sublabel={`${Math.round((devices[0]?.sessions / devices.reduce((s, d) => s + d.sessions, 0) || 1) * 100)}% dos acessos`}
          />
        </div>
      </section>

      <Separator className="border-border/50" />

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Análise de Tráfego
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrafficSources data={sources} />
          <PaidVsOrganic data={paidVsOrganic} />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Audiência & Rastreamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NewVsReturning data={newVsReturning} />
          <DeviceBreakdown data={devices} />
          <PixelStatus />
        </div>
      </section>
    </div>
  );
}

function Header({ email }: { email?: string | null }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl font-semibold text-card-foreground">
            Dashboard
          </h1>
          <Badge variant="secondary" className="text-[10px]">
            Atualiza a cada 5 min
          </Badge>
        </div>
        {email && (
          <p className="text-muted-foreground text-sm">{email}</p>
        )}
      </div>
      <SignOutButton />
    </div>
  );
}

function PixelStatus() {
  const pixels = [
    { name: "Google Analytics", active: true },
    { name: "Google Ads", active: true },
    { name: "Meta Pixel (Instagram)", active: false },
  ];

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-5">
        <h3 className="text-base font-medium text-card-foreground mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Pixels Ativos
        </h3>
        <div className="space-y-3">
          {pixels.map((pixel) => (
            <div key={pixel.name} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{pixel.name}</span>
              {pixel.active ? (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Ativo</span>
                </div>
              ) : (
                <Badge variant="secondary" className="text-[10px]">Pendente</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
