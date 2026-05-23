"use client";

import Image from "next/image";
import { useState } from "react";
import { Gem, Sparkles, Brush, Crown } from "lucide-react";
import DatePicker from "./components/DatePicker";

const WHATSAPP_NUMBER = "5511986733463";
const WHATSAPP_DIRECT_MSG =
  "Olá Camila! Vim pelo seu site e gostaria de saber mais sobre seus serviços de maquiagem 💄";
const INSTAGRAM_URL = "https://www.instagram.com/camilamakeup.guari/";
const TIKTOK_URL = "https://www.tiktok.com/@camila.guari1";


const SERVICES = [
  {
    name: "Maquiagem para Noiva",
    description:
      "Make exclusiva para o dia mais especial. Produtos de alta durabilidade para você brilhar do altar à pista.",
    icon: Gem,
  },
  {
    name: "Festa & Formatura",
    description:
      "Produção completa para arrasar na festa. Make que dura a noite toda com acabamento impecável.",
    icon: Sparkles,
  },
  {
    name: "Maquiagem Social",
    description:
      "Look perfeito para cada momento — do ensaio fotográfico ao evento corporativo. Técnicas que valorizam seus traços com sofisticação.",
    icon: Brush,
  },
  {
    name: "Pacote Noiva + Madrinhas",
    description:
      "Atendimento personalizado para noiva e madrinhas. Harmonia visual para o grande dia com produção exclusiva para todo o grupo.",
    icon: Crown,
  },
];

const PORTFOLIO_IMAGES = [
  { src: "/portfolio/trabalho-1.jpg", alt: "Maquiagem para festa" },
  { src: "/portfolio/trabalho-3.jpg", alt: "Maquiagem para evento" },
  { src: "/portfolio/trabalho-4.webp", alt: "Maquiagem para formatura" },
  { src: "/portfolio/trabalho-5.jpg", alt: "Maquiagem social" },
  { src: "/portfolio/trabalho-6.jpg", alt: "Maquiagem profissional" },
  { src: "/portfolio/trabalho-8.webp", alt: "Maquiagem sofisticada" },
];

const BEFORE_AFTER = [
  {
    before: "/before-after/antes-1.jpg",
    after: "/before-after/depois-1.jpg",
    label: "Maquiagem Social",
  },
  {
    before: "/before-after/antes-2.jpg",
    after: "/before-after/depois-2.jpg",
    label: "Maquiagem para Festa",
  },
];

const TESTIMONIALS = [
  {
    name: "Gabriela R.",
    text: "Foi um prazer! A Camila é muito profissional e caprichou demais na minha make. Amei o resultado!",
  },
  {
    name: "Agatha G.",
    text: "Realçou ainda mais a minha beleza para o ensaio. Que prazer ter participado desse momento!",
  },
  {
    name: "Cliente",
    text: "Maquiagem durou a noite toda! Recebi muitos elogios. Super recomendo o trabalho da Camila.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}


function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: "",
    observacoes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DIRECT_MSG)}`;

  function validateForm(): boolean {
    const errors: Record<string, string> = {};
    if (formData.nome.trim().length < 2) errors.nome = "Nome deve ter pelo menos 2 caracteres";
    const phoneDigits = formData.telefone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.telefone = "Telefone inválido";
    if (formData.data < getTomorrow()) errors.data = "Escolha uma data futura";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const msg = `Olá Camila! Vim pelo seu site e gostaria de um orçamento:

