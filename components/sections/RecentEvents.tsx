"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EVENTS = [
  {
    label: "ClimateNXT 2025",
    date: "5th June 2025",
    location: "India Habitat Centre, New Delhi",
    title: "World Environment Day Summit",
    description: "ClimateNXT unites inspirational founders, top business leaders, policy makers and visionary investors to engage in discussions on innovative technologies tackling the Climate Crisis.",
    registrationDeadline: "30th May 2025",
    image: "https://massivefoundation.org/wp-content/uploads/2025/05/bgimage.avif",
    galleryHref: "https://forms.massivefoundation.org/ClimateNXT2025",
    detailsHref: "/world-environment-day-summit/",
  },
  {
    label: "Building an Ecosystem for Climate Action",
    date: "March 2025",
    location: "Bengaluru",
    title: "Climate Thursday Bangalore",
    description: "Climate Thursday is a high-impact networking series bringing together climate founders, investors, and policymakers to share insights, funding trends, and ideas for building bold solutions to the climate crisis.",
    registrationDeadline: "March 27, 2025",
    image: "https://massivefoundation.org/wp-content/uploads/2025/04/event-page-climate-thursday.avif",
    galleryHref: "https://massivefoundation.org/climate-thursday/#climate",
    detailsHref: "/climate-thursday/",
  },
  {
    label: "5th Asia Pacific Clean Air Partnership Forum",
    date: "March 2025",
    location: "Japan",
    title: "Invest in Clean Air Now",
    description: "The Asia Pacific Clean Air Partnership (APCAP) is one of the regional initiatives working to strengthen international cooperation on air quality in Asia Pacific.",
    registrationDeadline: "March 21, 2025",
    image: "https://massivefoundation.org/wp-content/uploads/2025/05/japan.avif",
    galleryHref: "https://massivefoundation.org/about-5th-apcap-joint-forum/#japanevent",
    detailsHref: "/about-5th-apcap-joint-forum/",
  },
];

// Triple the cards so there's always content on both sides
const ALL_CARDS = [...EVENTS, ...EVENTS, ...EVENTS];

export default function RecentEvents() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const [dragged, setDragged] = useState(false);

  // Initialise scroll to the middle set so both directions feel infinite
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = track.scrollWidth / 3;
  }, []);

  // After every scroll update, silently jump back to the middle set
  const wrapScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const oneSet = track.scrollWidth / 3;
    if (track.scrollLeft < oneSet * 0.25) {
      track.scrollLeft += oneSet;
      scrollStart.current += oneSet;
    } else if (track.scrollLeft > oneSet * 2 - track.clientWidth * 0.25) {
      track.scrollLeft -= oneSet;
      scrollStart.current -= oneSet;
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragged(false);
    startX.current    = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const delta = (e.pageX - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollStart.current - delta;
    if (Math.abs(delta) > 4) setDragged(true);
    wrapScroll();
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section className="bg-white py-20">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <h2
          className="font-bold uppercase tracking-wide text-black"
          style={{ fontFamily: "var(--font-oswald)", fontSize: "39px" }}
        >
          Recent &amp; Upcoming Events
        </h2>
      </div>

      {/* Constrained + clipped carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-hidden select-none"
          style={{ cursor: "grab", scrollbarWidth: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {ALL_CARDS.map((ev, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end shrink-0"
              style={{ width: "calc(50% - 12px)", height: "520px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ev.image}
                alt={ev.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.15) 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col gap-3">
                <p
                  className="text-xs font-bold uppercase tracking-wide text-gray-300"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {ev.label}
                  <span className="mx-2">•</span>
                  {ev.date}
                  <span className="mx-2">•</span>
                  {ev.location}
                </p>
                <h3
                  className="text-white text-3xl font-bold uppercase leading-tight"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {ev.title}
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {ev.description}
                </p>
                <div
                  className="flex gap-3 pt-1"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <a
                    href={ev.galleryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#e50000] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 transition-colors"
                    style={{ fontFamily: "var(--font-oswald)", borderRadius: "8px" }}
                    onClick={(e) => dragged && e.preventDefault()}
                  >
                    Event Gallery
                  </a>
                  <Link
                    href={ev.detailsHref}
                    className="inline-flex items-center gap-1 border border-white text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
                    style={{ fontFamily: "var(--font-oswald)", borderRadius: "8px" }}
                    onClick={(e) => dragged && e.preventDefault()}
                  >
                    View Details →
                  </Link>
                </div>
                <p
                  className="text-gray-400 text-xs italic"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Last date for registration:{" "}
                  <strong className="text-white not-italic">{ev.registrationDeadline}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot hint */}
      <div className="flex justify-center gap-1.5 mt-6">
        {EVENTS.map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        ))}
      </div>

    </section>
  );
}
