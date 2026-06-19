"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export type DonatePathway = {
  id: string;
  tier: "hero" | "more";
  name: string;
  story: string;
  image: string;
  link: { label: string; href: string };
  cta_label?: string;
  entity?: string;
  tagline?: string;
  resolves_into?: string[];
};

type Props = {
  pathways: DonatePathway[];
  amountRanges: string[];
  trustNote: string;
};

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  organisation: string;
  pathway: string;
  amount_range: string;
  message: string;
};

const EMPTY: FormData = {
  full_name: "",
  email: "",
  phone: "",
  country: "",
  organisation: "",
  pathway: "",
  amount_range: "",
  message: "",
};

export default function DonateClient({ pathways, amountRanges, trustNote }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  };

  const pledgeTo = (id: string) => {
    set("pathway", id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/pledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm(EMPTY);
        showToast("success", "Our team will reach out to you soon.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const heroTier = pathways.filter((p) => p.tier === "hero");
  const moreTier = pathways.filter((p) => p.tier === "more");

  const inputCls =
    "w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors bg-white";

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-semibold shadow-xl ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {toast.type === "success" ? "✓ " : "✕ "}
          {toast.msg}
        </div>
      )}

      {/* ── Pathways ── */}
      <section id="pathways" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Mobilize your intent into relevant climate pathway
            </h2>
            <p
              className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Each MEF project is serious commitment and dedication to solving a real problem through scientific knowledge, technology development, and focused collaboration.
            </p>
          </div>

          {/* Hero tier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {heroTier.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-white"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-2xl font-bold uppercase text-gray-900 leading-tight mb-4"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="flex-1 text-sm text-gray-600 leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {p.story}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => pledgeTo(p.id)}
                      className="w-full py-2.5 text-white font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
                      style={{ fontFamily: "var(--font-jakarta)", background: "#16a34a" }}
                    >
                      {p.cta_label ?? "Pledge to This"}
                    </button>
                    <div className="flex justify-center">
                      <Link
                        href={p.link.href}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {p.link.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* More tier */}
          <h3
            className="text-lg uppercase tracking-widest text-gray-400 mb-6"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            More Ways to Give
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moreTier.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              >
                <div className="relative aspect-[21/9] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    className="text-lg font-bold uppercase text-gray-900 leading-tight mb-1"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="flex-1 text-sm text-gray-600 leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {p.story}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => pledgeTo(p.id)}
                      className="w-full py-2 rounded-md text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                      style={{ fontFamily: "var(--font-jakarta)", background: "#16a34a" }}
                    >
                      Pledge
                    </button>
                    <div className="flex justify-center">
                      <Link
                        href={p.link.href}
                        className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pledge form ── */}
      <section
        ref={formRef}
        id="pledge"
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: "url(/images/unsplash_4rDCa5hBlCs.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="w-full rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            {/* Card header */}
            <div className="bg-gray-950 px-8 py-7 text-center">
              <h2
                className="font-bold uppercase text-white leading-tight"
                style={{ fontFamily: "var(--font-oswald)", fontSize: "28px", letterSpacing: "0.03em" }}
              >
                Make a Pledge
              </h2>
              <p className="text-gray-400 text-sm mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                No payment is taken here. A pledge is a statement of intent — our team contacts you personally within 48 hours.
              </p>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  placeholder="Full name *"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  maxLength={120}
                  className={inputCls}
                />
                <input
                  required
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  maxLength={160}
                  className={inputCls}
                />
                <input
                  required
                  placeholder="Phone / WhatsApp *"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  maxLength={32}
                  className={inputCls}
                />
                <input
                  required
                  placeholder="Country *"
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  maxLength={80}
                  className={inputCls}
                />
                <input
                  placeholder="Organisation (optional)"
                  value={form.organisation}
                  onChange={(e) => set("organisation", e.target.value)}
                  maxLength={160}
                  className={`${inputCls} sm:col-span-2`}
                />
                <select
                  required
                  value={form.pathway}
                  onChange={(e) => set("pathway", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Where should it go? *</option>
                  {pathways.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                  <option value="undecided">Help me decide</option>
                </select>
                <select
                  required
                  value={form.amount_range}
                  onChange={(e) => set("amount_range", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Amount *</option>
                  {amountRanges.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Anything you'd like us to know — intent, questions, who referred you…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                maxLength={2000}
                rows={4}
                className={inputCls}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white font-bold uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ fontFamily: "var(--font-oswald)", background: "#e50000", fontSize: "15px" }}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : "Send My Pledge"}
              </button>
              <p
                className="text-xs text-gray-400 leading-relaxed text-center"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {trustNote}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
