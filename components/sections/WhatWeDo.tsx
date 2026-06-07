"use client";

import { useState } from "react";
import Link from "next/link";
import ProgrammeBgCard from "@/components/newmef/ProgrammeBgCard";

const ITEMS = [
  {
    label: "Accelerators",
    href: "/programmes/",
    images: [] as string[],
    cards: [
      {
        slug: "lowcarbon-earth-accelerator",
        name: "LowCarbon.Earth",
        type: "Accelerator",
        description: "A global accelerator for low-carbon climate tech startups, backed by MEF and international partners.",
      },
      {
        slug: "saffal",
        name: "SAFFAL",
        type: "Accelerator",
        description: "Supporting agri-food and land-use innovators across South and Southeast Asia with mentorship and capital.",
      },
    ],
    heading: "Scaling Climate Solutions Through World-Class Accelerators",
    body: "MEF's accelerator programmes connect early-stage climate innovators with the funding, mentorship, and networks needed to grow. From LowCarbon.Earth to SAFFAL, we back the founders and teams building the next generation of clean tech, sustainable agriculture, and nature-based solutions — turning bold ideas into market-ready impact.",
  },
  {
    label: "Projects",
    href: "/programmes/",
    images: [] as string[],
    cards: [
      {
        slug: "sustainable-forests-smriti-van",
        name: "Smriti Van",
        type: "Pilot Project",
        description: "Restoring degraded land through community-led afforestation at Smriti Van, creating a living carbon sink in the heart of the city.",
      },
      {
        slug: "net-zero-sarojini-nagar",
        name: "Net Zero Sarojini Nagar",
        type: "Pilot Project",
        description: "India's first net-zero urban neighbourhood pilot — integrating clean energy, waste management, and green mobility in Sarojini Nagar, Delhi.",
      },
    ],
    heading: "On-the-Ground Projects Driving Real Climate Outcomes",
    body: "MEF's pilot projects turn climate ambition into measurable action. From restoring urban forests to building net-zero neighbourhoods, each project serves as a replicable model — proving what's possible and generating the data needed to scale solutions across cities and regions.",
  },
  {
    label: "Report",
    href: "/research/",
    images: [] as string[],
    cards: [
      {
        slug: "delhi-clean-air-report",
        name: "Delhi Clean Air Report",
        type: "Research",
        description: "A comprehensive analysis of Delhi's air quality crisis — tracing sources, seasonal patterns, and policy levers for intervention.",
        imageUrl: "https://massivefoundation.org/wp-content/uploads/2024/09/image.webp",
      },
      {
        slug: "state-of-ev-charging-report",
        name: "State of EV Charging",
        type: "Research",
        description: "Mapping EV charging infrastructure gaps across Indian cities and outlining investment priorities for a scalable clean mobility network.",
        imageUrl: "https://massivefoundation.org/wp-content/uploads/2024/09/image-19-1.webp",
      },
    ],
    heading: "Data-Driven Research That Moves Policy and Capital",
    body: "MEF produces original studies on air quality, urban sustainability, and clean mobility — grounded in field data and built for decision-makers. Our reports inform national policy, attract investment, and set the agenda for the next wave of climate action in India and beyond.",
  },
  {
    label: "Events",
    href: "/events/",
    images: [
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160297.webp",
      "https://massivefoundation.org/wp-content/uploads/2024/08/Frame-160294.webp",
    ],
    cards: [],
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

            {/* Row 1 — cards or plain images */}
            <div className="grid grid-cols-2 gap-3">
              {item.cards && item.cards.length > 0
                ? item.cards.map((card) => (
                    <ProgrammeBgCard
                      key={card.slug}
                      slug={card.slug}
                      name={card.name}
                      type={card.type}
                      description={card.description}
                    />
                  ))
                : item.images.map((src, i) => (
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
