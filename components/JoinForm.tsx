"use client";

import { useState } from "react";

/* ════════════════════════════════════════════════════════════════
   JoinForm — the wired "Get Involved" signup form.
   Client island: owns its own state and posts to /api/engage.
   Lifted verbatim from the get-involved page so wiring is identical.
   ════════════════════════════════════════════════════════════════ */

const MEF_SECTORS = [
  "Circular Economy & Waste",
  "Clean Energy",
  "Climate Finance & Innovation",
  "Clean Mobility",
  "Sustainable Agriculture",
  "Sustainable Built Environment",
  "Air Quality & Pollution",
  "Forests & Biodiversity",
  "Gender & Social Equity",
  "Water & Sanitation",
];

type FormData = {
  full_name: string;
  email: string;
  mobile: string;
  age_range: string;
  current_city: string;
  country: string;
  role_type: string;
  organisation: string;
  sector_domain: string;
  sectors_of_interest: string[];
  why_joining: string;
  referral_source: string;
  linkedin_url: string;
  website_url: string;
};

const EMPTY: FormData = {
  full_name: "", email: "", mobile: "", age_range: "",
  current_city: "", country: "", role_type: "", organisation: "",
  sector_domain: "", sectors_of_interest: [], why_joining: "",
  referral_source: "", linkedin_url: "", website_url: "",
};

const FIELD =
  "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5";

export default function JoinForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleSector = (s: string) => {
    setForm((f) => ({
      ...f,
      sectors_of_interest: f.sectors_of_interest.includes(s)
        ? f.sectors_of_interest.filter((x) => x !== s)
        : [...f.sectors_of_interest, s],
    }));
  };

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sectors_of_interest: form.sectors_of_interest.join(", "),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setForm(EMPTY);
        showToast("success", "You're in! We'll be in touch soon.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-semibold shadow-xl transition-all ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {toast.type === "success" ? "✓ " : "✕ "}{toast.msg}
        </div>
      )}

      <section
        id="join"
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: "url(/images/unsplash_4rDCa5hBlCs.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-2xl mx-auto">

          {/* Dialog card — glass overlay */}
          <div
            className="w-full rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >

            {/* Card header */}
            <div className="bg-gray-950 px-8 py-7 text-center">
              <h2
                className="font-bold uppercase text-white leading-tight"
                style={{ fontFamily: "var(--font-oswald)", fontSize: "31px", letterSpacing: "0.03em" }}
              >
                Get Involved
              </h2>
              <p className="text-gray-400 text-sm mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                Join MEF&apos;s climate action ecosystem — as a founder, investor, researcher, or partner.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">

              {/* Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Full Name <span className="text-red-500">*</span></label>
                  <input required className={FIELD} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Your full name" />
                </div>
                <div>
                  <label className={LABEL}>Email <span className="text-red-500">*</span></label>
                  <input required type="email" className={FIELD} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Mobile</label>
                  <input className={FIELD} value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label className={LABEL}>Age Range</label>
                  <select className={FIELD} value={form.age_range} onChange={(e) => set("age_range", e.target.value)}>
                    <option value="">Select</option>
                    <option value="under_25">Under 25</option>
                    <option value="25_35">25 – 35</option>
                    <option value="35_50">35 – 50</option>
                    <option value="50_plus">50+</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>City</label>
                  <input className={FIELD} value={form.current_city} onChange={(e) => set("current_city", e.target.value)} placeholder="Your city" />
                </div>
                <div>
                  <label className={LABEL}>Country</label>
                  <input className={FIELD} value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Your country" />
                </div>
              </div>

              {/* Role + Org */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>I am a</label>
                  <select className={FIELD} value={form.role_type} onChange={(e) => set("role_type", e.target.value)}>
                    <option value="">Select role</option>
                    <option value="student">Student</option>
                    <option value="founder">Founder</option>
                    <option value="professional">Professional</option>
                    <option value="researcher">Researcher</option>
                    <option value="investor">Investor</option>
                    <option value="policymaker">Policymaker</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL}>Organisation</label>
                  <input className={FIELD} value={form.organisation} onChange={(e) => set("organisation", e.target.value)} placeholder="Where you work / study" />
                </div>
              </div>

              {/* Sectors of interest */}
              <div>
                <label className={LABEL}>Sectors of Interest</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {MEF_SECTORS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSector(s)}
                      className="px-3 py-1.5 text-xs rounded-full border transition-colors"
                      style={{
                        fontFamily: "var(--font-inter)",
                        background: form.sectors_of_interest.includes(s) ? "#e50000" : "#fff",
                        color: form.sectors_of_interest.includes(s) ? "#fff" : "#374151",
                        borderColor: form.sectors_of_interest.includes(s) ? "#e50000" : "#d1d5db",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-3 rounded-lg"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: "16px",
                  letterSpacing: "0.08em",
                  background: loading ? "#b91c1c" : "#e50000",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Join MEF →"
                )}
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}
