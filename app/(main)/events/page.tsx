import Link from "next/link";

const PAST_EVENTS = [
  {
    title: "Climate Thursday Bangalore",
    image: "https://massivefoundation.org/wp-content/uploads/2025/04/event-page-climate-thursday-1.avif",
    tags: ["Sustainability", "Networking"],
    meta: "March 27 | Bengaluru",
    description: "Climate Thursday is a high-impact networking series bringing together climate founders, investors, and policymakers to share insights, funding trends, and ideas for building bold solutions to the climate crisis.",
    href: "/climate-thursday/",
  },
  {
    title: "Invest in Clean Air Now",
    image: "https://massivefoundation.org/wp-content/uploads/2025/05/japan.avif",
    tags: ["Innovation", "Networking"],
    meta: "March 21 | Japan",
    description: "The Asia Pacific Clean Air Partnership (APCAP) is one of the regional initiatives working to strengthen international cooperation on air quality in Asia Pacific.",
    href: "/about-5th-apcap-joint-forum/",
  },
  {
    title: "Climate Thursday Mixer",
    image: "https://massivefoundation.org/wp-content/uploads/2024/12/01-cardface-thursdaymixture.webp",
    tags: ["Fireside Chat", "Networking"],
    meta: "November 28 | Gurugram, India",
    description: "The Climate Thursday Mixer, hosted by Massive Earth Foundation, is a unique gathering of climate-tech founders, investors, policymakers, and sustainability leaders designed to foster meaningful discussions and build a stronger ecosystem.",
    href: "/climate-thursday-mixer/",
  },
  {
    title: "Amazon AWS GoClimate Accelerator",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/Amazon-AWS-GoClimate-Accelerator.webp",
    tags: ["Digital Innovation", "Climate Tech"],
    meta: "2023 | Bangalore, India",
    description: "The GoMassive Climate Accelerator was launched in 2023 for startups building technological solutions in various climate sectors.",
    href: null,
  },
  {
    title: "MILES Challenge",
    image: "https://massivefoundation.org/wp-content/uploads/2024/11/Frame-159448-1024x391.webp",
    tags: ["Clean Energy"],
    meta: "2021 | India",
    description: "GoMassive launched the Miles challenge in collaboration with Amplus, a member of the PETRONAS group in 2021 to support startups building ready-to-deploy solutions in the clean energy climate sector in India.",
    href: null,
  },
  {
    title: "Agra Innovation Lab for Prevention of Plastic Leakage",
    image: "https://massivefoundation.org/wp-content/uploads/2024/11/Frame-160619-1024x391.webp",
    tags: ["Prevention of Plastic Leakage"],
    meta: "2021 | Agra, India",
    description: "Massive Earth Foundation & GoMassive Incubators set up the Agra Innovation Lab for Prevention of Plastic Leakage into the Environment (AIL-PrePLE) in 2021 with support from The Incubation Network.",
    href: null,
  },
  {
    title: "Low Carbon Earth 2023",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/LowCarbon-Earth-Demo-Day.webp",
    tags: ["Climate Accelerator", "Climate Tech", "UNEP"],
    meta: "August '23 – May '24 | Bangkok, Thailand",
    description: "MEF launched the Low Carbon Earth accelerator with the United Nations Environment Programme back in 2020 to identify and scale startups in the Asia-Pacific region building low-carbon solutions.",
    href: null,
  },
];

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Banner ───────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://massivefoundation.org/wp-content/uploads/2024/10/Climate-Events.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "240px",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <h1
          className="relative z-10 text-6xl md:text-7xl font-semibold uppercase text-white tracking-wide"
          style={{ fontFamily: "var(--font-oswald)", lineHeight: "56px" }}
        >
          Events
        </h1>
      </section>

      {/* ── Featured Event Card ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12">
        <div
          className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden min-h-[420px] flex items-center"
          style={{
            backgroundImage:
              "url('https://massivefoundation.org/wp-content/uploads/2025/05/bgimage.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay: dark left → transparent right */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.3) 75%, transparent 100%)" }} />

          {/* Content */}
          <div className="relative z-10 px-10 md:px-14 py-12 max-w-xl">
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              ClimateNXT 2025 &bull; 5th June 2025 &bull; India Habitat Centre New Delhi
            </p>

            <h2
              className="text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              World Environment Day Summit
            </h2>

            <p
              className="text-gray-300 text-sm leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ClimateNXT unites inspirational founders, top business leaders, policy makers and
              visionary investors to engage in discussions on innovative technologies that have
              the potential to play a significant role in tackling Climate Crisis.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://forms.massivefoundation.org/ClimateNXT2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#e50000] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Apply to Attend
              </a>
              <Link
                href="/world-environment-day-summit/"
                className="inline-flex items-center gap-2 border border-white text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                View Details <span aria-hidden>→</span>
              </Link>
            </div>

            <p
              className="text-gray-400 text-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Last date for registration: <strong className="text-white">30th May 2025</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── Past Events ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 text-center mb-10"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Past Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAST_EVENTS.map((event) => (
              <div key={event.title} className="rounded-2xl overflow-hidden bg-gray-50 flex flex-col">
                {/* Image */}
                <div
                  className="w-full h-56"
                  style={{
                    backgroundImage: `url('${event.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <h3
                    className="text-2xl font-bold uppercase text-gray-900 mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {event.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-600 border border-gray-300 rounded-full px-3 py-1"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {event.meta}
                  </p>

                  <p
                    className="text-sm text-gray-500 leading-relaxed flex-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {event.description}
                  </p>

                  {event.href && (
                    <Link
                      href={event.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-colors border-t border-gray-200 pt-4"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      View Details <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
