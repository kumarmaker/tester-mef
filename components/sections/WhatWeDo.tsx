"use client";

import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  {
    label: "Projects",
    href: "/projects/",
    images: [
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160485-1.webp",
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160485-2.webp",
    ],
    heading: "Building a World Where Nature and Civilization Thrive Together",
    body: "MEF envisions the development of a human world that co-exists and thrives alongside natural ecosystems. To achieve a symbiosis between nature and civilisation, we've set up projects in areas where the two worlds intersect — city infrastructure & wildlife, human & animal habitat, agriculture & forest. Our goal is not just to solve global warming but to create a lush and livable habitat for the whole world.",
  },
  {
    label: "Research",
    href: "/deep-dive/",
    images: [
      "https://massivefoundation.org/wp-content/uploads/2024/09/Frame-160483.webp",
      "https://massivefoundation.org/wp-content/uploads/2024/09/Frame-160482.webp",
    ],
    heading: "Original Studies on Climate Impact",
    body: "We produce data-driven research on air pollution, surface temperature, city design, and water pollution — studies that inform policy, drive investment decisions, and shape the next wave of climate innovation.",
  },
  {
    label: "Innovation",
    href: "/innovations/",
    images: [
      "https://massivefoundation.org/wp-content/uploads/2024/09/image.webp",
      "https://massivefoundation.org/wp-content/uploads/2024/09/image-19-1.webp",
    ],
    heading: "Climate Tech Through Strategic Partnerships",
    body: "Working with global partners including the UN, WRI, and IFC to foster clean tech, agritech, and biotech solutions. We connect entrepreneurs and investors to build and scale technology that directly addresses the climate crisis.",
  },
  {
    label: "Events",
    href: "/events/",
    images: [
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160297.webp",
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160294.webp",
    ],
    heading: "Bringing Climate Leaders Together",
    body: "From Massive Earth Summit to Climate NXTs and Climate Thursdays — our events connect founders, investors, scientists, and policymakers to accelerate climate action and build lasting partnerships.",
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section label */}
        <p
          className="font-bold uppercase tracking-wide text-black mb-12 text-center"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
        >
          What We Do
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-16 items-start">

          {/* Col 1 — Selector list */}
          <div className="flex flex-col border-r border-black">
            {ITEMS.map((it, i) => (
              <button
                key={it.label}
                onClick={() => setActive(i)}
                className={`text-left py-5 border-b transition-colors ${
                  active === i ? "border-black" : "border-transparent"
                }`}
              >
                <span
                  className={`font-bold uppercase transition-colors ${
                    active === i ? "text-black" : "text-gray-400 hover:text-gray-600"
                  }`}
                  style={{ fontFamily: "var(--font-oswald)", fontSize: "49px" }}
                >
                  {it.label}
                </span>
              </button>
            ))}
          </div>

          {/* Col 2 — Images + Content */}
          <div className="flex flex-col gap-6">

            {/* Row 1 — 2 images side by side */}
            <div className="grid grid-cols-2 gap-3">
              {item.images.map((src, i) => (
                <div key={src + i} className="aspect-video overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${item.label} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 — Content */}
            <div>
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {item.heading}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.body}
              </p>
              <Link
                href={item.href}
                className="inline-block mt-5 text-sm font-semibold uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Learn More →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
