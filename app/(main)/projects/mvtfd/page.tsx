"use client";
import { useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=JetBrains+Mono:wght@400;500;600&family=Inter+Tight:wght@300;400;500;600;700&display=swap');

  :root {
    --paper: #f4efe6;
    --paper-warm: #ede5d3;
    --paper-deep: #e3d8be;
    --ink: #15202b;
    --ink-soft: #2c3744;
    --ink-mute: #5a6573;
    --rule: #c4b89e;
    --accent-blue: #1e3a5f;
    --accent-deep: #0a1a2e;
    --hot: #d94f1e;
    --hot-soft: #e87a4d;
    --amber: #d49a3a;
    --moss: #4a6b3a;
    --serif: 'Fraunces', 'Times New Roman', serif;
    --sans: 'Inter Tight', system-ui, sans-serif;
    --mono: 'JetBrains Mono', 'Courier New', monospace;
  }

  .mv-wrap * { margin: 0; padding: 0; box-sizing: border-box; }

  .mv-wrap {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 17px;
    line-height: 1.65;
    overflow-x: hidden;
    background-image:
      radial-gradient(at 15% 8%, rgba(217, 79, 30, 0.04) 0%, transparent 40%),
      radial-gradient(at 88% 92%, rgba(30, 58, 95, 0.05) 0%, transparent 50%);
  }

  /* Subtle grain overlay */
  .mv-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
    z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.12 0 0 0 0 0.17 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .mv-wrap .container { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

  /* ============ TOP BAR ============ */
  .mv-wrap .topbar {
    border-bottom: 1px solid var(--rule);
    padding: 18px 0;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .mv-wrap .topbar-inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
  .mv-wrap .topbar-logo {
    font-family: var(--serif);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
    color: var(--ink);
  }
  .mv-wrap .topbar-logo em { color: var(--hot); font-style: normal; }
  .mv-wrap .topbar-meta { display: flex; gap: 28px; }
  .mv-wrap .topbar-meta span::before { content: '⏷ '; color: var(--hot); }

  /* ============ HERO ============ */
  .mv-wrap .hero {
    padding: 80px 0 100px;
    position: relative;
    border-bottom: 1px solid var(--rule);
  }

  .mv-wrap .hero-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot);
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mv-wrap .hero-tag::before {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--hot);
    display: block;
  }

  .mv-wrap .hero-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(48px, 7.5vw, 112px);
    line-height: 0.92;
    letter-spacing: -0.025em;
    margin-bottom: 48px;
    font-variation-settings: "opsz" 144;
  }
  .mv-wrap .hero-title .ital {
    font-style: italic;
    font-weight: 300;
    color: var(--accent-blue);
  }
  .mv-wrap .hero-title .accent {
    color: var(--hot);
    font-style: italic;
    font-weight: 400;
  }

  .mv-wrap .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
    align-items: start;
    margin-top: 24px;
  }

  .mv-wrap .hero-lede {
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.5;
    font-weight: 300;
    color: var(--ink-soft);
    max-width: 560px;
  }
  .mv-wrap .hero-lede strong {
    font-weight: 500;
    color: var(--ink);
    background: linear-gradient(180deg, transparent 65%, rgba(217, 79, 30, 0.22) 65%);
    padding: 0 2px;
  }

  .mv-wrap .hero-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px 40px;
    padding-top: 8px;
  }
  .mv-wrap .meta-block .meta-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 8px;
    display: block;
  }
  .mv-wrap .meta-block .meta-val {
    font-family: var(--serif);
    font-size: 19px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--ink);
  }

  /* ============ FLOW VISUAL ============ */
  .mv-wrap .flow-strip {
    margin-top: 64px;
    position: relative;
    height: 140px;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    overflow: hidden;
    background:
      linear-gradient(90deg,
        rgba(74, 107, 58, 0.06) 0%,
        rgba(212, 154, 58, 0.08) 50%,
        rgba(217, 79, 30, 0.10) 100%);
  }
  .mv-wrap .flow-strip svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .mv-wrap .flow-label {
    position: absolute;
    top: 14px;
    left: 24px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-mute);
    z-index: 2;
  }
  .mv-wrap .flow-label-right {
    position: absolute;
    bottom: 14px;
    right: 24px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot);
    z-index: 2;
  }

  @keyframes mv-flow-anim {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .mv-wrap .flowline {
    animation: mv-flow-anim 14s linear infinite;
  }
  .mv-wrap .flowline.l2 { animation-duration: 18s; animation-delay: -3s; }
  .mv-wrap .flowline.l3 { animation-duration: 22s; animation-delay: -7s; }
  .mv-wrap .flowline.l4 { animation-duration: 26s; animation-delay: -10s; }
  .mv-wrap .flowline.l5 { animation-duration: 30s; animation-delay: -2s; }

  /* ============ SECTION HEADINGS ============ */
  .mv-wrap section { padding: 100px 0; border-bottom: 1px solid var(--rule); position: relative; }

  .mv-wrap .section-num {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--hot);
    margin-bottom: 18px;
    display: block;
  }

  .mv-wrap .section-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(36px, 4.5vw, 60px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin-bottom: 56px;
    max-width: 900px;
  }
  .mv-wrap .section-title .ital { font-style: italic; color: var(--accent-blue); }

  /* ============ THE IDEA / CANAL ============ */
  .mv-wrap .idea-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .mv-wrap .idea-prose p {
    font-family: var(--serif);
    font-size: 19px;
    line-height: 1.65;
    margin-bottom: 22px;
    color: var(--ink-soft);
    font-weight: 300;
  }
  .mv-wrap .idea-prose p strong { color: var(--ink); font-weight: 500; }
  .mv-wrap .idea-prose p em { color: var(--hot); font-style: italic; font-weight: 400; }

  .mv-wrap .pullquote {
    border-left: 3px solid var(--hot);
    padding: 4px 0 4px 28px;
    margin: 32px 0;
    font-family: var(--serif);
    font-size: 24px;
    line-height: 1.4;
    font-style: italic;
    font-weight: 300;
    color: var(--ink);
  }

  .mv-wrap .canal-card {
    background: var(--paper-warm);
    border: 1px solid var(--rule);
    padding: 40px;
    position: relative;
  }
  .mv-wrap .canal-card::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 36px; height: 36px;
    border-top: 2px solid var(--hot);
    border-left: 2px solid var(--hot);
  }
  .mv-wrap .canal-card::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: 36px; height: 36px;
    border-bottom: 2px solid var(--hot);
    border-right: 2px solid var(--hot);
  }
  .mv-wrap .canal-card h3 {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot);
    margin-bottom: 20px;
  }
  .mv-wrap .canal-card .canal-title {
    font-family: var(--serif);
    font-size: 26px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 20px;
  }
  .mv-wrap .canal-svg { width: 100%; margin: 24px 0; }
  .mv-wrap .canal-card p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-soft);
  }

  /* ============ VISCOSITY LADDER ============ */
  .mv-wrap .viscosity-section { background: var(--paper-warm); }

  .mv-wrap .visc-intro {
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.5;
    font-weight: 300;
    color: var(--ink-soft);
    max-width: 720px;
    margin-bottom: 64px;
  }

  .mv-wrap .visc-ladder {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid var(--rule);
  }

  .mv-wrap .visc-row {
    display: grid;
    grid-template-columns: 80px 1fr 2fr 1.5fr;
    gap: 32px;
    align-items: center;
    padding: 28px 0;
    border-bottom: 1px solid var(--rule);
    position: relative;
    transition: background 0.3s ease;
  }
  .mv-wrap .visc-row:hover { background: rgba(217, 79, 30, 0.03); }

  .mv-wrap .visc-num {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--ink-mute);
  }

  .mv-wrap .visc-vehicle {
    font-family: var(--serif);
    font-size: 26px;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .mv-wrap .visc-vehicle .visc-sub {
    display: block;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-top: 4px;
    font-weight: 400;
  }

  .mv-wrap .visc-bar-wrap {
    position: relative;
    height: 14px;
    background: rgba(0,0,0,0.05);
    border-radius: 1px;
    overflow: hidden;
  }
  .mv-wrap .visc-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--moss), var(--amber), var(--hot));
    transform-origin: left;
    animation: mv-bar-grow 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  }
  @keyframes mv-bar-grow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  .mv-wrap .visc-fluid {
    font-family: var(--serif);
    font-style: italic;
    font-size: 18px;
    color: var(--accent-blue);
    text-align: right;
  }
  .mv-wrap .visc-fluid::before {
    content: '≈ ';
    color: var(--ink-mute);
    font-style: normal;
  }

  /* ============ REYNOLDS EQUATION ============ */
  .mv-wrap .physics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  .mv-wrap .equation-card {
    background: var(--accent-deep);
    color: var(--paper);
    padding: 56px 48px;
    position: relative;
    overflow: hidden;
  }
  .mv-wrap .equation-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(at 20% 30%, rgba(217, 79, 30, 0.18) 0%, transparent 50%),
      radial-gradient(at 80% 80%, rgba(212, 154, 58, 0.12) 0%, transparent 45%);
    pointer-events: none;
  }
  .mv-wrap .equation-card > * { position: relative; z-index: 2; }

  .mv-wrap .eq-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot-soft);
    margin-bottom: 24px;
  }

  .mv-wrap .equation {
    font-family: var(--serif);
    font-style: italic;
    font-size: 52px;
    text-align: center;
    margin: 32px 0 48px;
    color: var(--paper);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .mv-wrap .equation .eq-num { color: var(--hot-soft); font-weight: 500; }
  .mv-wrap .equation .eq-frac {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    font-size: 38px;
    margin: 0 6px;
  }
  .mv-wrap .equation .eq-frac span { display: block; padding: 2px 6px; }
  .mv-wrap .equation .eq-frac span:first-child { border-bottom: 1.5px solid var(--paper); }

  .mv-wrap .eq-vars { display: flex; flex-direction: column; gap: 14px; }
  .mv-wrap .eq-var {
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 16px;
    align-items: baseline;
    padding-bottom: 12px;
    border-bottom: 1px dashed rgba(244, 239, 230, 0.18);
  }
  .mv-wrap .eq-var:last-child { border: none; }
  .mv-wrap .eq-var-sym {
    font-family: var(--serif);
    font-style: italic;
    font-size: 22px;
    color: var(--hot-soft);
  }
  .mv-wrap .eq-var-def {
    font-family: var(--sans);
    font-size: 14px;
    line-height: 1.45;
    color: rgba(244, 239, 230, 0.85);
  }

  .mv-wrap .physics-prose h3 {
    font-family: var(--serif);
    font-size: 30px;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 20px;
    color: var(--ink);
    letter-spacing: -0.015em;
  }
  .mv-wrap .physics-prose p {
    font-size: 16px;
    line-height: 1.7;
    color: var(--ink-soft);
    margin-bottom: 18px;
  }
  .mv-wrap .physics-prose p strong { color: var(--ink); font-weight: 600; }

  .mv-wrap .threshold-bands {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--rule);
  }
  .mv-wrap .threshold-band {
    display: grid;
    grid-template-columns: 130px 1fr auto;
    align-items: center;
    padding: 18px 22px;
    gap: 20px;
    border-bottom: 1px solid var(--rule);
    position: relative;
  }
  .mv-wrap .threshold-band:last-child { border-bottom: none; }
  .mv-wrap .threshold-band .tb-val {
    font-family: var(--mono);
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }
  .mv-wrap .threshold-band .tb-state {
    font-family: var(--serif);
    font-style: italic;
    font-size: 17px;
    color: var(--ink-soft);
  }
  .mv-wrap .threshold-band .tb-dot {
    width: 12px; height: 12px; border-radius: 50%;
  }
  .mv-wrap .threshold-band.laminar { background: linear-gradient(90deg, rgba(74, 107, 58, 0.08), transparent); }
  .mv-wrap .threshold-band.laminar .tb-dot { background: var(--moss); }
  .mv-wrap .threshold-band.transitional { background: linear-gradient(90deg, rgba(212, 154, 58, 0.10), transparent); }
  .mv-wrap .threshold-band.transitional .tb-dot { background: var(--amber); }
  .mv-wrap .threshold-band.turbulent { background: linear-gradient(90deg, rgba(217, 79, 30, 0.12), transparent); }
  .mv-wrap .threshold-band.turbulent .tb-dot { background: var(--hot); }

  /* ============ LITERATURE GAP ============ */
  .mv-wrap .lit-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }
  .mv-wrap .lit-card {
    background: var(--paper);
    padding: 32px 28px;
    position: relative;
    transition: background 0.3s;
  }
  .mv-wrap .lit-card:hover { background: var(--paper-warm); }

  .mv-wrap .lit-yr {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--hot);
    margin-bottom: 10px;
  }
  .mv-wrap .lit-name {
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.2;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--ink);
  }
  .mv-wrap .lit-auth {
    font-family: var(--sans);
    font-size: 12px;
    color: var(--ink-mute);
    margin-bottom: 18px;
    font-style: italic;
  }
  .mv-wrap .lit-desc {
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-soft);
    margin-bottom: 18px;
  }
  .mv-wrap .lit-gap {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--hot);
    padding-top: 14px;
    border-top: 1px solid var(--rule);
  }
  .mv-wrap .lit-gap::before { content: 'Gap → '; color: var(--ink-mute); }

  /* ============ TASKS ============ */
  .mv-wrap .tasks-section { background: var(--accent-deep); color: var(--paper); border-bottom: none; }
  .mv-wrap .tasks-section .section-title { color: var(--paper); }
  .mv-wrap .tasks-section .section-num { color: var(--hot-soft); }

  .mv-wrap .task-list { display: flex; flex-direction: column; gap: 0; }
  .mv-wrap .task-row {
    display: grid;
    grid-template-columns: 60px 1fr 140px;
    gap: 32px;
    padding: 28px 0;
    border-bottom: 1px solid rgba(244, 239, 230, 0.15);
    align-items: start;
    transition: padding-left 0.3s;
  }
  .mv-wrap .task-row:first-child { border-top: 1px solid rgba(244, 239, 230, 0.15); }
  .mv-wrap .task-row:hover { padding-left: 16px; }

  .mv-wrap .task-id {
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--hot-soft);
    letter-spacing: 0.1em;
    padding-top: 4px;
  }
  .mv-wrap .task-content h4 {
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.25;
    font-weight: 400;
    margin-bottom: 8px;
    color: var(--paper);
  }
  .mv-wrap .task-content p {
    font-size: 14px;
    line-height: 1.55;
    color: rgba(244, 239, 230, 0.7);
  }
  .mv-wrap .task-tag {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--hot-soft);
    padding: 5px 10px;
    border: 1px solid var(--hot-soft);
    border-radius: 1px;
    justify-self: end;
    align-self: start;
  }

  /* ============ GOAL ============ */
  .mv-wrap .goal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }

  .mv-wrap .goal-card {
    border: 1px solid var(--rule);
    padding: 40px;
    background: var(--paper-warm);
    position: relative;
  }
  .mv-wrap .goal-card .goal-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot);
    margin-bottom: 16px;
  }
  .mv-wrap .goal-card .goal-head {
    font-family: var(--serif);
    font-size: 28px;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 28px;
    color: var(--ink);
    letter-spacing: -0.015em;
  }
  .mv-wrap .goal-list { list-style: none; }
  .mv-wrap .goal-list li {
    padding: 14px 0 14px 32px;
    border-bottom: 1px solid var(--rule);
    font-size: 15px;
    line-height: 1.5;
    color: var(--ink-soft);
    position: relative;
  }
  .mv-wrap .goal-list li:last-child { border-bottom: none; }
  .mv-wrap .goal-list li::before {
    content: '';
    position: absolute;
    left: 0; top: 22px;
    width: 18px; height: 1px;
    background: var(--hot);
  }

  /* ============ SUCCESS BANNER ============ */
  .mv-wrap .success-banner {
    margin-top: 80px;
    padding: 56px 64px;
    background: var(--ink);
    color: var(--paper);
    position: relative;
    overflow: hidden;
  }
  .mv-wrap .success-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(at 80% 30%, rgba(217, 79, 30, 0.22) 0%, transparent 55%);
    pointer-events: none;
  }
  .mv-wrap .success-banner > * { position: relative; z-index: 2; }
  .mv-wrap .success-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--hot-soft);
    margin-bottom: 20px;
  }
  .mv-wrap .success-banner h3 {
    font-family: var(--serif);
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.2;
    font-weight: 300;
    max-width: 820px;
    letter-spacing: -0.015em;
  }
  .mv-wrap .success-banner h3 em {
    font-style: italic;
    color: var(--hot-soft);
    font-weight: 400;
  }

  /* ============ PARTNERS ============ */
  .mv-wrap .partners-section { padding: 80px 0; text-align: center; }
  .mv-wrap .partners-lbl {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 32px;
  }
  .mv-wrap .partners-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 64px;
    flex-wrap: wrap;
  }
  .mv-wrap .partner {
    font-family: var(--serif);
    font-size: 20px;
    font-weight: 500;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .mv-wrap .partner .partner-sub {
    display: block;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-top: 4px;
    font-weight: 400;
  }
  .mv-wrap .partner-divider {
    width: 1px;
    height: 40px;
    background: var(--rule);
  }

  /* ============ FOOTER ============ */
  .mv-wrap footer {
    background: var(--ink);
    color: var(--paper);
    padding: 64px 0 32px;
  }
  .mv-wrap .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 64px;
    margin-bottom: 48px;
  }
  .mv-wrap .footer-brand {
    font-family: var(--serif);
    font-size: 32px;
    line-height: 1.15;
    font-weight: 400;
    letter-spacing: -0.015em;
  }
  .mv-wrap .footer-brand em { color: var(--hot-soft); font-style: italic; }
  .mv-wrap .footer-col h5 {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hot-soft);
    margin-bottom: 16px;
  }
  .mv-wrap .footer-col p, .mv-wrap .footer-col a {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(244, 239, 230, 0.75);
    text-decoration: none;
    display: block;
  }
  .mv-wrap .footer-col a:hover { color: var(--paper); }
  .mv-wrap .footer-bottom {
    border-top: 1px solid rgba(244, 239, 230, 0.15);
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(244, 239, 230, 0.5);
  }

  /* ============ RESPONSIVE ============ */
  @media (max-width: 960px) {
    .mv-wrap .container { padding: 0 28px; }
    .mv-wrap .hero-grid, .mv-wrap .idea-grid, .mv-wrap .physics-grid, .mv-wrap .goal-grid, .mv-wrap .footer-grid { grid-template-columns: 1fr; gap: 48px; }
    .mv-wrap .lit-grid { grid-template-columns: 1fr; }
    .mv-wrap .visc-row { grid-template-columns: 50px 1fr; row-gap: 12px; }
    .mv-wrap .visc-row > *:nth-child(3), .mv-wrap .visc-row > *:nth-child(4) { grid-column: 1 / -1; padding-left: 50px; }
    .mv-wrap .visc-row > *:nth-child(3) { margin-left: -50px; padding-left: 0; }
    .mv-wrap .visc-fluid { text-align: left; }
    .mv-wrap .task-row { grid-template-columns: 50px 1fr; }
    .mv-wrap .task-tag { grid-column: 1 / -1; padding-left: 50px; padding-bottom: 0; border: none; color: var(--hot-soft); justify-self: start; }
    .mv-wrap section { padding: 64px 0; }
    .mv-wrap .success-banner { padding: 40px 28px; }
    .mv-wrap .partner-divider { display: none; }
  }
