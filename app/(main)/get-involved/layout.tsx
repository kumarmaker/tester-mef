import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join MEF's climate action ecosystem — as a founder, investor, researcher, student, or partner.",
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
