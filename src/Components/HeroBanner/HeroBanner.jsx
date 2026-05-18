"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import SLIDES from "@/assets/JSON/hero.json";
import { IoSearch } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { LuCalendarPlus } from "react-icons/lu";

const STATS = [
  { value: "340", symbol: "+", label: "Active tutors" },
  { value: "20", symbol: "+", label: "Subjects" },
  { value: "12k", symbol: "+", label: "Sessions booked" },
  { value: "98", symbol: "%", label: "Satisfaction rate" },
];

const BADGE_STYLES = {
  violet: "bg-[#9B8DFF14] border border-[#9B8DFF22] text-[#9B8DFF]",
  jade: "bg-[#4AFFC41A] border border-[#4AFFC422] text-[#4AFFC4]",
  gold: "bg-[#FFD16614] border border-[#FFD16622] text-[#FFD166]",
};

const iconComponents = {
  IoSearch: IoSearch,
  TbUserCheck: TbUserCheck,
  LuCalendarPlus: LuCalendarPlus,
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      goTo((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [goTo]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden border-b border-white/5.5"
      style={{ background: "#111118" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[400px] w-175 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(74,255,196,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(74,255,196,0.133), transparent)",
        }}
      />

      <div
        key={animKey}
        className="hero-slide-animate px-8 pb-12 pt-20 text-center"
      >
        <div className="mb-6 flex justify-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11.5px] font-medium uppercase tracking-[0.04em] ${BADGE_STYLES[slide.badgeVariant]}`}
          >
            {slide.badge}
          </span>
        </div>

        <h1
          className="mx-auto mb-5 max-w-2xl text-[52px] leading-[1.1] tracking-[-0.02em] text-[#F0EFFF]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {slide.headline}
          <em
            style={{
              fontStyle: "italic",
              color: "#4AFFC4",
              textShadow: "0 0 40px rgba(74,255,196,0.133)",
            }}
          >
            {slide.em}
          </em>
        </h1>

        <p className="mx-auto mb-10 max-w-120 text-[15px] font-light leading-[1.75] text-[#9695B0]">
          {slide.sub}
        </p>

        <div className="mb-10 flex justify-center gap-2.5">
          <Link
            href={slide.primaryHref}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
            style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
          >
            {(() => {
              const IconComponent = iconComponents[slide.primaryIcon];
              return IconComponent ? (
                <IconComponent className="w-4 h-4 " />
              ) : null;
            })()}

            <span>{slide.primaryLabel}</span>
          </Link>
          <Link
            href={slide.secondaryHref}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#4AFFC422] bg-[#4AFFC41A] px-4 py-2 text-[13px] font-medium text-[#4AFFC4] transition-all duration-150 hover:bg-[#4AFFC422] capitalize"
          >
            {slide.secondaryLabel}
          </Link>
        </div>

        <div className="flex justify-center gap-1.75 pb-9">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-0.75 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "32px" : "20px",
                background: i === current ? "#4AFFC4" : "#252535",
                boxShadow:
                  i === current ? "0 0 8px rgba(74,255,196,0.133)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row border-t border-white/5.5">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex-1 px-5 py-5.5 text-center border-b border-white/5.5 sm:border-none"
            style={{
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(255,255,255,0.055)"
                  : "none",
            }}
          >
            <div
              className="mb-1 text-[26px] leading-none text-[#F0EFFF]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {stat.value}
              <span className="font-bold text-[#0DBF82]">{stat.symbol}</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.06em] text-[#5A5875]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-slide-animate {
          animation: heroFadeUp 0.5s ease both;
        }
      `}</style>
    </section>
  );
}