Nome: ${formData.nome}
Serviço: ${formData.servico}
Data desejada: ${formData.data}
Observações: ${formData.observacoes || "Nenhuma"}`;

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => {});

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setFormData({
      nome: "",
      telefone: "",
      servico: "",
      data: "",
      observacoes: "",
    });
  }

  return (
    <div className="flex flex-col items-center bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <div className="w-32 h-32 rounded-full border-2 border-gold overflow-hidden mb-6">
            <Image
              src="/camila.jpeg"
              alt="Camila Makeup"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-foreground mb-2">
            Maquiagem profissional para o dia{" "}
            <span className="gold-shimmer">mais importante</span> da sua vida
          </h1>
          <p className="text-nude-dark text-base mt-3">
            Maquiadora Profissional · Suzano/SP · Atendimento a domicílio
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
            <a
              href="#orcamento"
              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
            >
              Solicitar Orçamento
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-medium px-8 py-3.5 rounded-full transition-all duration-300"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="w-full max-w-2xl px-6 py-16">
        <h2 className="font-serif text-2xl text-center text-foreground mb-2">
          Antes & Depois
        </h2>
        <p className="text-nude-dark text-center text-sm mb-10">
          Transformações reais de clientes reais
        </p>
        <div className="flex flex-col gap-10">
          {BEFORE_AFTER.map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                  <Image
                    src={item.before}
                    alt={`Antes - ${item.label}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 280px"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-foreground text-xs px-2.5 py-1 rounded-full">
                    Antes
                  </span>
                </div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gold/20">
                  <Image
                    src={item.after}
                    alt={`Depois - ${item.label}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 280px"
                  />
                  <span className="absolute bottom-2 left-2 bg-gold text-[#0a0a0a] text-xs font-semibold px-2.5 py-1 rounded-full">
                    Depois
                  </span>
                </div>
              </div>
              <p className="text-center text-nude-dark text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-2xl px-6 py-16">
        <h2 className="font-serif text-2xl text-center text-foreground mb-10">
          O que dizem as clientes
        </h2>
        <div className="flex flex-col gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-[#141210] border border-gold/10 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} className="w-4 h-4 text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-nude-dark text-sm mt-3 font-medium">
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-2xl px-6 py-12">
        <div className="bg-gradient-to-br from-[#1a1510] to-[#141210] border border-gold/20 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl text-foreground mb-3">
            Pronta para se sentir ainda mais linda?
          </h2>
          <p className="text-nude-dark text-sm mb-6">
            Solicite seu orçamento e garanta seu horário
          </p>
          <a
            href="#orcamento"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            Solicitar Orçamento
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="w-full max-w-2xl px-6 py-16">
        <h2 className="font-serif text-2xl text-center text-foreground mb-10">
          Serviços
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="bg-[#141210] border border-gold/10 rounded-2xl p-6 hover:border-gold/30 transition-colors duration-300"
            >
              <s.icon className="w-7 h-7 mb-3 text-gold" />
              <h3 className="text-foreground font-semibold text-base mb-2">
                {s.name}
              </h3>
              <p className="text-nude-dark text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="w-full max-w-2xl px-6 py-16">
        <h2 className="font-serif text-2xl text-center text-foreground mb-2">
          Portfólio
        </h2>
        <p className="text-nude-dark text-center text-sm mb-10">
          Alguns dos meus trabalhos recentes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PORTFOLIO_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 45vw, 200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="w-full max-w-2xl px-6 py-12">
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-4 rounded-full transition-all duration-300 hover:scale-105 w-full"
        >
          <WhatsAppIcon className="w-6 h-6" />
          Fale comigo pelo WhatsApp
        </a>
      </section>

      {/* Social Links */}
      <section className="w-full max-w-2xl px-6 py-12 pb-20">
        <div className="flex flex-col gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#141210] border border-gold/10 hover:border-gold/30 text-foreground font-medium py-4 rounded-full transition-all duration-300"
          >
            <InstagramIcon className="w-5 h-5 text-gold" />
            @camilamakeup.guari
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#141210] border border-gold/10 hover:border-gold/30 text-foreground font-medium py-4 rounded-full transition-all duration-300"
          >
            <TikTokIcon className="w-5 h-5 text-gold" />
            @camila.guari1
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gold/10">
        <p className="text-nude-dark/60 text-xs">
          © 2025 Camila Makeup. Todos os direitos reservados.
        </p>
      </footer>

      {/* Quote Form */}
      <section id="orcamento" className="w-full max-w-2xl px-6 py-16 scroll-mt-8">
        <div className="bg-[#141210] border border-gold/20 rounded-2xl p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-center text-foreground mb-2">
            Solicitar Orçamento
          </h2>
          <p className="text-nude-dark text-center text-sm mb-8">
            Preencha seus dados e entraremos em contato pelo WhatsApp
          </p>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <div>
              <label className="text-sm text-nude-dark mb-1 block">
                Nome
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={formData.nome}
                onChange={(e) => {
                  setFormData({ ...formData, nome: e.target.value });
                  setFormErrors({ ...formErrors, nome: "" });
                }}
                className="w-full bg-[#0a0a0a] border border-gold/20 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Seu nome"
              />
              {formErrors.nome && <p className="text-red-400 text-xs mt-1">{formErrors.nome}</p>}
            </div>
            <div>
              <label className="text-sm text-nude-dark mb-1 block">
                Telefone
              </label>
              <input
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => {
                  setFormData({ ...formData, telefone: formatPhone(e.target.value) });
                  setFormErrors({ ...formErrors, telefone: "" });
                }}
                maxLength={15}
                className="w-full bg-[#0a0a0a] border border-gold/20 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="(11) 99999-9999"
              />
              {formErrors.telefone && <p className="text-red-400 text-xs mt-1">{formErrors.telefone}</p>}
            </div>
            <div>
              <label className="text-sm text-nude-dark mb-1 block">
                Serviço
              </label>
              <select
                required
                value={formData.servico}
                onChange={(e) =>
                  setFormData({ ...formData, servico: e.target.value })
                }
                className="w-full bg-[#0a0a0a] border border-gold/20 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
              >
                <option value="">Selecione o serviço</option>
                {SERVICES.map((s, i) => (
                  <option key={i} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-nude-dark mb-1 block">
                Data desejada
              </label>
              <DatePicker
                value={formData.data}
                onChange={(val) => {
                  setFormData({ ...formData, data: val });
                  setFormErrors({ ...formErrors, data: "" });
                }}
                min={getTomorrow()}
                error={formErrors.data}
              />
            </div>
            <div>
              <label className="text-sm text-nude-dark mb-1 block">
                Observações{" "}
                <span className="text-nude-dark/50">(opcional)</span>
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
                className="w-full bg-[#0a0a0a] border border-gold/20 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold transition-colors resize-none h-24"
                placeholder="Detalhes sobre o evento, local, etc."
              />
            </div>
            <button
              type="submit"

              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold py-3.5 rounded-full transition-all duration-300 hover:scale-105 mt-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
