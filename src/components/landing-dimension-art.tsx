"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Upgraded hero visuals: mesh atmosphere, dual grids, SVG filters, central
 * wireframe, parallax (respects prefers-reduced-motion).
 */
export function LandingDimensionArt() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) {
        el.style.setProperty("--coentax-parallax-x", "0px");
        el.style.setProperty("--coentax-parallax-y", "0px");
        return;
      }
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--coentax-parallax-x", `${x * 18}px`);
      el.style.setProperty("--coentax-parallax-y", `${y * 12}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07070a] to-[#0a0a0f]" />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="coentax-mesh-orb-a absolute -left-[20%] top-[-25%] h-[min(95vw,720px)] w-[min(95vw,720px)] rounded-full bg-red-600/35 blur-[140px]"
          style={{ mixBlendMode: "screen" }}
        />
        <div
          className="coentax-mesh-orb-b absolute -right-[15%] top-[5%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-red-500/25 blur-[120px]"
          style={{ mixBlendMode: "screen" }}
        />
        <div
          className="coentax-mesh-orb-c absolute bottom-[-20%] left-[25%] h-[min(85vw,640px)] w-[min(85vw,640px)] rounded-full bg-white/10 blur-[130px]"
          style={{ mixBlendMode: "overlay" }}
        />
      </div>

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="coentaxNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#coentaxNoise)" />
      </svg>

      <div className="coentax-hero-grid" />
      <div className="coentax-hero-grid coentax-hero-grid--slow" />

      <div
        className="coentax-beam absolute -left-1/4 top-0 h-full w-1/2"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(220,38,38,0.12) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="coentax-hero-parallax absolute inset-0">
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[min(92vw,760px)] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2">
          <svg
            className="coentax-orbit absolute inset-0 h-full w-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="coentaxStrokeFade"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="coentaxRedStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f87171" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
              </linearGradient>
              <filter
                id="coentaxGlowWhite"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="coentaxGlowRed"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="br" />
                <feColorMatrix
                  in="br"
                  type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"
                  result="r"
                />
                <feMerge>
                  <feMergeNode in="r" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g opacity="0.9" filter="url(#coentaxGlowWhite)">
              <ellipse
                cx="250"
                cy="250"
                rx="210"
                ry="58"
                stroke="url(#coentaxStrokeFade)"
                strokeWidth="1"
              />
              <ellipse
                cx="250"
                cy="250"
                rx="58"
                ry="210"
                stroke="url(#coentaxStrokeFade)"
                strokeWidth="1"
                transform="rotate(60 250 250)"
              />
              <ellipse
                cx="250"
                cy="250"
                rx="58"
                ry="210"
                stroke="url(#coentaxStrokeFade)"
                strokeWidth="0.75"
                transform="rotate(-60 250 250)"
              />
            </g>

            <circle
              cx="250"
              cy="250"
              r="168"
              stroke="url(#coentaxRedStroke)"
              strokeWidth="0.6"
              strokeDasharray="10 18"
              opacity="0.55"
              filter="url(#coentaxGlowRed)"
              style={{
                animation: reduceMotion ? undefined : "coentax-pulse-line 6s ease-in-out infinite",
              }}
            />

            <g
              filter="url(#coentaxGlowWhite)"
              opacity="0.85"
              style={{
                transformOrigin: "250px 250px",
                animation: reduceMotion
                  ? undefined
                  : "coentax-dash-spin 72s linear infinite",
              }}
            >
              <circle
                cx="250"
                cy="250"
                r="142"
                stroke="white"
                strokeWidth="0.4"
                strokeDasharray="4 14"
                opacity="0.25"
              />
            </g>

            <g filter="url(#coentaxGlowWhite)">
              <path
                d="M250 88 L382 164 L382 316 L250 392 L118 316 L118 164 Z"
                stroke="white"
                strokeWidth="1.1"
                opacity="0.35"
              />
              <path
                d="M250 108 L358 172 L358 308 L250 372 L142 308 L142 172 Z"
                stroke="url(#coentaxRedStroke)"
                strokeWidth="0.85"
                opacity="0.65"
              />
              <path
                d="M250 88 L250 392 M118 164 L382 316 M382 164 L118 316"
                stroke="url(#coentaxRedStroke)"
                strokeWidth="0.55"
                opacity="0.45"
              />
            </g>

            <g opacity="0.5">
              {[0, 45, 90, 135].map((deg) => (
                <line
                  key={deg}
                  x1="250"
                  y1="250"
                  x2="250"
                  y2="118"
                  stroke="white"
                  strokeWidth="0.35"
                  transform={`rotate(${deg} 250 250)`}
                  opacity="0.4"
                />
              ))}
            </g>
          </svg>
        </div>

        <div
          className="coentax-wire-cube pointer-events-none absolute left-[6%] top-[14%] hidden h-32 w-32 sm:block"
          style={{ perspective: "480px" }}
        >
          <div
            className="relative h-full w-full overflow-visible"
            style={{
              transform: "rotateX(-24deg) rotateY(42deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <WireCubeFace depth={44} className="border-white/45" glow />
          </div>
        </div>

        <div
          className="coentax-wire-cube--b pointer-events-none absolute right-[4%] top-[22%] h-24 w-24 sm:h-28 sm:w-28"
          style={{ perspective: "400px" }}
        >
          <div
            className="relative h-full w-full overflow-visible"
            style={{
              transform: "rotateX(20deg) rotateY(-48deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <WireCubeFace
              depth={34}
              className="border-[rgba(248,113,113,0.65)]"
            />
          </div>
        </div>

        <svg
          className="pointer-events-none absolute -right-2 bottom-[10%] h-44 w-44 text-white/25 sm:h-56 sm:w-56"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="coentaxMiniGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" result="g" />
              <feMerge>
                <feMergeNode in="g" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#coentaxMiniGlow)">
            <path
              d="M70 12 L124 44 L124 96 L70 128 L16 96 L16 44 Z"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <path
              d="M70 12 L70 128 M16 44 L124 96 M124 44 L16 96"
              stroke="var(--coentax-accent)"
              strokeWidth="0.55"
              opacity="0.65"
            />
          </g>
        </svg>

        <svg
          className="pointer-events-none absolute bottom-[18%] left-[2%] h-36 w-36 sm:h-48 sm:w-48"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            style={{
              transformOrigin: "60px 60px",
              animation: reduceMotion
                ? undefined
                : "coentax-float-slow 14s ease-in-out infinite",
            }}
          >
            {[0, 30, 60].map((deg) => (
              <rect
                key={deg}
                x="28"
                y="28"
                width="64"
                height="64"
                stroke="rgba(220,38,38,0.35)"
                strokeWidth="0.7"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
            <circle
              cx="60"
              cy="60"
              r="36"
              stroke="white"
              strokeWidth="0.35"
              strokeDasharray="2 10"
              opacity="0.25"
            />
          </g>
        </svg>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"
        style={{ mixBlendMode: "multiply" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(220,38,38,0.09) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

function WireCubeFace({
  className,
  depth,
  glow,
}: {
  className: string;
  depth: number;
  glow?: boolean;
}) {
  const z = `${depth}px`;
  const shadow = glow ? "0 0 20px rgba(255,255,255,0.15)" : undefined;
  return (
    <>
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{ transform: `translateZ(${z})`, boxShadow: shadow }}
      />
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{ transform: `translateZ(-${z})`, boxShadow: shadow }}
      />
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{
          transform: `rotateY(90deg) translateZ(${z})`,
          boxShadow: shadow,
        }}
      />
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{
          transform: `rotateY(-90deg) translateZ(${z})`,
          boxShadow: shadow,
        }}
      />
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{
          transform: `rotateX(90deg) translateZ(${z})`,
          boxShadow: shadow,
        }}
      />
      <span
        className={`absolute inset-0 box-border border ${className}`}
        style={{
          transform: `rotateX(-90deg) translateZ(${z})`,
          boxShadow: shadow,
        }}
      />
    </>
  );
}

/** Trust section — matches hero language: mesh, glyph, orbit, glow. */
export function TrustDimensionArt() {
  return (
    <div
      className="relative flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-[#050508] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.5)]"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(220,38,38,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          transform: "perspective(320px) rotateX(72deg) scale(1.5)",
          transformOrigin: "50% 100%",
          maskImage: "linear-gradient(to top, black, transparent 70%)",
        }}
      />

      <svg
        className="coentax-trust-glow relative z-[1] h-[82%] w-[82%]"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "coentax-float-slow 16s ease-in-out infinite",
        }}
      >
        <defs>
          <linearGradient id="trustEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
          </linearGradient>
          <filter id="trustGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="2" result="tb" />
            <feMerge>
              <feMergeNode in="tb" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          className="coentax-trust-orbit"
          filter="url(#trustGlow)"
          style={{
            transformOrigin: "110px 110px",
            animation: "coentax-spin-slow 64s linear infinite",
            opacity: 0.85,
          }}
        >
          <ellipse
            cx="110"
            cy="110"
            rx="92"
            ry="28"
            stroke="url(#trustEdge)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="110"
            cy="110"
            rx="28"
            ry="92"
            stroke="url(#trustEdge)"
            strokeWidth="0.8"
            transform="rotate(60 110 110)"
          />
        </g>

        <g filter="url(#trustGlow)">
          <path
            d="M110 28 L188 74 L188 146 L110 192 L32 146 L32 74 Z"
            stroke="url(#trustEdge)"
            strokeWidth="1.15"
          />
          <path
            d="M110 28 L110 192 M32 74 L188 146 M188 74 L32 146"
            stroke="var(--coentax-accent)"
            strokeWidth="0.75"
            opacity="0.75"
          />
          <circle
            cx="110"
            cy="110"
            r="68"
            stroke="var(--coentax-accent)"
            strokeWidth="0.45"
            strokeDasharray="4 12"
            opacity="0.35"
          />
        </g>

        <g opacity="0.4">
          {[0, 60, 120].map((deg) => (
            <line
              key={deg}
              x1="110"
              y1="110"
              x2="110"
              y2="48"
              stroke="white"
              strokeWidth="0.4"
              transform={`rotate(${deg} 110 110)`}
            />
          ))}
        </g>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
