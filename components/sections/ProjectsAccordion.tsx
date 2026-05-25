"use client";

import { useState } from "react";
import Link from "next/link";

export type AccordionProject = {
  label: string;
  subtitle: string;
  href: string;
  image: string;
};

type Props = {
  projects?: AccordionProject[];
  title?: string;
  titleVariant?: "small" | "large";
  rounded?: boolean;
};

const HOMEPAGE_PROJECTS: AccordionProject[] = [
  {
    label: "Livable Cities",
    subtitle: "Natural & Smart Space For Eco-Friendly Lifestyle",
    href: "/livable-cities/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/Project-Livable-Cities.webp",
  },
  {
    label: "Human Animal Conflict",
    subtitle: "Nurturing Wildlife & Nature In Human Settlements",
    href: "/human-animal-conflict/",
    image: "https://massivefoundation.org/wp-content/uploads/2025/05/Human-Animal-Conflict.avif",
  },
  {
    label: "Education",
    subtitle: "Workshops and training to align development with climate action",
    href: "/education/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/Climate-Education.webp",
  },
  {
    label: "Nature Restoration",
    subtitle: "Reviving the natural beauty in urban cityscapes",
    href: "/nature-restoration/",
    image: "https://massivefoundation.org/wp-content/uploads/2024/10/Nature-Restoration.webp",
  },
];

export default function ProjectsAccordion({
  projects = HOMEPAGE_PROJECTS,
  title,
  titleVariant = "small",
  rounded = false,
}: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {title && titleVariant === "small" && (
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600 mb-12"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {title}
          </p>
        )}

        {title && titleVariant === "large" && (
          <h2
            className="font-bold uppercase tracking-wide text-black text-center mb-12"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
          >
            {title}
          </h2>
        )}

        <div className="flex flex-col sm:flex-row gap-1 h-auto sm:h-[580px]">
          {projects.map((project, i) => (
            <button
              key={project.label}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer text-left ${rounded ? "rounded-xl" : ""}`}
              style={{ flex: active === i ? 3 : 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.label}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  active === i ? "bg-black/35" : "bg-black/50"
                }`}
              />

              <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 min-h-[140px] sm:min-h-0">
                {active !== i && (
                  <h3
                    className="text-white text-lg sm:text-base font-bold uppercase leading-tight"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {project.label}
                  </h3>
                )}

                {active === i && (
                  <div>
                    <h3
                      className="text-white text-2xl sm:text-3xl font-bold uppercase leading-tight mb-2"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {project.label}
                    </h3>
                    <p
                      className="text-gray-200 text-sm leading-snug mb-4"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {project.subtitle}
                    </p>
                    <Link
                      href={project.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wide px-5 py-2 transition-colors"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      View Project
                    </Link>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
