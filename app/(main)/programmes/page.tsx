import fs from "fs";
import path from "path";
import ProgrammeGrid from "@/components/newmef/ProgrammeGrid";
import { PROGRAMME_CARD_IMAGES, PROGRAMME_PLACEHOLDER } from "@/lib/programme-images";

interface Programme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  year?: number;
  region?: string;
  sectors?: string;
  description?: string;
  slug: string;
}

interface ProgrammesData {
  stats: { total: number; active: number; accelerators: number; projects: number };
  programmes: Programme[];
}

const PLACEHOLDER = PROGRAMME_PLACEHOLDER;
const CARD_IMAGES = PROGRAMME_CARD_IMAGES;

export default function ProgrammesPage() {
  const data: ProgrammesData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "index", "programmes.json"), "utf-8")
  );

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-center"
        style={{
          backgroundImage: "url(/images/mef_programme_hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-left">
          <h1
            className="font-bold uppercase text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "61px", letterSpacing: "0.03em" }}
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

      {/* ── Search / filter + card grid (client) ── */}
      <ProgrammeGrid
        programmes={data.programmes}
        cardImages={CARD_IMAGES}
        placeholder={PLACEHOLDER}
      />

    </main>
  );
}
