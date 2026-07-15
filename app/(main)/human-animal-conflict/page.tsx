import Link from "next/link";
import ProjectsAccordion, { type AccordionProject } from "@/components/sections/ProjectsAccordion";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human-Animal Conflict",
  description: "MEF's work on human-animal conflict and coexistence in urban and rural India.",
};

const HAC_PROJECTS: AccordionProject[] = [
  {
    label: "Wild Animals & Village Conflict",
    subtitle: "Developing natural ecosystems for co-existence between wild animals and human settlements.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Wild-Animals-Village-Conflict.webp",
  },
  {
    label: "Design Cow Shelter",
    subtitle: "Launch pilot projects to work with gaushalas, local communities, cow herders, activists, policy makers, and ministers to develop urban cow shelter.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/MEF-Cow-Shelter.webp",
  },
  {
    label: "Help Stray Animals in City",
    subtitle: "Partner up with MEF to shelter stray animals in the urban cities.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Help-Stray-Animals-In-City-by-MEF.webp",
  },
  {
    label: "Bringing Back Birds and Bees",
    subtitle: "MEF's vision is to re-populate urban spaces with lush flora to support a thriving ecosystem for birds and bees.",
    href: "#",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Bring-Back-Birds-Bess-by-MEF.webp",
  },
];

export default function HumanAnimalConflictPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col md:flex-row min-h-[70vh]"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2025/05/Human-Animal-Conflict.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: naked image + photo credit */}
        <div className="flex-[2] flex flex-col justify-end p-8 md:p-12 min-h-[55vw] md:min-h-0">
          <p
            className="text-gray-300 text-xs italic max-w-xs"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            Biplab Hazra&apos;s award-winning photograph. / Sanctuary Nature Foundation
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
              Human-Animal Conflict
            </h1>

            <p
              className="text-gray-300 text-base leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The human-animal conflict arises when the human settlements overlap with established
              wildlife territory. There exists a significant threat to the life of humans and
              animals with the evolution of society.
            </p>

            <Link
              href="#what-mef-is-doing"
              className="inline-block bg-white text-black text-sm font-bold uppercase tracking-widest px-8 py-3 hover:bg-gray-200 transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Learn More
            </Link>
          </div>
        </div>

      </section>

      {/* ── What MEF is Doing ─────────────────────────────────────────────── */}
      <section id="what-mef-is-doing" className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-8"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            What Massive Earth Foundation Is Doing?
          </h2>
          <p
            className="text-gray-600 text-base leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The core strength of MEF lies in its ability to execute complex projects at scale and
            come up with counterintuitive insights. With a user-first approach and observance of
            clever design principles, MEF provides urban design solutions to solve core problems
            plaguing the city. MEF conducts original research and runs pilot projects in cities
            bringing various stakeholders to a single platform.
          </p>
          <Link
            href="/engage-with-us/"
            className="inline-block bg-gray-900 text-white text-sm font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-700 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* ── Projects Accordion ───────────────────────────────────────────── */}
      <ProjectsAccordion
        projects={HAC_PROJECTS}
        title="Massive Earth Foundation Projects"
        titleVariant="large"
        rounded
      />

    </div>
  );
}
