"use client";
import { useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --red: #E1261C;
    --red-deep: #B81A12;
    --ink: #0E0E0E;
    --ink-soft: #1a1a1a;
    --paper: #F6F3EC;
    --paper-warm: #EFEAE0;
    --line: #D9D2C3;
    --muted: #6B6357;
    --green: #2D5F3F;
    --water: #1F4E79;
    --display: 'Fraunces', 'Times New Roman', serif;
    --body: 'Inter Tight', system-ui, sans-serif;
    --mono: 'JetBrains Mono', 'Courier New', monospace;
  }

  .ag-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .ag-wrap {
    font-family: var(--body);
    background: var(--paper);
    color: var(--ink);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ─── Grain texture overlay ─── */
  .ag-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1000;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E");
  }

  /* ─── Navigation ─── */
  .ag-wrap .nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 18px 40px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(246, 243, 236, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color .3s;
  }
  .ag-wrap .nav.scrolled { border-color: var(--line); }
  .ag-wrap .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--display);
    font-weight: 600; font-size: 19px;
    letter-spacing: -0.01em;
  }
  .ag-wrap .nav-logo-mark {
    width: 22px; height: 22px;
    background: var(--red);
    clip-path: polygon(0 0, 100% 0, 100% 60%, 60% 100%, 0 100%);
  }
  .ag-wrap .nav-links {
    display: flex; gap: 28px;
    font-size: 13px; font-weight: 500;
  }
  .ag-wrap .nav-links a {
    color: var(--ink); text-decoration: none;
    opacity: 0.7; transition: opacity .2s;
  }
  .ag-wrap .nav-links a:hover { opacity: 1; }
  .ag-wrap .nav-cta {
    font-size: 12px; font-weight: 600;
    padding: 9px 16px;
    background: var(--ink);
    color: var(--paper);
    text-decoration: none;
    border-radius: 0;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  @media (max-width: 760px) {
    .ag-wrap .nav { padding: 14px 20px; }
    .ag-wrap .nav-links { display: none; }
  }

  /* ─── Hero ─── */
  .ag-wrap .hero {
    min-height: 100vh;
    padding: 60px 40px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative;
    background:
      radial-gradient(ellipse at 80% 20%, rgba(45,95,63,0.08), transparent 50%),
      radial-gradient(ellipse at 10% 90%, rgba(31,78,121,0.06), transparent 50%),
      var(--paper);
    overflow: hidden;
  }
  .ag-wrap .hero-meta {
    display: flex; justify-content: space-between;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--line);
    padding-bottom: 18px;
    margin-bottom: 60px;
  }
  .ag-wrap .hero-meta span { display: inline-block; }
  .ag-wrap .hero-meta-tag {
    color: var(--red);
    font-weight: 600;
  }

  .ag-wrap .hero-headline {
    font-family: var(--display);
    font-weight: 400;
    font-size: clamp(48px, 9.5vw, 168px);
    line-height: 0.92;
    letter-spacing: -0.035em;
    margin-bottom: 40px;
    font-variation-settings: "opsz" 144;
  }
  .ag-wrap .hero-headline .accent {
    font-style: italic;
    font-weight: 300;
    color: var(--red);
  }
  .ag-wrap .hero-headline .block {
    display: block;
  }
  .ag-wrap .hero-headline .indent {
    display: block;
    padding-left: 12vw;
  }

  .ag-wrap .hero-bottom {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 60px;
    align-items: end;
    margin-top: 40px;
  }
  .ag-wrap .hero-lede {
    font-size: clamp(16px, 1.4vw, 19px);
    line-height: 1.55;
    max-width: 540px;
    color: var(--ink-soft);
  }
  .ag-wrap .hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 24px;
    padding: 28px 0;
    border-top: 1px solid var(--line);
  }
  .ag-wrap .stat-num {
    font-family: var(--display);
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .ag-wrap .stat-num .unit {
    font-size: 0.5em;
    color: var(--red);
    font-weight: 600;
    margin-left: 2px;
  }
  .ag-wrap .stat-label {
    font-family: var(--mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .ag-wrap .hero { padding: 40px 22px 60px; }
    .ag-wrap .hero-bottom { grid-template-columns: 1fr; gap: 40px; }
    .ag-wrap .hero-headline .indent { padding-left: 0; }
    .ag-wrap .hero-meta { font-size: 9.5px; flex-wrap: wrap; gap: 8px; }
  }

  /* ─── Section base ─── */
  .ag-wrap section { padding: 120px 40px; position: relative; }
  @media (max-width: 760px) { .ag-wrap section { padding: 80px 22px; } }

  .ag-wrap .section-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--red);
    margin-bottom: 24px;
  }
  .ag-wrap .section-tag::before {
    content: ''; width: 28px; height: 1px; background: var(--red);
  }
  .ag-wrap .section-title {
    font-family: var(--display);
    font-weight: 400;
    font-size: clamp(32px, 5vw, 72px);
    line-height: 1.0;
    letter-spacing: -0.025em;
    margin-bottom: 56px;
    max-width: 14ch;
    font-variation-settings: "opsz" 144;
  }
  .ag-wrap .section-title em { font-style: italic; color: var(--red); font-weight: 300; }

  /* ─── Problem section ─── */
  .ag-wrap .problem {
    background: var(--ink);
    color: var(--paper);
  }
  .ag-wrap .problem .section-title { color: var(--paper); max-width: 18ch; }
  .ag-wrap .problem .section-tag { color: #ff7a72; }
  .ag-wrap .problem .section-tag::before { background: #ff7a72; }

  .ag-wrap .problem-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
    align-items: start;
  }
  .ag-wrap .problem-lede {
    font-size: clamp(17px, 1.5vw, 22px);
    line-height: 1.5;
    color: #d4cfc4;
    font-family: var(--display);
    font-weight: 300;
    font-variation-settings: "opsz" 144;
  }
  .ag-wrap .problem-lede em { color: var(--red); font-style: italic; }

  .ag-wrap .problem-list {
    display: flex; flex-direction: column;
    gap: 0;
  }
  .ag-wrap .problem-item {
    padding: 26px 0;
    border-top: 1px solid #2a2a2a;
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 20px;
    align-items: start;
  }
  .ag-wrap .problem-item:last-child { border-bottom: 1px solid #2a2a2a; }
  .ag-wrap .problem-item-num {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--red);
    padding-top: 4px;
  }
  .ag-wrap .problem-item h4 {
    font-family: var(--display);
    font-weight: 500;
    font-size: 19px;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .ag-wrap .problem-item p {
    font-size: 14.5px;
    color: #a8a39a;
    line-height: 1.55;
  }

  @media (max-width: 900px) {
    .ag-wrap .problem-grid { grid-template-columns: 1fr; gap: 48px; }
  }

  /* ─── Solution section ─── */
  .ag-wrap .solution { background: var(--paper-warm); }
  .ag-wrap .solution-intro {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    margin-bottom: 80px;
    align-items: end;
  }
  .ag-wrap .solution-intro p {
    font-size: 17px;
    line-height: 1.6;
    color: var(--ink-soft);
  }

  .ag-wrap .solution-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--ink);
  }
  .ag-wrap .solution-card {
    padding: 40px 32px 48px;
    border-right: 1px solid var(--line);
    position: relative;
    transition: background .3s;
  }
  .ag-wrap .solution-card:last-child { border-right: none; }
  .ag-wrap .solution-card:hover { background: rgba(225, 38, 28, 0.04); }
  .ag-wrap .solution-card-num {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--red);
    margin-bottom: 28px;
    display: block;
  }
  .ag-wrap .solution-card-icon {
    width: 48px; height: 48px;
    margin-bottom: 24px;
  }
  .ag-wrap .solution-card h3 {
    font-family: var(--display);
    font-weight: 500;
    font-size: 26px;
    line-height: 1.1;
    letter-spacing: -0.015em;
    margin-bottom: 14px;
  }
  .ag-wrap .solution-card p {
    font-size: 14.5px;
    line-height: 1.6;
    color: var(--muted);
  }

  @media (max-width: 900px) {
    .ag-wrap .solution-intro { grid-template-columns: 1fr; gap: 32px; }
    .ag-wrap .solution-cards { grid-template-columns: 1fr; }
    .ag-wrap .solution-card { border-right: none; border-bottom: 1px solid var(--line); }
    .ag-wrap .solution-card:last-child { border-bottom: none; }
  }

  /* ─── Impact / Stats band ─── */
  .ag-wrap .impact-band {
    background: var(--red);
    color: var(--paper);
    padding: 100px 40px;
  }
  .ag-wrap .impact-tag {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.7);
    margin-bottom: 50px;
    display: flex; align-items: center; gap: 12px;
  }
  .ag-wrap .impact-tag::before { content: ''; width: 28px; height: 1px; background: rgba(255,255,255,0.7); }

  .ag-wrap .impact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  .ag-wrap .impact-stat {
    border-top: 1px solid rgba(255,255,255,0.3);
    padding-top: 22px;
  }
  .ag-wrap .impact-stat-num {
    font-family: var(--display);
    font-weight: 400;
    font-size: clamp(56px, 7vw, 110px);
    line-height: 0.95;
    letter-spacing: -0.04em;
    font-variation-settings: "opsz" 144;
  }
  .ag-wrap .impact-stat-num .unit {
    font-size: 0.4em;
    vertical-align: super;
    margin-left: 4px;
  }
  .ag-wrap .impact-stat-label {
    font-size: 14px;
    line-height: 1.4;
    margin-top: 14px;
    max-width: 22ch;
    opacity: 0.9;
  }

  @media (max-width: 900px) {
    .ag-wrap .impact-band { padding: 70px 22px; }
    .ag-wrap .impact-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
  }

  /* ─── How it works (system diagram) ─── */
  .ag-wrap .system {
    background: var(--paper);
  }
  .ag-wrap .system-wrap {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: start;
  }
  .ag-wrap .system-text h3 {
    font-family: var(--display);
    font-weight: 500;
    font-size: 22px;
    margin: 30px 0 10px;
    letter-spacing: -0.01em;
  }
  .ag-wrap .system-text p {
    font-size: 15px;
    line-height: 1.65;
    color: var(--muted);
  }
  .ag-wrap .system-text h3:first-child { margin-top: 0; }

  .ag-wrap .system-diagram {
    background: var(--ink);
    border-radius: 2px;
    padding: 40px;
    color: var(--paper);
    font-family: var(--mono);
    font-size: 12px;
    position: relative;
    min-height: 480px;
  }
  .ag-wrap .system-diagram svg { width: 100%; height: auto; display: block; }

  @media (max-width: 900px) {
    .ag-wrap .system-wrap { grid-template-columns: 1fr; gap: 40px; }
    .ag-wrap .system-diagram { padding: 24px; }
  }

  /* ─── Beneficiaries / Location ─── */
  .ag-wrap .field {
    background: var(--paper-warm);
    position: relative;
  }
  .ag-wrap .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
  .ag-wrap .field-block {
    border-top: 2px solid var(--ink);
    padding-top: 32px;
  }
  .ag-wrap .field-block-label {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--red);
    margin-bottom: 18px;
  }
  .ag-wrap .field-block h3 {
    font-family: var(--display);
    font-weight: 500;
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }
  .ag-wrap .field-block p {
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-soft);
    margin-bottom: 16px;
  }
  .ag-wrap .field-list {
    list-style: none;
    margin-top: 18px;
  }
  .ag-wrap .field-list li {
    padding: 12px 0;
    border-bottom: 1px dashed var(--line);
    font-size: 14.5px;
    display: flex; justify-content: space-between;
    color: var(--ink-soft);
  }
  .ag-wrap .field-list li span:last-child {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 760px) {
    .ag-wrap .field-grid { grid-template-columns: 1fr; gap: 48px; }
  }

  /* ─── Milestones / Status ─── */
  .ag-wrap .milestones { background: var(--paper); }
  .ag-wrap .milestone-list {
    display: flex; flex-direction: column;
  }
  .ag-wrap .milestone-row {
    display: grid;
    grid-template-columns: 110px 1fr auto;
    gap: 40px;
    padding: 28px 0;
    border-top: 1px solid var(--line);
    align-items: center;
  }
  .ag-wrap .milestone-row:last-child { border-bottom: 1px solid var(--line); }
  .ag-wrap .milestone-num {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .ag-wrap .milestone-row h4 {
    font-family: var(--display);
    font-weight: 500;
    font-size: clamp(20px, 2.2vw, 28px);
    letter-spacing: -0.015em;
  }
  .ag-wrap .milestone-status {
    font-family: var(--mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 6px 12px;
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    white-space: nowrap;
  }
  .ag-wrap .milestone-status.in-progress {
    background: transparent;
    color: var(--red);
    border-color: var(--red);
  }

  @media (max-width: 760px) {
    .ag-wrap .milestone-row {
      grid-template-columns: 1fr;
      gap: 8px;
      padding: 20px 0;
    }
    .ag-wrap .milestone-status { justify-self: start; }
  }

  /* ─── Partners ─── */
  .ag-wrap .partners {
    background: var(--ink);
    color: var(--paper);
    padding: 100px 40px;
  }
  .ag-wrap .partners h3 {
    font-family: var(--display);
    font-weight: 400;
    font-size: clamp(28px, 3.5vw, 48px);
    line-height: 1.1;
    margin-bottom: 48px;
    max-width: 16ch;
    letter-spacing: -0.02em;
  }
  .ag-wrap .partners h3 em { color: #ff7a72; font-style: italic; font-weight: 300; }
  .ag-wrap .partner-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 32px;
    border-top: 1px solid #2a2a2a;
    padding-top: 32px;
  }
  .ag-wrap .partner-item {
    font-size: 14.5px;
    line-height: 1.5;
  }
  .ag-wrap .partner-item-name {
    font-family: var(--display);
    font-weight: 500;
    font-size: 18px;
    color: var(--paper);
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  .ag-wrap .partner-item-role {
    font-family: var(--mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #ff7a72;
    margin-bottom: 8px;
  }
  .ag-wrap .partner-item p {
    color: #a8a39a;
    font-size: 13.5px;
  }

  @media (max-width: 760px) {
    .ag-wrap .partners { padding: 70px 22px; }
  }

  /* ─── CTA ─── */
  .ag-wrap .cta-band {
    background: var(--paper-warm);
    padding: 120px 40px;
    text-align: center;
  }
  .ag-wrap .cta-band h2 {
    font-family: var(--display);
    font-weight: 400;
    font-size: clamp(40px, 6.5vw, 96px);
    line-height: 0.98;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
    font-variation-settings: "opsz" 144;
  }
  .ag-wrap .cta-band h2 em { color: var(--red); font-style: italic; font-weight: 300; }
  .ag-wrap .cta-band p {
    max-width: 580px;
    margin: 0 auto 44px;
    font-size: 17px;
    line-height: 1.55;
    color: var(--muted);
  }
  .ag-wrap .cta-buttons {
    display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center;
  }
  .ag-wrap .btn {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 16px 28px;
    text-decoration: none;
    transition: transform .2s, background .2s;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .ag-wrap .btn-primary { background: var(--red); color: var(--paper); }
  .ag-wrap .btn-primary:hover { background: var(--red-deep); transform: translateY(-1px); }
  .ag-wrap .btn-secondary { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
  .ag-wrap .btn-secondary:hover { background: var(--ink); color: var(--paper); }

  @media (max-width: 760px) {
    .ag-wrap .cta-band { padding: 80px 22px; }
  }

  /* ─── Footer ─── */
  .ag-wrap footer {
    background: var(--ink);
    color: var(--paper);
    padding: 60px 40px 40px;
  }
  .ag-wrap .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #2a2a2a;
  }
  .ag-wrap .footer-brand {
    font-family: var(--display);
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.015em;
    margin-bottom: 14px;
  }
  .ag-wrap .footer-brand-mark {
    width: 28px; height: 28px;
    background: var(--red);
    clip-path: polygon(0 0, 100% 0, 100% 60%, 60% 100%, 0 100%);
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .ag-wrap .footer-tagline {
    color: #a8a39a;
    font-size: 14px;
    max-width: 320px;
    line-height: 1.5;
  }
  .ag-wrap .footer-col h5 {
    font-family: var(--mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #ff7a72;
    margin-bottom: 16px;
  }
  .ag-wrap .footer-col a, .ag-wrap .footer-col p {
    display: block;
    font-size: 14px;
    color: #d4cfc4;
    text-decoration: none;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .ag-wrap .footer-col a:hover { color: var(--paper); }
  .ag-wrap .footer-bottom {
    margin-top: 24px;
    display: flex; justify-content: space-between;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  @media (max-width: 760px) {
    .ag-wrap footer { padding: 50px 22px 30px; }
    .ag-wrap .footer-top { grid-template-columns: 1fr 1fr; gap: 30px; }
    .ag-wrap .footer-bottom { flex-direction: column; gap: 8px; }
  }

  /* ─── Scroll-triggered animations ─── */
  .ag-wrap .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
  }
  .ag-wrap .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ─── Marquee ─── */
  .ag-wrap .marquee {
    overflow: hidden;
    background: var(--ink);
    color: var(--paper);
    padding: 22px 0;
    border-top: 1px solid #2a2a2a;
    border-bottom: 1px solid #2a2a2a;
  }
  .ag-wrap .marquee-track {
    display: flex;
    gap: 80px;
    width: max-content;
    animation: ag-scroll 40s linear infinite;
    font-family: var(--display);
    font-size: clamp(24px, 3.5vw, 44px);
    font-weight: 400;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .ag-wrap .marquee-track em { color: var(--red); font-style: italic; font-weight: 300; }
  .ag-wrap .marquee-dot {
    color: var(--red);
    font-size: 0.6em;
    align-self: center;
  }
  @keyframes ag-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const HTML = `
<!-- ═══════════ HERO ═══════════ -->
<section class="hero">
  <div>
    <h1 class="hero-headline">
      <span class="block">AgriGuru.</span>
      <span class="indent"><em class="accent">Enabling</em></span>
      <span class="block">Irrigation Water</span>
      <span class="indent">Conservation.</span>
    </h1>
  </div>

  <div class="hero-bottom">
    <p class="hero-lede">
      An IoT-enabled smart irrigation system for paddy farming that brings real-time
      water-level sensing, automated pump control, and AI-driven Alternate Wetting
      and Drying (AWD) to the fields of Punjab — where the groundwater table is
      falling faster than almost anywhere on Earth.
    </p>

    <div class="hero-stats">
      <div>
        <div class="stat-num">35–38<span class="unit">%</span></div>
        <div class="stat-label">Irrigation water saved</div>
      </div>
      <div>
        <div class="stat-num">85<span class="unit">%</span></div>
        <div class="stat-label">CH₄ emission cut</div>
      </div>
      <div>
        <div class="stat-num">500<span class="unit">ac</span></div>
        <div class="stat-label">Pilot land coverage</div>
      </div>
      <div>
        <div class="stat-num">TRL-6</div>
        <div class="stat-label">Validation achieved</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ MARQUEE ═══════════ -->
<div class="marquee">
  <div class="marquee-track">
    <span>Save Water</span><span class="marquee-dot">●</span>
    <span><em>Cut Methane</em></span><span class="marquee-dot">●</span>
    <span>Recharge Groundwater</span><span class="marquee-dot">●</span>
    <span><em>Empower Farmers</em></span><span class="marquee-dot">●</span>
    <span>Save Water</span><span class="marquee-dot">●</span>
    <span><em>Cut Methane</em></span><span class="marquee-dot">●</span>
    <span>Recharge Groundwater</span><span class="marquee-dot">●</span>
    <span><em>Empower Farmers</em></span><span class="marquee-dot">●</span>
  </div>
</div>

<!-- ═══════════ PROBLEM ═══════════ -->
<section class="problem" id="problem">
  <div class="reveal">
    <div class="section-tag">01 — The Crisis</div>
    <h2 class="section-title">Punjab is running <em>dry</em>.</h2>
  </div>

  <div class="problem-grid">
    <p class="problem-lede reveal">
      Decades of flood irrigation for paddy cultivation have pushed Punjab's
      groundwater table into <em>critical decline</em>. Farmers irrigate by
      habit, not by data. Pumps run unmonitored. Water — and electricity —
      vanish into waterlogged fields, while methane bubbles up from the
      flooding into the atmosphere.
    </p>

    <div class="problem-list">
      <div class="problem-item reveal">
        <div class="problem-item-num">/01</div>
        <div>
          <h4>Groundwater depletion</h4>
          <p>Excessive irrigation in vast paddy farmlands has caused a sharp, sustained decline in Punjab's water table.</p>
        </div>
      </div>
      <div class="problem-item reveal">
        <div class="problem-item-num">/02</div>
        <div>
          <h4>Over-irrigation &amp; soil damage</h4>
          <p>Continuous flooding leads to waterlogging, soil degradation, and reduced crop productivity over time.</p>
        </div>
      </div>
      <div class="problem-item reveal">
        <div class="problem-item-num">/03</div>
        <div>
          <h4>Methane emissions</h4>
          <p>Standing water in paddy fields generates significant CH₄ — one of agriculture's largest greenhouse gas sources.</p>
        </div>
      </div>
      <div class="problem-item reveal">
        <div class="problem-item-num">/04</div>
        <div>
          <h4>Manual, imprecise irrigation</h4>
          <p>Farmers lack real-time monitoring, making irrigation labour-intensive, inconsistent, and impossible to optimise.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ SOLUTION ═══════════ -->
<section class="solution" id="solution">
  <div class="reveal">
    <div class="section-tag">02 — The Solution</div>
    <h2 class="section-title">An <em>intelligent</em> irrigation system, built for the paddy field.</h2>
  </div>

  <div class="solution-intro reveal">
    <div></div>
    <p>
      AgriGuru combines water-level sensors, LoRa-based wireless communication,
      automated pump control, and a farmer-friendly mobile app to implement
      Alternate Wetting and Drying (AWD) at field scale. The system tells the
      pump when to start, when to stop, and the farmer — when to listen.
    </p>
  </div>

  <div class="solution-cards">
    <div class="solution-card reveal">
      <span class="solution-card-num">/ 01</span>
      <svg class="solution-card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4">
        <rect x="10" y="14" width="28" height="22" rx="1"/>
        <circle cx="24" cy="25" r="5"/>
        <path d="M10 20h28M16 14v-4M32 14v-4"/>
      </svg>
      <h3>Smart Hardware</h3>
      <p>In-house developed stainless-steel &amp; brass water-level sensors, custom PCB-based control units, and LoRa modules engineered to survive harsh paddy-field conditions.</p>
    </div>

    <div class="solution-card reveal">
      <span class="solution-card-num">/ 02</span>
      <svg class="solution-card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M8 32c4-8 12-8 16 0s12 8 16 0"/>
        <path d="M8 24c4-8 12-8 16 0s12 8 16 0"/>
        <circle cx="24" cy="14" r="2.5"/>
      </svg>
      <h3>AI-Driven Logic</h3>
      <p>Edge-deployed AI reads water levels in real time and decides when to start or stop the pump using the AWD method — wetting and drying on the field's terms, not the calendar's.</p>
    </div>

    <div class="solution-card reveal">
      <span class="solution-card-num">/ 03</span>
      <svg class="solution-card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4">
        <rect x="14" y="6" width="20" height="36" rx="3"/>
        <circle cx="24" cy="36" r="1.6" fill="currentColor"/>
        <path d="M19 14h10M19 19h10M19 24h6"/>
      </svg>
      <h3>Farmer App</h3>
      <p>A simple mobile interface lets farmers monitor their field, receive alerts, and control irrigation remotely — putting precision agriculture into one familiar, pocket-sized tool.</p>
    </div>
  </div>
</section>

<!-- ═══════════ IMPACT BAND ═══════════ -->
<section class="impact-band" id="impact">
  <div class="impact-tag reveal">03 — Impact Targets</div>
  <div class="impact-grid">
    <div class="impact-stat reveal">
      <div class="impact-stat-num">38<span class="unit">%</span></div>
      <div class="impact-stat-label">Reduction in irrigation water use across pilot fields</div>
    </div>
    <div class="impact-stat reveal">
      <div class="impact-stat-num">85<span class="unit">%</span></div>
      <div class="impact-stat-label">Reduction in seasonal methane emissions from paddy</div>
    </div>
    <div class="impact-stat reveal">
      <div class="impact-stat-num">500<span class="unit">ac</span></div>
      <div class="impact-stat-label">Pilot acreage across Mohali &amp; Fatehgarh Sahib</div>
    </div>
    <div class="impact-stat reveal">
      <div class="impact-stat-num">20<span class="unit">+</span></div>
      <div class="impact-stat-label">Medium-scale farmers onboarded in the pilot phase</div>
    </div>
  </div>
</section>

<!-- ═══════════ HOW IT WORKS / SYSTEM ═══════════ -->
<section class="system">
  <div class="reveal">
    <div class="section-tag">04 — How it Works</div>
    <h2 class="section-title">From <em>sensor</em> to soil — a closed loop.</h2>
  </div>

  <div class="system-wrap">
    <div class="system-text">
      <div class="reveal">
        <h3>Sense</h3>
        <p>SS &amp; brass water-level probes installed in the paddy field continuously measure standing water depth — engineered to resist corrosion, fertiliser, and the long Punjab summer.</p>
      </div>
      <div class="reveal">
        <h3>Transmit</h3>
        <p>Field nodes communicate over LoRa to a central unit, removing dependency on cellular coverage in remote agricultural areas.</p>
      </div>
      <div class="reveal">
        <h3>Decide</h3>
        <p>An edge-deployed AI model evaluates each reading against AWD thresholds and triggers irrigation only when the field genuinely needs it.</p>
      </div>
      <div class="reveal">
        <h3>Act</h3>
        <p>An automated pump controller switches the motor on or off, with manual override and remote control available to the farmer via the mobile app.</p>
      </div>
    </div>

    <div class="system-diagram reveal">
      <svg viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#E1261C"/>
          </marker>
        </defs>

        <!-- Sun -->
        <circle cx="440" cy="50" r="20" fill="none" stroke="#E1261C" stroke-width="1"/>
        <circle cx="440" cy="50" r="12" fill="#E1261C" opacity="0.4"/>

        <!-- Field ground -->
        <path d="M0,380 Q250,360 500,380 L500,480 L0,480 Z" fill="#1a1a1a" stroke="#3a3a3a"/>

        <!-- Water in field -->
        <path d="M0,395 Q250,378 500,395 L500,420 Q250,408 0,420 Z" fill="#1F4E79" opacity="0.55"/>
        <path d="M40,400 Q70,395 100,400" stroke="#5b8ec7" fill="none" stroke-width="0.8"/>
        <path d="M180,402 Q210,397 240,402" stroke="#5b8ec7" fill="none" stroke-width="0.8"/>
        <path d="M340,400 Q370,395 400,400" stroke="#5b8ec7" fill="none" stroke-width="0.8"/>

        <!-- Rice plants -->
        <g stroke="#7fb069" stroke-width="1" fill="none">
          <path d="M60 380 L60 360 M55 365 L60 358 M65 365 L60 358"/>
          <path d="M130 380 L130 358 M125 363 L130 356 M135 363 L130 356"/>
          <path d="M200 380 L200 362 M195 366 L200 360 M205 366 L200 360"/>
          <path d="M280 380 L280 358 M275 363 L280 356 M285 363 L280 358"/>
          <path d="M360 380 L360 362 M355 366 L360 360 M365 366 L360 360"/>
          <path d="M430 380 L430 360 M425 365 L430 358 M435 365 L430 358"/>
        </g>

        <!-- Sensor node in field -->
        <line x1="250" y1="395" x2="250" y2="290" stroke="#E1261C" stroke-width="1.5"/>
        <rect x="232" y="265" width="36" height="28" fill="#E1261C" stroke="#fff" stroke-width="0.8"/>
        <text x="250" y="282" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="8" font-weight="600">SENSOR</text>
        <circle cx="250" cy="395" r="2.5" fill="#fff"/>

        <!-- Wave signal from sensor -->
        <path d="M275 268 Q295 250 315 268" stroke="#E1261C" fill="none" stroke-width="1" opacity="0.7"/>
        <path d="M280 275 Q300 255 320 275" stroke="#E1261C" fill="none" stroke-width="1" opacity="0.5"/>
        <path d="M285 282 Q305 262 325 282" stroke="#E1261C" fill="none" stroke-width="1" opacity="0.3"/>

        <!-- Central unit (Edge AI) -->
        <rect x="350" y="200" width="120" height="70" fill="none" stroke="#fff" stroke-width="1"/>
        <text x="410" y="225" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="9" font-weight="600">EDGE AI</text>
        <text x="410" y="240" text-anchor="middle" fill="#a8a39a" font-family="JetBrains Mono" font-size="8">central unit</text>
        <text x="410" y="255" text-anchor="middle" fill="#a8a39a" font-family="JetBrains Mono" font-size="8">+ LoRa gateway</text>

        <!-- LoRa signal sensor -> edge -->
        <line x1="290" y1="245" x2="345" y2="232" stroke="#E1261C" stroke-width="0.8" stroke-dasharray="3 3" marker-end="url(#arrow)"/>
        <text x="305" y="220" fill="#E1261C" font-family="JetBrains Mono" font-size="7">LoRa</text>

        <!-- Cloud -->
        <ellipse cx="180" cy="120" rx="55" ry="22" fill="none" stroke="#fff" stroke-width="1"/>
        <text x="180" y="118" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="9" font-weight="600">CLOUD</text>
        <text x="180" y="132" text-anchor="middle" fill="#a8a39a" font-family="JetBrains Mono" font-size="7.5">analytics &amp; logs</text>

        <!-- Phone -->
        <rect x="40" y="200" width="60" height="100" rx="6" fill="none" stroke="#fff" stroke-width="1"/>
        <rect x="46" y="210" width="48" height="72" fill="#E1261C" opacity="0.15"/>
        <circle cx="70" cy="292" r="2" fill="#fff"/>
        <text x="70" y="240" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="8" font-weight="600">FARMER</text>
        <text x="70" y="252" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="8" font-weight="600">APP</text>
        <line x1="50" y1="262" x2="90" y2="262" stroke="#fff" stroke-width="0.5"/>
        <text x="70" y="272" text-anchor="middle" fill="#a8a39a" font-family="JetBrains Mono" font-size="6">water · 12cm</text>

        <!-- Cloud connections -->
        <line x1="180" y1="142" x2="180" y2="200" stroke="#E1261C" stroke-width="0.8" stroke-dasharray="3 3"/>
        <line x1="225" y1="120" x2="350" y2="215" stroke="#E1261C" stroke-width="0.8" stroke-dasharray="3 3"/>
        <line x1="105" y1="225" x2="200" y2="135" stroke="#E1261C" stroke-width="0.8" stroke-dasharray="3 3"/>

        <!-- Pump -->
        <circle cx="100" cy="380" r="22" fill="none" stroke="#fff" stroke-width="1.2"/>
        <circle cx="100" cy="380" r="6" fill="#E1261C"/>
        <text x="100" y="420" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="9" font-weight="600">PUMP</text>
        <text x="100" y="432" text-anchor="middle" fill="#a8a39a" font-family="JetBrains Mono" font-size="7">automated</text>

        <!-- Pump control signal -->
        <line x1="355" y1="260" x2="125" y2="370" stroke="#E1261C" stroke-width="0.8" stroke-dasharray="3 3" marker-end="url(#arrow)"/>
        <text x="220" y="320" fill="#E1261C" font-family="JetBrains Mono" font-size="7">CONTROL</text>

        <!-- Labels at top -->
        <text x="20" y="30" fill="#a8a39a" font-family="JetBrains Mono" font-size="9" letter-spacing="1.5">AGRIGURU · SYSTEM SCHEMATIC</text>
        <line x1="20" y1="40" x2="280" y2="40" stroke="#3a3a3a"/>
      </svg>
    </div>
  </div>
</section>

<!-- ═══════════ BENEFICIARIES / FIELD ═══════════ -->
<section class="field" id="field">
  <div class="reveal">
    <div class="section-tag">05 — On the Ground</div>
    <h2 class="section-title">Beneficiaries, geographies, partners <em>in the soil.</em></h2>
  </div>

  <div class="field-grid">
    <div class="field-block reveal">
      <div class="field-block-label">Who Benefits</div>
      <h3>Medium-scale paddy farmers across the Tricity belt.</h3>
      <p>
        Selected on the basis of groundwater dependency, willingness to adopt AWD,
        and active engagement in paddy cultivation. The pilot also extends to
        rural women in agriculture and agricultural students learning smart-farm
        practices.
      </p>
      <ul class="field-list">
        <li><span>Direct farmer beneficiaries</span><span>≈ 20 large-holding</span></li>
        <li><span>Pilot acreage</span><span>200–500 acres</span></li>
        <li><span>Community reach</span><span>3 villages +</span></li>
        <li><span>Adopter farmers (signed)</span><span>S. Sangha · S. Ajit Singh · S. Jashan Singh</span></li>
      </ul>
    </div>

    <div class="field-block reveal">
      <div class="field-block-label">Where</div>
      <h3>Punjab — where the table falls fastest.</h3>
      <p>
        Anchored at the Plaksha University Smart Farm in Mohali, with field
        deployments across Fatehgarh Sahib district and adjoining villages.
        Each site was chosen for its proximity to a stressed aquifer and its
        readiness to test instrumented rice cultivation.
      </p>
      <ul class="field-list">
        <li><span>Anchor site</span><span>Plaksha University · Mohali</span></li>
        <li><span>Field deployments</span><span>Dhaula · Sanghera · Trident</span></li>
        <li><span>Districts</span><span>Mohali · Fatehgarh Sahib</span></li>
        <li><span>Tech readiness</span><span>TRL-6 validated</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- ═══════════ MILESTONES ═══════════ -->
<section class="milestones">
  <div class="reveal">
    <div class="section-tag">06 — Project Status</div>
    <h2 class="section-title">From requirement to <em>real fields</em>.</h2>
  </div>

  <div class="milestone-list">
    <div class="milestone-row reveal">
      <div class="milestone-num">M01 · Q1</div>
      <h4>Requirement Finalisation &amp; BOM</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M02 · Q1–Q2</div>
      <h4>Hardware Procurement &amp; Sensor Fabrication</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M03 · Q2</div>
      <h4>Prototype Assembly · PCBs · Enclosures</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M04 · Q2–Q3</div>
      <h4>Software Integration &amp; Cloud Dashboard</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M05 · Q3</div>
      <h4>AI Model Training &amp; Edge Deployment</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M06 · Q3</div>
      <h4>Field Deployment — Dhaula · Sanghera · Trident</h4>
      <div class="milestone-status">Complete</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M07 · Q4</div>
      <h4>Performance Validation &amp; Farmer Feedback</h4>
      <div class="milestone-status in-progress">In Progress</div>
    </div>
    <div class="milestone-row reveal">
      <div class="milestone-num">M08 · Q4</div>
      <h4>Pilot Scaling &amp; Commercial Readiness</h4>
      <div class="milestone-status in-progress">In Progress</div>
    </div>
  </div>
</section>

<!-- ═══════════ PARTNERS ═══════════ -->
<section class="partners" id="partners">
  <h3 class="reveal">Built with farmers, researchers, and institutions who <em>know the land.</em></h3>
  <div class="partner-grid">
    <div class="partner-item reveal">
      <div class="partner-item-name">Massive Earth Foundation</div>
      <div class="partner-item-role">Incubation &amp; Programme</div>
      <p>AgriGuru is incubated under the AgroXLerate accelerator, MEF's flagship agri-tech programme.</p>
    </div>
    <div class="partner-item reveal">
      <div class="partner-item-name">Plaksha University · CSPA</div>
      <div class="partner-item-role">Research &amp; Anchor Site</div>
      <p>Provides the Smart Farm anchor location, academic guidance, and field-testing infrastructure.</p>
    </div>
    <div class="partner-item reveal">
      <div class="partner-item-name">Dr. S.S. Johal · PAU</div>
      <div class="partner-item-role">Agronomic Advisory</div>
      <p>Punjab Agricultural University expertise guiding AWD calibration and farmer engagement.</p>
    </div>
    <div class="partner-item reveal">
      <div class="partner-item-name">Trident Group</div>
      <div class="partner-item-role">Pilot Partner</div>
      <p>Field-testing collaboration across associated farming communities in Punjab.</p>
    </div>
    <div class="partner-item reveal">
      <div class="partner-item-name">Agriguru Technologies</div>
      <div class="partner-item-role">Implementation Team</div>
      <p>Engineering, R&amp;D and field operations led by Gaganpreet, Aditya Tomar &amp; Sanchit Gupta.</p>
    </div>
    <div class="partner-item reveal">
      <div class="partner-item-name">Farmer Champions</div>
      <div class="partner-item-role">Adopters</div>
      <p>S. Sangha, S. Ajit Singh, S. Jashan Singh &amp; others piloting the system on their land.</p>
    </div>
  </div>
</section>

<!-- ═══════════ CTA ═══════════ -->
<section class="cta-band" id="cta">
  <h2 class="reveal">Every <em>drop</em> conserved is a future <em>secured</em>.</h2>
  <p class="reveal">
    AgriGuru is ready for scale. Partner with us to deploy smart irrigation in
    more districts, fund the next cohort of farmer adopters, or bring the system
    into your CSR &amp; sustainability portfolio.
  </p>
  <div class="cta-buttons reveal">
    <a href="mailto:corporates@gomassive.org" class="btn btn-primary">Partner with Massive →</a>
    <a href="mailto:agrigurutechnologies@gmail.com" class="btn btn-secondary">Talk to the team</a>
  </div>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand"><span class="footer-brand-mark"></span>Massive Earth Foundation</div>
      <p class="footer-tagline">Building the ecosystem needed to solve climate change and pollution — through investments, research, and innovation.</p>
    </div>
    <div class="footer-col">
      <h5>Project</h5>
      <a href="#problem">The Problem</a>
      <a href="#solution">The Solution</a>
      <a href="#impact">Impact</a>
      <a href="#partners">Partners</a>
    </div>
    <div class="footer-col">
      <h5>Contact</h5>
      <a href="mailto:corporates@gomassive.org">corporates@gomassive.org</a>
      <a href="mailto:svs@gomassive.org">svs@gomassive.org</a>
      <a href="mailto:agrigurutechnologies@gmail.com">agrigurutechnologies@gmail.com</a>
    </div>
    <div class="footer-col">
      <h5>Find us</h5>
      <p>GoMassive Earth Network</p>
      <p>Golf Course Road, Gurgaon, HR</p>
      <a href="https://www.gomassive.in">www.gomassive.in</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© Massive Earth Foundation · AgriGuru Project Page</span>
    <span>Punjab · India · 2025–2026</span>
  </div>
</footer>
`;

export default function AgriGuruPage() {
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
    <div className="ag-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </div>
  );
}
