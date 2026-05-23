import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camila Makeup | Maquiadora Profissional em Suzano/SP",
  description:
    "Maquiagem profissional para noivas, festas e eventos. Atendimento a domicílio em Suzano/SP. Agende seu horário!",
  openGraph: {
    title: "Camila Makeup | Maquiadora Profissional",
    description:
      "Maquiagem profissional para o dia mais importante da sua vida. Atendimento a domicílio em Suzano/SP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
