import Link from "next/link";

const ACCELERATORS = [
  { label: "Zero Waste Cities",         image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Zero-Waste-Cities-Card.webp" },
  { label: "Agra Innovation Lab",       image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Agra-Innovation-Lab-Card.webp" },
  { label: "ZESUP Challenge",           image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/ZESUP-Challenge-Card.webp" },
  { label: "Low Carbon Earth",          image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Low-Carbon-Earth-Card.webp" },
  { label: "MILES Challenge",           image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/MILES-Challenge-Card.webp" },
  { label: "Massive Climate Accelerator", image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Massive-Climate-Accelerator.webp" },
];

export default function InnovationsPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-[60vh] px-4 sm:px-6"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2024/11/Climate-Innovation.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Sparking Climate Innovation
          </h1>
          <p
            className="text-gray-300 text-lg mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            With research, policies, capital, &amp; incubations.
          </p>
          <Link
            href="/engage-with-us/"
            className="inline-block bg-white text-black text-sm font-bold uppercase tracking-widest px-10 py-4 hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Build Climate Tech
          </Link>
        </div>
      </section>

      {/* ── Solving Climate with Tech ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-10"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Solving Climate with Tech
          </h2>
          <div
            className="text-gray-600 text-base leading-relaxed space-y-5 text-left"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <p>
              Massive&apos;s central thesis is that climate change is primarily an engineering
              error. The technology built in the past was not burdened to meet environmental
              constraints. Thus, they emitted tons of carbon, relied on excessive energy usage,
              and destroyed the planet in the process.
            </p>
            <p>
              Now to move forward, without sacrificing development goals, we must build
              technology that&apos;s not only scalable but also sustainable. Thus, we need
              vehicles that don&apos;t cause emissions, ACs that don&apos;t drink energy,
              fertilizers that do not destroy the soil &amp; so on.
            </p>
            <p>
              When looked through the lens of innovation climate change doesn&apos;t remain a
              fundamental survival problem, but turns into an opportunity creating massive scope
              for Investments, Innovation, Employment, and Worldwide Transformation.
            </p>
          </div>
          <Link
            href="/engage-with-us/"
            className="inline-block mt-10 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-700 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* ── Accelerators, Incubators & Challenges ───────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 text-center mb-12"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Accelerators, Incubators &amp; Challenges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ACCELERATORS.map((item) => (
              <div key={item.label} className="group relative rounded-xl overflow-hidden aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosystem CTA ────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2025/05/Frame160455-1.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-white mb-6"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Asia&apos;s Largest Climate Tech Ecosystem
          </h2>
          <p
            className="text-gray-300 text-base leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            An ecosystem comprising of founders, VCs, investors in development of organization,
            and institution that support startups in development of novel technology that combats
            climate change.
          </p>
          <Link
            href="/engage-with-us/"
            className="inline-block bg-white text-black text-sm font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Join Us
          </Link>
        </div>
      </section>

    </div>
  );
}
