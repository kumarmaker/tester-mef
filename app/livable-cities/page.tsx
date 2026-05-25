import Link from "next/link";
import ProjectsAccordion, { type AccordionProject } from "@/components/sections/ProjectsAccordion";

const LIVABLE_CITIES_PROJECTS: AccordionProject[] = [
  {
    label: "Air Pollution",
    subtitle:
      "The Air Pollution Project tackles the severe air quality issues plaguing major Indian cities, with a primary focus on Delhi. Our comprehensive approach involves understanding various contributing factors such as paddy burning, Diwali celebrations, traffic emissions, and other pollutants.",
    href: "/air-pollution/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/City-Project-Air-Pollution.webp",
  },
  {
    label: "City Waste Projects",
    subtitle:
      "The City Waste Project focuses on tackling the pressing issue of waste management in major Indian cities like Delhi and Agra. Our goal is to conduct a comprehensive study of the existing waste management systems to understand the root causes of the crisis.",
    href: "/city-waste-projects/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/City-Waste-Project.webp",
  },
  {
    label: "Heat Island Effect",
    subtitle:
      "The project is dedicated to studying the rapid increase in the Earth's average surface temperature. This phenomenon has led to significant environmental impacts such as hotter city temperatures, heightened energy consumption, and the formation of 'heat islands'.",
    href: "/heat-island-effect/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/City-Project-Heat-Island-Effect.webp",
  },
  {
    label: "Walkability Index",
    subtitle:
      "This project seeks to promote walking by advocating for city designs that are pedestrian-friendly, fostering healthier lifestyles and more sustainable urban environments.",
    href: "/walkability-index/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/City-Project-Walkability-Index.webp",
  },
];

export default function LivableCitiesPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col md:flex-row min-h-[70vh]"
        style={{
          backgroundImage:
            "url('https://massivefoundation.org/wp-content/uploads/2025/05/Project-Liveable-Cities.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: naked image — quote sits directly on it */}
        <div className="flex-[2] flex flex-col justify-end p-8 md:p-12 min-h-[55vw] md:min-h-0">
          <blockquote
            className="text-white text-base md:text-lg italic leading-snug max-w-xl"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            &ldquo;The mark of a great city isn&apos;t how it treats its special places –
            everybody does that right – but how it treats its ordinary ones.&rdquo;
          </blockquote>
          <p
            className="mt-2 text-gray-200 text-sm"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            Aaron M. Renn
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
              Livable Cities
            </h1>

            <p
              className="text-gray-300 text-base leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Livable cities are cities that offer high quality of life to residents providing
              healthy lifestyle, environmental sustainability, economic opportunity, and urban
              solutions that reduce pain points and increase global liveability index.
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
            MEF attempts to identify and understand the core sectors in city design that result in
            poor experiences for all citizens and environments. Problems like waste management, air
            pollution, road congestion, heat island effects, and walkability are some of the major
            causes of pain in the city. MEF conducts original research and partners up with
            organizations to launch initiatives like pilot projects and accelerators to solve these
            problems.
          </p>
          <Link
            href="/get-involved/"
            className="inline-block bg-gray-900 text-white text-sm font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-700 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{
          backgroundImage:
            "url('https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160262.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Stat 1 */}
          <div className="flex items-start gap-4">
            <span
              className="text-8xl font-bold text-red-600 leading-none shrink-0"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              42
            </span>
            <p
              className="text-gray-500 text-sm leading-snug pt-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              out of 50 world&apos;s most polluted cities are in India.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3">
            <p
              className="text-gray-500 text-sm leading-snug shrink-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              An average<br />person spends
            </p>
            <div className="shrink-0">
              <div
                className="text-7xl font-bold text-red-600 leading-none"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                3-5
              </div>
              <div
                className="text-xl font-bold text-red-600 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Hours
              </div>
            </div>
            <p
              className="text-gray-500 text-sm leading-snug shrink-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              in daily<br />traffic.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex items-start gap-4">
            <span
              className="text-8xl font-bold text-red-600 leading-none shrink-0"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              74
            </span>
            <p
              className="text-gray-500 text-sm leading-snug pt-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span
                className="font-bold text-red-600 uppercase tracking-wide text-base"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Million+
              </span>
              <br />
              People in India suffer from diabetes resulting from lack of physical activity
            </p>
          </div>

        </div>
      </section>

      {/* ── Projects Accordion ───────────────────────────────────────────── */}
      <ProjectsAccordion
        projects={LIVABLE_CITIES_PROJECTS}
        title="Massive Earth Foundation Projects"
        titleVariant="large"
        rounded
      />

    </div>
  );
}
