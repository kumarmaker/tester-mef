import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p
          className="font-bold mb-2"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "72px", color: "#e50000", lineHeight: 1 }}
        >
          404
        </p>
        <h1
          className="uppercase text-gray-950 mb-3"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "31px" }}
        >
          Page Not Found
        </h1>
        <p
          className="text-gray-600 mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontSize: "16px" }}
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Explore our
          programmes, research, or ways to get involved instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "14px", letterSpacing: "0.08em", borderRadius: "8px" }}
          >
            Home
          </Link>
          <Link
            href="/research"
            className="inline-block px-6 py-2.5 border border-gray-900 text-gray-900 font-bold uppercase tracking-wide hover:bg-gray-900 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "14px", letterSpacing: "0.08em", borderRadius: "8px" }}
          >
            Research
          </Link>
          <Link
            href="/get-involved"
            className="inline-block px-6 py-2.5 border border-gray-900 text-gray-900 font-bold uppercase tracking-wide hover:bg-gray-900 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "14px", letterSpacing: "0.08em", borderRadius: "8px" }}
          >
            Get Involved
          </Link>
        </div>
      </div>
    </main>
  );
}
