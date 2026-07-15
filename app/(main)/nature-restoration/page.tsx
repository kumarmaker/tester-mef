import Link from "next/link";
import ProjectsAccordion, { type AccordionProject } from "@/components/sections/ProjectsAccordion";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nature Restoration",
  description: "Nature restoration, forests, and biodiversity programmes by Massive Earth Foundation.",
};

const NATURE_PROJECTS: AccordionProject[] = [
  {
    label: "Pond Restoration",
    subtitle: "Restore ponds, lakes, and natural water-bodies in urban city spaces.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Pond-Restoration.webp",
  },
  {
    label: "Bird Education",
    subtitle: "Learn and understand the types of birds, their behavioural patterns, and importance in the eco-system.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Bird-Education.webp",
  },
  {
    label: "Flora & Fauna Study",
    subtitle: "Learn about the flora & fauna of your region.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Flora-Fauna-Study.webp",
  },
];

const MEF_VISION_TILES = [
  {
    label: "Develop Fauna",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Develop-Fauna.webp",
  },
  {
    label: "Develop Flora",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Develop-Flora.webp",
  },
  {
    label: "Develop Natural Habitat",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Develop-Natural-Habitat.webp",
  },
];

export default function NatureRestorationPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col md:flex-row min-h-[70vh]"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2024/11/Nature-Restoration-Main-Project.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: naked image with quote */}
        <div className="flex-[2] flex flex-col justify-end p-8 md:p-12 min-h-[55vw] md:min-h-0">
          <blockquote
            className="text-white text-base md:text-lg italic leading-snug max-w-xl"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            &ldquo;Shall I not have intelligence with the earth? Am I not partly leaves and
            vegetable mould myself?&rdquo;
          </blockquote>
          <p
            className="mt-2 text-gray-300 text-sm"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            Walden, Henry David Thoreau
          </p>
        </div>

        {/* Right: frosted glass panel */}
        <div
          className="flex-1 flex items-center px-10 md:px-14 py-16 md:py-0 backdrop-blur-xl"
          style={{ background: "rgba(15, 15, 15, 0.55)" }}
        >
          <div>
            {/* Three dots + rule */}
            <div className="flex items-center gap-2 mb-7">
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <div className="flex-1 h-px bg-white/20 ml-1" />
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold uppercase text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Ecological Restoration
            </h1>

            <p
              className="text-gray-300 text-base leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ecological Restoration is the process to heal &amp; restore the damaged, degraded,
              or diminishing natural ecosystems to cultivate nature &amp; biodiversity.
            </p>
          </div>
        </div>

      </section>

      {/* ── MEF Vision ───────────────────────────────────────────────────── */}
      <section id="mef-vision" className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-8"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            MEF Vision
          </h2>
          <p
            className="text-gray-600 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Rapid urbanization &amp; climate change are erasing the natural habitats from our
            world. In order to enrichen natural life, we must revive ecological systems for
            natural and wholesome growth of the environment.
          </p>
        </div>

        {/* 3 image tiles */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MEF_VISION_TILES.map((tile) => (
            <div
              key={tile.label}
              className="relative h-64 overflow-hidden group"
              style={{
                backgroundImage: `url('${tile.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="relative z-10 h-full flex items-end p-6">
                <span
                  className="text-white text-lg font-bold uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {tile.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects Accordion ───────────────────────────────────────────── */}
      <ProjectsAccordion
        projects={NATURE_PROJECTS}
        title="Massive Earth Foundation Projects"
        titleVariant="large"
        rounded
      />

    </div>
  );
}