`;

const HTML = `
<!-- ============ HERO ============ -->
<header class="hero">
  <div class="container">
    <div class="hero-tag">Research Programme No. 07</div>
    <h1 class="hero-title">
      Delhi traffic<br>
      <span class="ital">is a</span> <span class="accent">fluid.</span>
    </h1>

    <div class="hero-grid">
      <div class="hero-lede">
        Every traffic model used in India treats a motorcycle and a bus as identical. <strong>That's physically wrong.</strong> We're building the first multi-viscosity fluid framework for mixed Indian traffic — treating each vehicle class as a fluid of different viscosity, and using a modified Reynolds number to predict the moment a junction tips from orderly flow into a jam.
      </div>

      <div class="hero-meta">
        <div class="meta-block">
          <span class="meta-label">Programme</span>
          <div class="meta-val">Multi-Viscosity Traffic Fluid Dynamics</div>
        </div>
        <div class="meta-block">
          <span class="meta-label">Anchor Institution</span>
          <div class="meta-val">IIT Delhi<br>Dept. of Mechanical Engineering</div>
        </div>
        <div class="meta-block">
          <span class="meta-label">Faculty Supervisor</span>
          <div class="meta-val">Prof. Mayank Kumar</div>
        </div>
        <div class="meta-block">
          <span class="meta-label">Year One Goal</span>
          <div class="meta-val">One peer-reviewed working paper<br><span style="font-family:var(--mono); font-size:11px; color:var(--ink-mute); letter-spacing:0.1em; text-transform:uppercase;">Target · Transportation Research Part B</span></div>
        </div>
      </div>
    </div>

    <!-- Flow strip -->
    <div class="flow-strip" aria-hidden="true">
      <div class="flow-label">Viscosity gradient · low → high</div>
      <div class="flow-label-right">Re increasing →</div>
      <svg viewBox="0 0 1200 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fl1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#4a6b3a" stop-opacity="0"/>
            <stop offset="0.5" stop-color="#4a6b3a" stop-opacity="0.8"/>
            <stop offset="1" stop-color="#4a6b3a" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="fl2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#d49a3a" stop-opacity="0"/>
            <stop offset="0.5" stop-color="#d49a3a" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#d49a3a" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="fl3" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#d94f1e" stop-opacity="0"/>
            <stop offset="0.5" stop-color="#d94f1e" stop-opacity="0.85"/>
            <stop offset="1" stop-color="#d94f1e" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <g class="flowline">
          <path d="M -400 30 Q 0 10, 400 35 T 1200 28 L 1600 28" stroke="url(#fl1)" stroke-width="1.5" fill="none"/>
        </g>
        <g class="flowline l2">
          <path d="M -400 55 Q 200 70, 500 50 T 1200 60 L 1600 60" stroke="url(#fl2)" stroke-width="1.5" fill="none"/>
        </g>
        <g class="flowline l3">
          <path d="M -400 80 Q 150 95, 450 75 T 1200 88 L 1600 88" stroke="url(#fl2)" stroke-width="1.5" fill="none"/>
        </g>
        <g class="flowline l4">
          <path d="M -400 105 Q 300 120, 600 100 T 1200 115 L 1600 115" stroke="url(#fl3)" stroke-width="2" fill="none"/>
        </g>
        <g class="flowline l5">
          <path d="M -400 125 Q 250 138, 550 120 T 1200 130 L 1600 130" stroke="url(#fl3)" stroke-width="1.5" fill="none"/>
        </g>
      </svg>
    </div>
  </div>
