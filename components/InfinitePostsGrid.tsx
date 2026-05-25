"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/lib/media";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  categories: { nodes: { name: string; slug: string }[] };
  author: { node: { name: string } };
};

type ViewMode = "grid" | "list";

type Props = {
  initialPosts: Post[];
  initialCursor: string | null;
  hasNextPage: boolean;
};

function postHref(post: Post) {
  const cat = post.categories.nodes[0];
  return `/${cat?.slug ?? "uncategorized"}/${post.slug}/`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export default function InfinitePostsGrid({ initialPosts, initialCursor, hasNextPage }: Props) {
  const [posts, setPosts]     = useState<Post[]>(initialPosts);
  const [cursor, setCursor]   = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(hasNextPage);
  const [loading, setLoading] = useState(false);
  const [view, setView]       = useState<ViewMode>("grid");
  const [search, setSearch]   = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const sentinelRef  = useRef<HTMLDivElement>(null);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── fetch a batch from the API ──────────────────────────────────────────────
  const fetchPosts = useCallback(async (opts: {
    after: string | null;
    search: string;
    replace: boolean;
  }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ first: "12" } as Record<string, string>);
      if (opts.after)  params.set("after",  opts.after);
      if (opts.search) params.set("search", opts.search);

      const res  = await fetch(`/api/posts?${params}`);
      const json = await res.json();
      const { nodes, pageInfo } = json.posts;

      setPosts((prev) => opts.replace ? nodes : [...prev, ...nodes]);
      setCursor(pageInfo.endCursor ?? null);
      setHasMore(pageInfo.hasNextPage);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── debounced search ────────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!search) {
      // restore initial state when search is cleared
      setPosts(initialPosts);
      setCursor(initialCursor);
      setHasMore(hasNextPage);
      setSearchActive(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setSearchActive(true);
      fetchPosts({ after: null, search, replace: true });
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ── infinite scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts({ after: cursor, search, replace: false });
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, cursor, search, fetchPosts]);

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Control row */}
      <div className="flex items-center justify-between gap-4 mb-10">

        {/* Search */}
        <div className="relative w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.15 10.15z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-gray-200 overflow-hidden shrink-0">
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`p-2.5 transition-colors ${
              view === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:text-gray-700"
            }`}
          >
            {/* 3×2 grid icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2"  y="2"  width="6" height="6" rx="1" />
              <rect x="12" y="2"  width="6" height="6" rx="1" />
              <rect x="2"  y="12" width="6" height="6" rx="1" />
              <rect x="12" y="12" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`p-2.5 border-l border-gray-200 transition-colors ${
              view === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:text-gray-700"
            }`}
          >
            {/* List icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2" y="3"  width="16" height="3" rx="1" />
              <rect x="2" y="9"  width="16" height="3" rx="1" />
              <rect x="2" y="15" width="16" height="3" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* No results */}
      {searchActive && !loading && posts.length === 0 && (
        <p className="py-20 text-center text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          No articles found for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={postHref(post)} className="group flex flex-col">
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                {post.featuredImage ? (
                  <Image
                    src={resolveMedia(post.featuredImage.node.sourceUrl)}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <h2
                className="mt-4 text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {post.title}
              </h2>
              <p className="mt-1.5 text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                {post.author.node.name}
                <span className="mx-2 text-gray-200">|</span>
                {formatDate(post.date)}
              </p>
              <div
                className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-inter)" }}
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </Link>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="flex flex-col divide-y divide-gray-100">
          {posts.map((post) => (
            <Link key={post.slug} href={postHref(post)} className="group flex gap-6 py-6 first:pt-0">
              {/* Thumbnail */}
              <div className="relative w-40 sm:w-52 aspect-[3/2] shrink-0 overflow-hidden bg-gray-100">
                {post.featuredImage ? (
                  <Image
                    src={resolveMedia(post.featuredImage.node.sourceUrl)}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 160px, 208px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-xs text-gray-400 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {post.author.node.name}
                  <span className="mx-2 text-gray-200">|</span>
                  {formatDate(post.date)}
                </p>
                <h2
                  className="text-xl font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {post.title}
                </h2>
                <div
                  className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {loading && (
        <div className="mt-10 flex justify-center">
          <span
            className="text-sm text-gray-400 uppercase tracking-widest animate-pulse"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Loading…
          </span>
        </div>
      )}

      {!hasMore && posts.length > 0 && !searchActive && (
        <p
          className="mt-10 text-center text-xs text-gray-300 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          You&apos;ve reached the end
        </p>
      )}
    </>
  );
}
