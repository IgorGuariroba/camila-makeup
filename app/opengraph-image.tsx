import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Camila Makeup - Maquiadora Profissional em Suzano/SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoData = await readFile(
    join(process.cwd(), "public", "camila.jpeg")
  );
  const photoBase64 = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "1px solid rgba(201, 169, 110, 0.3)",
            borderRadius: 16,
            display: "flex",
          }}
        />

        <img
          src={photoBase64}
          width={120}
          height={120}
          style={{
            borderRadius: "50%",
            border: "3px solid #c9a96e",
            marginBottom: 24,
            objectFit: "cover",
          }}
        />

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#f5f0eb",
            textAlign: "center",
            marginBottom: 8,
            display: "flex",
          }}
        >
          Camila Makeup
        </div>

        <div
          style={{
            width: 80,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #c9a96e, transparent)",
            marginTop: 16,
            marginBottom: 16,
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 26,
            color: "#c9a96e",
            textAlign: "center",
            maxWidth: 700,
            fontWeight: 700,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Maquiagem profissional para o dia mais importante da sua vida
        </div>

        <div
          style={{
            fontSize: 16,
            color: "#b8967a",
            textAlign: "center",
            marginTop: 24,
            display: "flex",
            gap: 12,
          }}
        >
          <span>Maquiadora Profissional</span>
          <span style={{ color: "#c9a96e" }}>·</span>
          <span>Suzano/SP</span>
          <span style={{ color: "#c9a96e" }}>·</span>
          <span>Atendimento a domicílio</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