</header>

<!-- ============ THE IDEA ============ -->
<section id="idea">
  <div class="container">
    <span class="section-num">01 · The Core Idea</span>
    <h2 class="section-title">The jam doesn't start where vehicles stop.<br><span class="ital">It starts upstream.</span></h2>

    <div class="idea-grid">
      <div class="idea-prose">
        <p>Indian urban traffic is the most heterogeneous flow on earth. Motorcycles, auto-rickshaws, cars, buses, e-rickshaws, and hand-pulled carts all share one notional lane. Each behaves like a fluid of <strong>fundamentally different viscosity</strong>. Nobody has modelled this properly.</p>

        <p>Current models — LWR, Nagel-Schreckenberg, IDM — treat the stream as <em>one species</em>. The result is design guidance that fails Delhi's reality: junctions where the bottleneck appears to be a stop line, but the real cause is exit geometry hundreds of metres downstream.</p>

        <div class="pullquote">"When a canal's exit narrows too quickly, water flows backwards. Delhi's junctions do exactly the same thing."</div>

        <p>Our hypothesis: a multi-phase, multi-viscosity formulation — coupled to a junction-scale Reynolds number — can predict the moment of transition from laminar to turbulent flow. Fix the exit geometry, and you fix the jam.</p>
      </div>

      <div class="canal-card">
        <h3>The Canal Analogy</h3>
        <div class="canal-title">Back-pressure propagates against the direction of motion.</div>
        <svg class="canal-svg" viewBox="0 0 400 200">
          <!-- Canal banks -->
          <path d="M 20 50 L 280 50 L 380 90 L 380 110 L 280 150 L 20 150 Z" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
          <!-- Flow arrows that reverse near exit -->
          <g opacity="0.85">
            <path d="M 50 80 L 110 80" stroke="#4a6b3a" stroke-width="2" marker-end="url(#arr1)"/>
            <path d="M 50 100 L 110 100" stroke="#4a6b3a" stroke-width="2" marker-end="url(#arr1)"/>
            <path d="M 50 120 L 110 120" stroke="#4a6b3a" stroke-width="2" marker-end="url(#arr1)"/>

            <path d="M 140 80 L 190 80" stroke="#d49a3a" stroke-width="2" marker-end="url(#arr2)"/>
            <path d="M 140 100 L 190 100" stroke="#d49a3a" stroke-width="2" marker-end="url(#arr2)"/>
            <path d="M 140 120 L 190 120" stroke="#d49a3a" stroke-width="2" marker-end="url(#arr2)"/>

            <!-- back pressure -->
            <path d="M 280 75 L 230 70" stroke="#d94f1e" stroke-width="2" marker-end="url(#arr3)"/>
            <path d="M 280 100 L 230 100" stroke="#d94f1e" stroke-width="2" marker-end="url(#arr3)"/>
            <path d="M 280 125 L 230 130" stroke="#d94f1e" stroke-width="2" marker-end="url(#arr3)"/>
          </g>
          <defs>
            <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4a6b3a"/></marker>
            <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d49a3a"/></marker>
            <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d94f1e"/></marker>
          </defs>
          <!-- Labels -->
          <text x="80" y="42" font-family="JetBrains Mono" font-size="9" fill="var(--ink-mute)" text-anchor="middle">FREE FLOW</text>
          <text x="260" y="42" font-family="JetBrains Mono" font-size="9" fill="#d94f1e" text-anchor="middle">BACK-PRESSURE</text>
          <text x="340" y="180" font-family="JetBrains Mono" font-size="9" fill="var(--ink-mute)" text-anchor="middle">EXIT NARROWS</text>
          <line x1="280" y1="55" x2="280" y2="145" stroke="var(--hot)" stroke-width="1" stroke-dasharray="3 3"/>
        </svg>
        <p>The jam front propagates <em>upstream</em> from a poorly shaped exit — exactly as fluid mechanics predicts for compressible flow through a sudden contraction.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ VISCOSITY LADDER ============ -->
