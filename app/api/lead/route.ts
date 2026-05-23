import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.nome || !data.telefone) {
    return NextResponse.json(
      { error: "Nome e telefone são obrigatórios" },
      { status: 400 }
    );
  }

  const lead = {
    timestamp: new Date().toISOString(),
    nome: data.nome,
    telefone: data.telefone,
    servico: data.servico || "",
    data: data.data || "",
    observacoes: data.observacoes || "",
  };

  if (!GOOGLE_SHEETS_URL) {
    console.error("GOOGLE_SHEETS_URL not configured");
    return NextResponse.json(
      { error: "Configuração do servidor incompleta" },
      { status: 500 }
    );
  }

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error("Failed to save lead to Google Sheets:", err);
    return NextResponse.json(
      { error: "Erro ao salvar lead" },
      { status: 502 }
    );
  }

  return NextResponse.json({ status: "ok" });
}
