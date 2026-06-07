"use client";

import { useState } from "react";
import Link from "next/link";

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

const FIELD = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5";

const PILLARS = [
  {
    img: "/images/fellowship/Frame-160264.webp",
    title: "Community",
    desc: "A thriving culture of vibrant members passionate about climate & open for symbiotic relationships.",
  },
  {
    img: "/images/fellowship/Massive-Earth-Fellowship-knowledge.webp",
    title: "Knowledge",
    desc: "Pool of academic resources, scholarly research, and practical insights to deep dive into climate.",
  },
  {
    img: "/images/fellowship/Massive-Earth-Fellowship-opportunities.webp",
    title: "Opportunity",
    desc: "A rich interconnected network to discover jobs, partnerships, collaborations, and much more.",
  },
];

const BENEFITS = [
  {
    img: "/images/fellowship/image-19.webp",
    title: "Climate Portal",
    desc: "Access to the exclusive online portal featuring a vibrant climate community. Build your profile, network, and discover opportunities.",
  },
  {
    img: "/images/fellowship/image-3.webp",
    title: "Climate Events",
    desc: "Summits, Seminars, Workshops, & Climate Mixers to get acquainted with the industry and build meaningful connections.",
  },
  {
    img: "/images/fellowship/image-5.webp",
    title: "Virtual Events",
    desc: "Webinars, Workshops, Climate 101s, Founder Chats, and Lectures on Climate Sectors from global experts.",
  },
  {
    img: "/images/fellowship/image-7.webp",
    title: "Accelerators & Incubators",
    desc: "Early access to incubators, accelerators, grants, funds, demo days, and investment pitches.",
  },
  {
    img: "/images/fellowship/image-9.webp",
    title: "Massive Media",
    desc: "Podcasts, Journals, E-Books, Magazines, and Films. Participate and create climate-related media.",
  },
  {
    img: "/images/fellowship/image-11.webp",
    title: "Climate Education",
    desc: "Study groups, resources, courses, and reports to deepen your climate knowledge.",
  },
  {
    img: "/images/fellowship/image-13.webp",
    title: "Local Projects",
    desc: "Plant a Tree, Save Feral Animals, Clean Your Society — get involved in tangible local climate action.",
  },
  {
    img: "/images/fellowship/image-15.webp",
    title: "Cultural Events",
    desc: "Film Screenings, Poetry Recitals, Music Nights, and other cultural events around climate.",
  },
];