<section class="viscosity-section" id="viscosity">
  <div class="container">
    <span class="section-num">02 · The Viscosity Hierarchy</span>
    <h2 class="section-title">Six vehicle classes.<br><span class="ital">Six different fluids.</span></h2>

    <p class="visc-intro">Each vehicle class on a Delhi road behaves like a fluid with a distinct viscosity — set by physical footprint, gap acceptance, speed variance, and lateral clearance. The first task of MVTFD is to derive a defensible <em>μ<sub>eff</sub></em> for each class.</p>

    <div class="visc-ladder">
      <div class="visc-row">
        <div class="visc-num">01 / 06</div>
        <div class="visc-vehicle">Motorcycles &amp; Scooters<span class="visc-sub">Two-wheelers</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 12%; animation-delay: 0.1s;"></div></div>
        <div class="visc-fluid">water</div>
      </div>
      <div class="visc-row">
        <div class="visc-num">02 / 06</div>
        <div class="visc-vehicle">Auto-rickshaws<span class="visc-sub">Three-wheelers</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 28%; animation-delay: 0.2s;"></div></div>
        <div class="visc-fluid">light oil</div>
      </div>
      <div class="visc-row">
        <div class="visc-num">03 / 06</div>
        <div class="visc-vehicle">Cars &amp; SUVs<span class="visc-sub">Passenger four-wheelers</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 52%; animation-delay: 0.3s;"></div></div>
        <div class="visc-fluid">syrup</div>
      </div>
      <div class="visc-row">
        <div class="visc-num">04 / 06</div>
        <div class="visc-vehicle">E-rickshaws<span class="visc-sub">Slow electric three-wheelers</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 68%; animation-delay: 0.4s;"></div></div>
        <div class="visc-fluid">thick syrup</div>
      </div>
      <div class="visc-row">
        <div class="visc-num">05 / 06</div>
        <div class="visc-vehicle">Buses &amp; Trucks<span class="visc-sub">Heavy commercial</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 86%; animation-delay: 0.5s;"></div></div>
        <div class="visc-fluid">honey</div>
      </div>
      <div class="visc-row">
        <div class="visc-num">06 / 06</div>
        <div class="visc-vehicle">Hand-pulled carts<span class="visc-sub">Non-motorised slow traffic</span></div>
        <div class="visc-bar-wrap"><div class="visc-bar" style="width: 98%; animation-delay: 0.6s;"></div></div>
        <div class="visc-fluid">paste</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PHYSICS / REYNOLDS ============ -->
