import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traffic Modelling",
  description:
    "Traffic modelling for cleaner urban mobility - MEF's data-driven transport project.",
};

export default function MvtfdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