export default function GetInvolvedPage() {
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

      {/* ── 1. HERO ── */}
      <section className="relative flex h-screen max-h-screen bg-white overflow-hidden">

        {/* Left — text content */}
        <div className="relative z-10 flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 w-full lg:w-[52%] shrink-0">
          <span
            className="text-xs uppercase tracking-widest mb-4 block"
            style={{ fontFamily: "var(--font-oswald)", color: "#e50000" }}
          >
            Massive Earth Fellowship
          </span>
          <h1
            className="font-black uppercase leading-none mb-6 text-gray-950"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Community to<br />Launch Climate<br />Action
          </h1>
          <p
            className="text-gray-600 max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontSize: "1rem" }}
          >
            Global warming is perhaps the only crisis in the world that demands initiative from all members of society. Whether you are a seasoned climate expert, student, or simply interested to work in climate but don&apos;t know where to start, MEF is the right platform to springboard your climate journey.
          </p>
          <Link
            href="#join"
            className="inline-block px-8 py-3.5 text-white uppercase font-bold transition-opacity hover:opacity-90 self-start"
            style={{ fontFamily: "var(--font-oswald)", background: "#e50000", letterSpacing: "0.06em", borderRadius: "6px", fontSize: "15px" }}
          >
            Become a Fellow
          </Link>
        </div>

        {/* Right — tiled M-shape image */}
        <div className="hidden lg:block flex-1 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/fellowship/Mask-group-1.webp"
            alt="MEF Fellowship"
            className="absolute inset-0 w-full h-full object-cover object-left"
            draggable={false}
          />
        </div>

      </section>

      {/* ── 2. THREE PILLARS ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="uppercase text-black text-center mb-12"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
          >
            The 3 Pillars of Fellowship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map(({ img, title, desc }) => (
              <div key={title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={title}
                  className="w-full aspect-square rounded-2xl object-cover"
                />
                <h3
                  className="uppercase mt-4 text-black"
                  style={{ fontFamily: "var(--font-oswald)", fontSize: "20px" }}
                >
                  {title}
                </h3>
                <p
                  className="text-gray-600 mt-2 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHO IS IT FOR ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-bold uppercase text-black"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
            >
              Who Is It For
            </h2>
            <div className="space-y-4" style={{ fontFamily: "var(--font-inter)", color: "#374151" }}>
              <p className="leading-relaxed">
                Many of us are concerned about climate change and wish to do something about it. But the field can be confusing as we may not know where to begin the journey and which path to follow.
              </p>
              <p className="leading-relaxed">
                The world of climate is often riddled with strangely familiar terms like CCUS, CSRs, and others making us unsure of what to learn and what to abandon. To solve the gap between hopeful intentions and practical action, Massive Earth Fellowship unites members from all walks of life into a harmonious community where each can benefit from the other.
              </p>
              <p className="leading-relaxed">
                Whether you are a startup looking for an investor, or an investor diversifying your portfolio, this fellowship is for you. Ultimately, it is for everyone who&apos;s interested to work for climate change and needs a starting platform.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="#join"
                className="inline-block px-8 py-3 text-white uppercase font-bold transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-oswald)", background: "#e50000", letterSpacing: "0.06em", borderRadius: "6px" }}
              >
                Become a Fellow
              </Link>
            </div>
          </div>

          {/* Right — image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/fellowship/Group-27489.webp"
            alt="Who is the MEF Fellowship for"
            className="w-full object-contain"
            draggable={false}
          />

        </div>
      </section>

      {/* ── 4. BENEFITS ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="uppercase text-black text-center mb-12"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
          >
            What Will You Get?
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ img, title, desc }) => (
              <div key={title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={title}
                  className="w-full rounded-xl object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
                <h3
                  className="uppercase font-bold mt-3"
                  style={{ fontFamily: "var(--font-oswald)", fontSize: "16px" }}
                >
                  {title}
                </h3>
                <p
                  className="text-gray-500 mt-1 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. JOIN FORM ── */}
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
              <h1
                className="font-bold uppercase text-white leading-tight"
                style={{ fontFamily: "var(--font-oswald)", fontSize: "31px", letterSpacing: "0.03em" }}
              >
                Get Involved
              </h1>
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

              {/* Why joining + Referral + Links — hidden for now
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Why are you joining?</label>
                  <select className={FIELD} value={form.why_joining} onChange={(e) => set("why_joining", e.target.value)}>
                    <option value="">Select</option>
                    <option value="accelerator">Join an Accelerator</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="events">Attend Events</option>
                    <option value="research">Research</option>
                    <option value="csr">CSR / Corporate</option>
                    <option value="connect">Network / Connect</option>
                    <option value="exploring">Just Exploring</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL}>How did you find us?</label>
                  <select className={FIELD} value={form.referral_source} onChange={(e) => set("referral_source", e.target.value)}>
                    <option value="">Select</option>
                    <option value="event">At an Event</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend / Colleague</option>
                    <option value="unep">UNEP / UN</option>
                    <option value="partner">Partner Organisation</option>
                    <option value="search">Web Search</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>LinkedIn URL</label>
                  <input className={FIELD} value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} placeholder="linkedin.com/in/you" />
                </div>
                <div>
                  <label className={LABEL}>Website</label>
                  <input className={FIELD} value={form.website_url} onChange={(e) => set("website_url", e.target.value)} placeholder="yourwebsite.com" />
                </div>
              </div>
              */}

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

      {/* ── 6. OUR PARTNERS ── */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: "url(/images/Frame-160286.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2
            className="font-bold uppercase tracking-wide text-white text-center mb-14"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
          >
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { logo: "/images/partner-logos/unep_logo_horz.png",               name: "UNEP" },
              { logo: "/images/partner-logos/aws_logo_horz.png",                name: "AWS" },
              { logo: "/images/partner-logos/ifc_logo_horz.png",                name: "IFC" },
              { logo: "/images/partner-logos/incubation-network_logo_horz.png", name: "The Incubation Network" },
              { logo: "/images/partner-logos/paytm_logo_horz.png",              name: "Paytm" },
              { logo: "/images/partner-logos/aepw_logo_horz.png",               name: "Alliance to End Plastic Waste" },
              { logo: "/images/partner-logos/unwomen_logo_horz.png",            name: "UN Women" },
              { logo: "/images/partner-logos/wri_logo_horz.png",                name: "WRI India" },
              { logo: "/images/partner-logos/googlecloud_logo_horz.png",        name: "Google Cloud" },
              { logo: "/images/partner-logos/investindia_logo_horz.png",        name: "Invest India" },
              { logo: "/images/partner-logos/giz__logo_horz.png",               name: "GIZ" },
              { logo: "/images/partner-logos/microsoft_logo_horz.png",          name: "Microsoft" },
              { logo: "/images/partner-logos/axisbank_logo_horz.png",           name: "Axis Bank" },
              { logo: "/images/partner-logos/amplus-solar_logo_horz.png",       name: "Amplus Solar" },
              { logo: "/images/partner-logos/wasteaid_logo_horz.png",           name: "WasteAid" },
            ].map(({ logo, name }) => (
              <div
                key={name}
                className="bg-white rounded-xl flex items-center justify-center p-5"
                style={{ width: "200px", height: "100px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={name} className="max-w-full max-h-full object-contain" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
