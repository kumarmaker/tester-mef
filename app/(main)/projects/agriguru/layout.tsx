import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriGuru",
  description:
    "AgriGuru - AI-powered advisory for farmers at the intersection of technology and sustainable agriculture.",
};

export default function AgriGuruLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
