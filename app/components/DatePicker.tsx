"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/style.css";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  error?: string;
}

function formatDateBR(date: Date): string {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function toISOString(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DatePicker({ value, onChange, min, error }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const defaultClassNames = getDefaultClassNames();

  const selected = value ? new Date(value + "T12:00:00") : undefined;
  const minDate = min ? new Date(min + "T00:00:00") : new Date();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-[#0a0a0a] border border-gold/20 rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:border-gold transition-colors flex items-center justify-between"
      >
        <span className={selected ? "text-foreground" : "text-neutral-500"}>
          {selected ? formatDateBR(selected) : "Selecione a data"}
        </span>
        <svg className="w-4 h-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {open && (
        <div className="absolute z-50 mt-2 left-0 bg-[#141210] border border-gold/20 rounded-xl p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(toISOString(date));
              }
              setOpen(false);
            }}
            disabled={{ before: minDate }}
            locale={ptBR}
            classNames={{
              root: `${defaultClassNames.root} text-foreground`,
              today: "border border-gold rounded-lg",
              selected: "bg-gold text-[#0a0a0a] rounded-lg font-semibold",
              chevron: `${defaultClassNames.chevron} fill-gold`,
              day: "hover:bg-gold/20 rounded-lg transition-colors",
              disabled: "text-neutral-600 hover:bg-transparent cursor-not-allowed",
              month_caption: "text-gold font-serif text-sm",
              weekday: "text-nude-dark text-xs",
            }}
          />
        </div>
      )}
    </div>
  );
}
