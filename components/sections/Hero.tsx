import Link from "next/link";

const HERO_BG =
  "https://massivefoundation.org/wp-content/uploads/2025/05/Solving-Climate-Change.avif";

export default function Hero() {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: "calc(100vh - 4rem)",
        backgroundImage: `url('${HERO_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-left text-white w-full max-w-7xl mx-auto px-4 sm:px-6">
        <h1
          className="font-bold uppercase tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "69px" }}
        >
          Solving<br />Climate Change
        </h1>

        <p
          className="mt-5 text-lg sm:text-xl md:text-2xl text-gray-200 font-light"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          With innovation, technology, &amp; investments
        </p>

        <Link
          href="/engage-with-us/"
          className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide px-6 py-2 transition-colors"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "24px", borderRadius: "8px" }}
        >
          Make the Change
        </Link>
      </div>
    </section>
  );
}