<section id="physics">
  <div class="container">
    <span class="section-num">03 · The Physics</span>
    <h2 class="section-title">A Reynolds number for mixed traffic.<br><span class="ital">Predicting the tipping point.</span></h2>

    <div class="physics-grid">
      <div class="equation-card">
        <div class="eq-tag">Modified Reynolds · MVTFD-1</div>
        <div class="equation">
          <span class="eq-num">Re</span> = <span class="eq-frac"><span>ρ · v · D<sub>h</sub></span><span>μ<sub>eff</sub></span></span>
        </div>
        <div class="eq-vars">
          <div class="eq-var"><span class="eq-var-sym">ρ</span><span class="eq-var-def">Traffic density · vehicles per kilometre</span></div>
          <div class="eq-var"><span class="eq-var-sym">v</span><span class="eq-var-def">Mean approach speed at junction inlet</span></div>
          <div class="eq-var"><span class="eq-var-sym">D<sub>h</sub></span><span class="eq-var-def">Hydraulic diameter of the approach lane</span></div>
          <div class="eq-var"><span class="eq-var-sym">μ<sub>eff</sub></span><span class="eq-var-def">Effective viscosity — weighted by vehicle mix · the variable nobody has computed</span></div>
        </div>
      </div>

      <div class="physics-prose">
        <h3>Laminar, transitional, turbulent.</h3>
        <p>In classical fluid mechanics, the Reynolds number separates smooth flow from chaos. We propose that mixed traffic exhibits the same regime structure — that there exists a <strong>critical Re</strong> above which a junction collapses from orderly merging into self-sustaining jam propagation.</p>
        <p>The central research question is empirical: <strong>does this threshold hold for Delhi?</strong> And if it does — at what value, and how does it shift with composition?</p>

        <div class="threshold-bands">
          <div class="threshold-band laminar">
            <div class="tb-val">Re &lt; 500</div>
            <div class="tb-state">Laminar — orderly, predictable lanes</div>
            <div class="tb-dot"></div>
          </div>
          <div class="threshold-band transitional">
            <div class="tb-val">Re 500–2000</div>
            <div class="tb-state">Transitional — weaving, slow merges</div>
            <div class="tb-dot"></div>
          </div>
          <div class="threshold-band turbulent">
            <div class="tb-val">Re &gt; 2000</div>
            <div class="tb-state">Turbulent — chaotic, jam propagation</div>
            <div class="tb-dot"></div>
          </div>
        </div>
        <p style="font-size: 13px; color: var(--ink-mute); margin-top: 20px; font-style: italic;">Thresholds are hypothetical at this stage. Empirical calibration against Delhi field data is the year-one objective.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ LITERATURE GAP ============ -->
