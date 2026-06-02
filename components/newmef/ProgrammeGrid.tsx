"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StatusBadge from "@/components/newmef/StatusBadge";

interface Programme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  year?: number;
  region?: string;
  sectors?: string;
  slug: string;
}

interface Props {
  programmes: Programme[];
  cardImages: Record<string, string>;
  placeholder: string;
}

type TypeFilter   = "all" | "accelerator" | "project";
type StatusFilter = "all" | "active" | "completed";
type SortFilter   = "default" | "az";
type ViewMode     = "card" | "list";

/* ── Shared card (image view) ── */
function CardView({ p, img }: { p: Programme; img: string }) {
  return (
    <Link
      href={`/newmef/programmes/${p.slug}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-red-200 transition-all"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" draggable={false} />
        <div className="absolute top-3 right-3"><StatusBadge status={p.status ?? ""} /></div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
          {p.type} · {p.region}
        </p>
        <h3 className="font-bold uppercase text-gray-900 group-hover:text-red-600 transition-colors leading-tight mb-3" style={{ fontFamily: "var(--font-oswald)", fontSize: "20px" }}>
          {p.name}
        </h3>
        {p.sectors && (
          <p className="text-gray-400 text-xs leading-relaxed mb-4" style={{ fontFamily: "var(--font-inter)" }}>{p.sectors}</p>
        )}
        <p className="text-xs font-semibold uppercase tracking-wide text-red-600" style={{ fontFamily: "var(--font-oswald)" }}>
          View Programme →
        </p>
      </div>
    </Link>
  );
}

/* ── Shared row (list view) ── */
function RowView({ p }: { p: Programme }) {
  return (
    <Link
      href={`/newmef/programmes/${p.slug}`}
      className="group flex items-center justify-between py-5 hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-6">
        <span className="text-gray-300 font-bold w-16 text-right shrink-0" style={{ fontFamily: "var(--font-oswald)", fontSize: "13px" }}>
          {p.year}
        </span>
        <div>
          <p className="font-bold uppercase text-gray-800 group-hover:text-red-600 transition-colors" style={{ fontFamily: "var(--font-oswald)", fontSize: "17px" }}>
            {p.name}
          </p>
          {p.sectors && (
            <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{p.sectors}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="hidden sm:block text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald)" }}>
          {p.type} · {p.region}
        </span>
        <StatusBadge status={p.status ?? ""} />
        <span className="text-gray-300 group-hover:text-red-500 transition-colors text-sm">→</span>
      </div>
    </Link>
  );
}

/* ── View toggle icons ── */
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1" fill={active ? "#111" : "none"} stroke={active ? "#111" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="10" y="1" width="7" height="7" rx="1" fill={active ? "#111" : "none"} stroke={active ? "#111" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="1" y="10" width="7" height="7" rx="1" fill={active ? "#111" : "none"} stroke={active ? "#111" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="10" y="10" width="7" height="7" rx="1" fill={active ? "#111" : "none"} stroke={active ? "#111" : "#9ca3af"} strokeWidth="1.5" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  const c = active ? "#111" : "#9ca3af";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="5" y1="4.5"  x2="17" y2="4.5"  stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="9"    x2="17" y2="9"    stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="13.5" x2="17" y2="13.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="2" cy="4.5"  r="1" fill={c} />
      <circle cx="2" cy="9"    r="1" fill={c} />
      <circle cx="2" cy="13.5" r="1" fill={c} />
    </svg>
  );
}

export default function ProgrammeGrid({ programmes, cardImages, placeholder }: Props) {
  const [search,  setSearch]  = useState("");
  const [typeF,   setTypeF]   = useState<TypeFilter>("all");
  const [statusF, setStatusF] = useState<StatusFilter>("all");
  const [sort,    setSort]    = useState<SortFilter>("default");
  const [view,    setView]    = useState<ViewMode>("card");

  const isFiltered = search !== "" || typeF !== "all" || statusF !== "all" || sort !== "default";

  const filtered = useMemo(() => {
    let list = [...programmes];
    if (search.trim())
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sectors ?? "").toLowerCase().includes(search.toLowerCase())
      );
    if (typeF !== "all")   list = list.filter((p) => p.type === typeF);
    if (statusF !== "all") list = list.filter((p) => p.status === statusF);
    if (sort === "az")     list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [programmes, search, typeF, statusF, sort]);

  const TYPE_ORDER: Record<string, number> = { accelerator: 0, dialogue: 1, project: 2 };
  const byType = (a: Programme, b: Programme) =>
    (TYPE_ORDER[a.type ?? ""] ?? 9) - (TYPE_ORDER[b.type ?? ""] ?? 9);

  const source    = isFiltered ? filtered : programmes;
  const active    = source.filter((p) => p.status === "active").sort(byType);
  const completed = source.filter((p) => p.status !== "active").sort(byType);

  const PILL        = "px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full border transition-colors cursor-pointer";
  const activePill  = "bg-black text-white border-black";
  const inactivePill= "bg-white text-gray-500 border-gray-200 hover:border-gray-400";

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          {/* Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search programmes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest mr-1" style={{ fontFamily: "var(--font-oswald)" }}>Type</span>
            {(["all", "accelerator", "project"] as TypeFilter[]).map((v) => (
              <button key={v} onClick={() => setTypeF(v)} className={`${PILL} ${typeF === v ? activePill : inactivePill}`} style={{ fontFamily: "var(--font-oswald)" }}>
                {v === "all" ? "All" : v === "accelerator" ? "Accelerators" : "Projects"}
              </button>
            ))}

            <span className="w-px h-4 bg-gray-200 mx-1" />

            <span className="text-xs text-gray-400 uppercase tracking-widest mr-1" style={{ fontFamily: "var(--font-oswald)" }}>Status</span>
            {(["all", "active", "completed"] as StatusFilter[]).map((v) => (
              <button key={v} onClick={() => setStatusF(v)} className={`${PILL} ${statusF === v ? activePill : inactivePill}`} style={{ fontFamily: "var(--font-oswald)" }}>
                {v === "all" ? "All" : v === "active" ? "Live" : "Completed"}
              </button>
            ))}

            <span className="w-px h-4 bg-gray-200 mx-1" />

            <button onClick={() => setSort(sort === "az" ? "default" : "az")} className={`${PILL} ${sort === "az" ? activePill : inactivePill}`} style={{ fontFamily: "var(--font-oswald)" }}>
              A → Z
            </button>

            {isFiltered && (
              <button onClick={() => { setSearch(""); setTypeF("all"); setStatusF("all"); setSort("default"); }} className="text-xs text-red-500 hover:text-red-700 ml-1 underline" style={{ fontFamily: "var(--font-inter)" }}>
                Clear
              </button>
            )}
          </div>

          {/* Right side: count + view toggle */}
          <div className="flex items-center gap-4 sm:ml-auto shrink-0">
            {isFiltered && (
              <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}

            {/* View toggle */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setView("card")}
                className={`p-1.5 rounded transition-colors ${view === "card" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                aria-label="Card view"
              >
                <GridIcon active={view === "card"} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded transition-colors ${view === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                aria-label="List view"
              >
                <ListIcon active={view === "list"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Programmes ── */}
      {(statusF === "all" || statusF === "active") && active.length > 0 && (
        <section id="active" className={view === "card" ? "bg-gray-50 py-16" : "bg-white py-16"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-bold uppercase tracking-wide text-black" style={{ fontFamily: "var(--font-oswald)", fontSize: "28px" }}>
                Live Programmes
              </h2>
            </div>

            {view === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {active.map((p) => <CardView key={p.slug} p={p} img={cardImages[p.slug] ?? placeholder} />)}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {active.map((p) => <RowView key={p.slug} p={p} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Completed Programmes ── */}
      {(statusF === "all" || statusF === "completed") && completed.length > 0 && (
        <section id="all" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-bold uppercase tracking-wide text-black mb-10" style={{ fontFamily: "var(--font-oswald)", fontSize: "28px" }}>
              Completed Programmes
            </h2>

            {view === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completed.map((p) => <CardView key={p.slug} p={p} img={cardImages[p.slug] ?? placeholder} />)}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {completed.map((p) => <RowView key={p.slug} p={p} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty state */}
      {isFiltered && filtered.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-gray-400 text-lg" style={{ fontFamily: "var(--font-inter)" }}>No programmes match your search.</p>
          <button onClick={() => { setSearch(""); setTypeF("all"); setStatusF("all"); setSort("default"); }} className="mt-4 text-sm text-red-500 underline" style={{ fontFamily: "var(--font-inter)" }}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
