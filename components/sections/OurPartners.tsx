const BASE = "https://massivefoundation.org/wp-content/uploads/2024/08/";

const ROWS = [
  // Row 1 — 4 logos (UN first)
  [
    `${BASE}Frame-159506.webp`,
    `${BASE}Frame-159505.webp`,
    `${BASE}Frame-159507.webp`,
    `${BASE}Frame-159509.webp`,
  ],
  // Row 2 — 5 logos
  [
    `${BASE}Frame-159512.webp`,
    `${BASE}Frame-159532.webp`,
    `${BASE}Frame-159533.webp`,
    `${BASE}Frame-159534-2.webp`,
    `${BASE}Frame-159535.webp`,
  ],
  // Row 3 — 4 logos
  [
    `${BASE}Frame-159536.webp`,
    `${BASE}Frame-159537.webp`,
    `${BASE}Frame-159538.webp`,
    `${BASE}Frame-159539.webp`,
  ],
  // Row 4 — 3 logos
  [
    `${BASE}Frame-159540.webp`,
    `${BASE}Frame-159541.webp`,
    `${BASE}Frame-159548.webp`,
  ],
];

export default function OurPartners() {
  return (
    <section
      className="relative py-24"
      style={{
        backgroundImage: "url(https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160286.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className="font-bold uppercase tracking-wide text-white text-center mb-14"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
        >
          Our Partners
        </h2>

        <div className="flex flex-col gap-4">
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
            >
              {row.map((src, li) => (
                <div
                  key={li}
                  className="bg-white rounded-xl flex items-center justify-center p-5"
                  style={{ height: "140px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Partner logo`}
                    className="max-w-full max-h-full object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