<section id="literature">
  <div class="container">
    <span class="section-num">04 · The Literature Gap</span>
    <h2 class="section-title">Six decades of traffic modelling.<br><span class="ital">None of it built for Delhi.</span></h2>

    <div class="lit-grid">
      <div class="lit-card">
        <div class="lit-yr">1955</div>
        <div class="lit-name">LWR Model</div>
        <div class="lit-auth">Lighthill, Whitham, Richards</div>
        <div class="lit-desc">The original traffic-fluid model. Treats traffic as a single compressible fluid. Foundation of nearly every macroscopic model since.</div>
        <div class="lit-gap">Homogeneous single fluid · no vehicle heterogeneity</div>
      </div>

      <div class="lit-card">
        <div class="lit-yr">1992</div>
        <div class="lit-name">Nagel-Schreckenberg</div>
        <div class="lit-auth">Cellular automata</div>
        <div class="lit-desc">The dominant model for Indian traffic simulations. Each vehicle is an independent agent on a 1D lattice following local rules. Used by CRRI and NITI Aayog.</div>
        <div class="lit-gap">Treats all vehicles identically · no viscosity analogy</div>
      </div>

      <div class="lit-card">
        <div class="lit-yr">1995</div>
        <div class="lit-name">Helbing's Gas-Kinetic</div>
        <div class="lit-auth">Navier-Stokes analogue</div>
        <div class="lit-desc">Extended the fluid analogy via a Boltzmann-like kinetic equation. Couples density, mean speed, and speed variance. More rigorous than LWR.</div>
        <div class="lit-gap">Still single-species · designed for European highway traffic</div>
      </div>

      <div class="lit-card">
        <div class="lit-yr">2000</div>
        <div class="lit-name">IDM / Car-Following</div>
        <div class="lit-auth">Treiber et al.</div>
        <div class="lit-desc">Intelligent Driver Model — microscopic, models individual vehicle behaviour through gap-acceptance and desired speed. Widely cited.</div>
        <div class="lit-gap">Calibrated for car-dominated fleets · breaks down without lane discipline</div>
      </div>

      <div class="lit-card">
        <div class="lit-yr">2000s · 2020s</div>
        <div class="lit-name">PCT / Mixed Traffic</div>
        <div class="lit-auth">India-specific IIT &amp; CRRI attempts</div>
        <div class="lit-desc">Empirical PCU (Passenger Car Unit) equivalency factors patched onto LWR to handle non-motorised and mixed transport in Indian conditions.</div>
        <div class="lit-gap">Empirical patch-ups to LWR · no underlying physics change</div>
      </div>

      <div class="lit-card" style="background: linear-gradient(180deg, var(--paper-warm), var(--paper));">
        <div class="lit-yr" style="color: var(--hot);">2023 · Closest precedent</div>
        <div class="lit-name">Traffic Flow Factor (TFF)</div>
        <div class="lit-auth">Reynolds analogue · single-phase</div>
        <div class="lit-desc">The most recent work closest to ours — first paper to formally introduce a Reynolds-number-like metric for traffic flow. Our jumping-off point.</div>
        <div class="lit-gap">Single-phase · not validated for mixed heterogeneous fleets</div>
      </div>
    </div>

    <div style="margin-top: 56px; padding: 32px 40px; border-left: 3px solid var(--hot); background: var(--paper-warm); max-width: 900px;">
      <div style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hot); margin-bottom: 12px;">The MVTFD Gap</div>
      <p style="font-family: var(--serif); font-size: 21px; line-height: 1.5; font-weight: 300; color: var(--ink);">No existing framework combines <em style="font-style: italic; color: var(--hot);">multi-class heterogeneity</em> with <em style="font-style: italic; color: var(--hot);">fluid-mechanics physics</em> at <em style="font-style: italic; color: var(--hot);">junction scale</em>. That gap is what this programme exists to close.</p>
    </div>
  </div>
