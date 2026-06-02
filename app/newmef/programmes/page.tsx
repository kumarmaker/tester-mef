import fs from "fs";
import path from "path";
import ProgrammeGrid from "@/components/newmef/ProgrammeGrid";

interface Programme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  year?: number;
  region?: string;
  sectors?: string;
  slug: string;
}

interface ProgrammesData {
  stats: { total: number; active: number; accelerators: number; projects: number };
  programmes: Programme[];
}

const PLACEHOLDER = "/images/mef_programme_hero.webp";

const CARD_IMAGES: Record<string, string> = {
  "lowcarbon-earth-accelerator":     "/images/LCE_Card (convert.io).webp",
  "saffal":                          "/images/Singapore-Summit_1-1536x1024 (convert.io).webp",
  "sustainable-forests-smriti-van":  "/images/msv-plantation drive.png",
  "ev-rickshaw-transition":          "/images/e-mobility.webp",
  "net-zero-sarojini-nagar":         "/images/Sarojini_Dashboard.png",
  "miles-challenge":                 "/images/Miles_challenge.png",
  "zesup-challenge":                 "/images/Zesup_Card.webp",
  "agroxlerate":                     "/images/AgroXlerate_card.webp",
  "zero-waste-cities":               "/images/image.png",
  "gomassive-climate-accelerator-2023": "/images/Amazon-AWS-GoClimate-Accelerator.webp",
  "icap-india-climate-accelerator-platform": "/images/mef_plain_logo_horz.png",
  "agra-innovation-lab":             "/images/Agra_Innovation_Lab.webp",
};

export default function ProgrammesPage() {
  const data: ProgrammesData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "index", "programmes.json"), "utf-8")
  );

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end"
        style={{
          backgroundImage: "url(/images/mef_programme_hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "88vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-32 text-left">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Massive Earth Foundation
          </p>
          <h1
            className="font-bold uppercase text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(42px, 6vw, 80px)", letterSpacing: "0.03em" }}
          >
            Climate Accelerators<br />& Pilot Projects
          </h1>
          <p
            className="text-gray-300 max-w-xl mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontSize: "1.0625rem" }}
          >
            From blended-finance accelerators to on-ground city pilots —<br />
            MEF builds and scales the programmes that turn climate ambition into measurable action.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#active"
              className="inline-block px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "15px", letterSpacing: "0.08em", borderRadius: "8px" }}
            >
              View Live Programmes
            </a>
            <a
              href="#all"
              className="inline-block px-7 py-3 border border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "15px", letterSpacing: "0.08em", borderRadius: "8px" }}
            >
              Browse Catalog
            </a>
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-white/10">
          {[
            { value: data.stats.total,       label: "Total Programmes" },
            { value: data.stats.active,      label: "Live Right Now" },
            { value: data.stats.accelerators,label: "Accelerators" },
            { value: data.stats.projects,    label: "Pilot Projects" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-oswald)", fontSize: "48px", lineHeight: 1 }}>{value}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-oswald)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search / filter + card grid (client) ── */}
      <ProgrammeGrid
        programmes={data.programmes}
        cardImages={CARD_IMAGES}
        placeholder={PLACEHOLDER}
      />

    </main>
  );
}
