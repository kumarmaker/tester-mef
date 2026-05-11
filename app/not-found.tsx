import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-7xl font-bold text-gray-200">404</h1>
      <p className="text-lg text-gray-600">This page could not be found.</p>
      <Link href="/" className="text-blue-600 underline">
        Go home
      </Link>
    </div>
  );
}