</section>

<!-- ============ TASKS / WORK PROGRAMME ============ -->
<section class="tasks-section" id="tasks">
  <div class="container">
    <span class="section-num">05 · The Work Programme</span>
    <h2 class="section-title">Six tracks. One paper.<br><span class="ital" style="color: var(--hot-soft);">A year of work.</span></h2>

    <div class="task-list">
      <div class="task-row">
        <div class="task-id">T1</div>
        <div class="task-content">
          <h4>Literature review · global traffic fluid models</h4>
          <p>Structured review of all major macroscopic and fluid-analogy models. Original paper, core assumptions, vehicle types it was designed for, prior application to Indian traffic, and the precise gap relative to MVTFD.</p>
        </div>
        <div class="task-tag">Literature</div>
      </div>

      <div class="task-row">
        <div class="task-id">T2</div>
        <div class="task-content">
          <h4>India-specific model audit</h4>
          <p>Document the simulation tools state PWDs and traffic planners actually use. CRRI reports, NITI Aayog transport documents, IRC junction design guidelines, MoRTH standards — and the assumptions baked into each.</p>
        </div>
        <div class="task-tag">Literature</div>
      </div>

      <div class="task-row">
        <div class="task-id">T3</div>
        <div class="task-content">
          <h4>Multiphase flow literature · the physics side</h4>
          <p>Survey of multiphase fluid models from chemical engineering and biomedical research — Bingham plastic, Herschel-Bulkley, Carreau, blood-flow analogues. Identify which is the best structural fit for the vehicle-mix problem.</p>
        </div>
        <div class="task-tag">Literature</div>
      </div>

      <div class="task-row">
        <div class="task-id">T4</div>
        <div class="task-content">
          <h4>Junction candidate shortlist · Delhi field sites</h4>
          <p>Identify 4–6 candidate Delhi junctions for field data collection. Each documented with vehicle mix, geometry sketch, known congestion pattern, and accessibility for camera placement. Two sites selected after joint field visit.</p>
        </div>
        <div class="task-tag">Field</div>
      </div>

      <div class="task-row">
        <div class="task-id">T5</div>
        <div class="task-content">
          <h4>μ<sub>eff</sub> parameter derivation · first attempt</h4>
          <p>From published data on vehicle dimensions, typical speeds, and gap-following behaviour: a first-pass derivation of effective viscosity for each Indian vehicle class. Starting from gap acceptance, speed variance, and lateral clearance.</p>
        </div>
        <div class="task-tag">Analysis</div>
      </div>

      <div class="task-row">
        <div class="task-id">T6</div>
        <div class="task-content">
          <h4>Re computation at two Delhi junctions</h4>
          <p>Compute the modified Reynolds number across morning and evening peak windows at the two selected sites. Test whether the proposed threshold reliably predicts the onset of jam propagation.</p>
        </div>
        <div class="task-tag">Validation</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ GOAL ============ -->
