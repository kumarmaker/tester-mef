const TAG_CLOUD =
  "https://cms.massivefoundation.org/wp-content/uploads/2024/10/MassiveFoundation-Tag-Cloud.webp";

export default function PlanetaryVision() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Col 1 — Text */}
          <div>
            <p
              className="font-bold uppercase tracking-wide text-black mb-6"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
            >
              Planetary Vision
            </p>

            <div
              className="space-y-5 text-gray-700 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontSize: "1.0625rem" }}
            >
              <p>
                Massive Earth Foundation is on a quest to solve global warming
                and climate change by fostering climate tech, entrepreneurship,
                investments, and innovation. We envision a large-scale ecosystem
                that nurtures &amp; supports the growth of human as well as
                natural life. Thus, we&apos;ve brought climate heroes like
                entrepreneurs, scientists, leaders, investors, and international
                organizations into a single platform to raise &amp; deploy
                capital for climate finance and build innovative technology that
                solves climate change.
              </p>
              <p>
                Our goal is to induce a paradigm shift that transforms the
                threat of climate change into an opportunity to build a cleaner,
                healthier, and livable planet that&apos;s home for all. MEF
                aims to achieve the same through study, research, projects,
                funding, events, co-working, partnership, investments and
                technological innovation.
              </p>
            </div>
          </div>

          {/* Col 2 — Tag cloud image */}
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TAG_CLOUD}
              alt="Massive Earth Foundation focus areas"
              className="w-full max-w-lg h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
