import { auth } from "./auth";

const propertyId = process.env.GA_PROPERTY_ID;
const GA4_URL = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

interface GA4Report {
  rows?: {
    dimensionValues?: { value?: string }[];
    metricValues?: { value?: string }[];
  }[];
}

async function runReport(body: object): Promise<GA4Report> {
  const session = await auth();
  if (!session?.accessToken) throw new Error("Not authenticated");

  const res = await fetch(GA4_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GA4 API error: ${res.status} ${err}`);
  }

  return res.json();
}

export async function getVisitorCounts() {
  const periods = [
    { label: "Hoje", start: "today", end: "today" },
    { label: "7 dias", start: "7daysAgo", end: "today" },
    { label: "30 dias", start: "30daysAgo", end: "today" },
  ];

  const results = await Promise.all(
    periods.map((p) =>
      runReport({
        dateRanges: [{ startDate: p.start, endDate: p.end }],
        metrics: [{ name: "activeUsers" }],
      })
    )
  );

  return periods.map((p, i) => ({
    label: p.label,
    value: Number(results[i]?.rows?.[0]?.metricValues?.[0]?.value || 0),
  }));
}

export async function getTrafficSources() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10,
  });

  return (
    response.rows?.map((row) => ({
      name: row.dimensionValues?.[0]?.value || "direto",
      sessions: Number(row.metricValues?.[0]?.value || 0),
    })) || []
  );
}

export async function getTopPages() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  return (
    response.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value || "/",
      views: Number(row.metricValues?.[0]?.value || 0),
    })) || []
  );
}

export async function getDeviceBreakdown() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  return (
    response.rows?.map((row) => ({
      device: row.dimensionValues?.[0]?.value || "unknown",
      sessions: Number(row.metricValues?.[0]?.value || 0),
    })) || []
  );
}

export async function getTopCities() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "city" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 5,
  });

  return (
    response.rows?.map((row) => ({
      city: row.dimensionValues?.[0]?.value || "",
      sessions: Number(row.metricValues?.[0]?.value || 0),
    })) || []
  );
}

export async function getPeakHours() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "hour" }],
    metrics: [{ name: "sessions" }],
  });

  const hourMap = new Map<number, number>();
  for (let i = 0; i < 24; i++) hourMap.set(i, 0);

  response.rows?.forEach((row) => {
    const hour = Number(row.dimensionValues?.[0]?.value || 0);
    hourMap.set(hour, Number(row.metricValues?.[0]?.value || 0));
  });

  return Array.from(hourMap.entries()).map(([hour, sessions]) => ({
    hour,
    sessions,
  }));
}

export async function getBounceRate() {
  const response = await runReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "bounceRate" }],
  });

  const rate = Number(response.rows?.[0]?.metricValues?.[0]?.value || 0);
  return Math.round(rate * 100);
}