<section id="goal">
  <div class="container">
    <span class="section-num">06 · What This Is Building Toward</span>
    <h2 class="section-title">One paper, then a programme.<br><span class="ital">Delhi as the world's best laboratory.</span></h2>

    <div class="goal-grid">
      <div class="goal-card">
        <div class="goal-tag">The Paper</div>
        <div class="goal-head">A co-authored working paper, on the table by end of year one.</div>
        <ul class="goal-list">
          <li>Derive μ<sub>eff</sub> for each Indian vehicle class</li>
          <li>Compute Re at two Delhi junctions, peak and off-peak</li>
          <li>Test the Re threshold as a jam-onset predictor</li>
          <li>Co-authored with Prof. Mayank Kumar, IIT Delhi</li>
          <li>Target journal — Transportation Research Part B</li>
        </ul>
      </div>

      <div class="goal-card" style="background: var(--paper);">
        <div class="goal-tag">The Bigger Picture</div>
        <div class="goal-head">The first multi-viscosity traffic model in the world, built where it was needed first.</div>
        <ul class="goal-list">
          <li>First multi-viscosity traffic model designed for India</li>
          <li>Foundation for an evidence-based junction design standard</li>
          <li>Transferable to Mumbai, Bengaluru, Dhaka, Cairo, Lagos</li>
          <li>Anchors a longer research programme on mixed-flow cities</li>
          <li>Positions Delhi as the world's best test laboratory</li>
        </ul>
      </div>
    </div>

    <div class="success-banner">
      <div class="success-tag">What success looks like</div>
      <h3>One published working paper, co-authored with IIT Delhi, showing that a modified Reynolds number predicts jam onset <em>better than any existing model</em> for mixed Indian traffic. That's it. That's the whole goal for year one. Everything else — the full simulation, the junction design codes, the policy work — <em>comes after that one paper exists.</em></h3>
    </div>
  </div>
</section>

<!-- ============ PARTNERS ============ -->
<section class="partners-section" style="border-bottom: 1px solid var(--rule);">
  <div class="container">
    <div class="partners-lbl">In Partnership With</div>
    <div class="partners-row">
      <div class="partner">Massive Earth Foundation<span class="partner-sub">Programme lead</span></div>
      <div class="partner-divider"></div>
      <div class="partner">IIT Delhi<span class="partner-sub">Dept. of Mechanical Engineering</span></div>
      <div class="partner-divider"></div>
      <div class="partner">Prof. Mayank Kumar<span class="partner-sub">Faculty supervisor</span></div>
    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Massive Earth <em>Foundation</em></div>
        <p style="margin-top: 16px; font-size: 14px; color: rgba(244, 239, 230, 0.65); max-width: 380px; line-height: 1.6;">A research foundation working at the intersection of urban systems, climate, and the built environment in Indian cities.</p>
      </div>
      <div class="footer-col">
        <h5>Related Projects</h5>
        <a href="#">Urban Heat Island Effect</a>
        <a href="#">Walkability Index</a>
        <a href="#">Air Pollution Mapping</a>
        <a href="#">City Waste Projects</a>
      </div>
      <div class="footer-col">
        <h5>Get In Touch</h5>
        <a href="#">research@massivefoundation.org</a>
        <a href="#">Programme inquiries</a>
        <a href="#">Press &amp; media</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Massive Earth Foundation</span>
      <span>MVTFD · Programme 07 · v1.0</span>
    </div>
  </div>
</footer>
`;

export default function MVTFDPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); (observer as IntersectionObserver).unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mv-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </div>
  );
}
