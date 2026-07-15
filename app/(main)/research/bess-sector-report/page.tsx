import type { Metadata } from 'next';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { reportSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'A Deep Dive Into Battery Energy Storage System',
  description:
    "Assess the technological landscape of LFP batteries and the bankability models required to meet the nation's 236 GWh energy storage mandate.",
};

/* ════════════════════════════════════════════════════════════════
   REPORT PAGE TEMPLATE (v2 — ported from /tester)

   A reusable, data-driven report layout. The report is described as
   structured data (meta + blocks, markdown-like), and rendered by a
   small set of typographic components. To reuse: swap REPORT out.
   The previous version is kept locally at ./_v1-page.tsx (not routed).
   ════════════════════════════════════════════════════════════════ */

/* ── Content model ─────────────────────────────────────────────── */

type Block =
  | { type: 'heading'; eyebrow?: string; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string; lead?: string }
  | { type: 'list'; items: { title?: string; body: string }[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'callout'; title: string; body: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

interface Report {
  title: string;
  caption: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  cover?: { src: string; alt: string };
  pdf?: string;
  blocks: Block[];
}

/* ── Placeholder content (BESS report) ─────────────────────────── */

const IMG = '/images/Reports/bess';

const REPORT: Report = {
  title: 'The Battery Imperative: Navigating India’s Energy Storage Revolution',
  caption:
    'India needs 236 GWh of battery storage by 2032 — from a base of roughly 0.5 GWh today. The question is no longer whether storage gets built, but who captures the value.',
  author: 'Climate Angels Research',
  date: 'May 2026',
  readTime: '12 min read',
  tags: ['Energy Storage', 'Battery Technology', 'LFP', 'India Grid'],
  cover: { src: `${IMG}/hero.png`, alt: 'A Deep Dive Into Battery Energy Storage System' },
  pdf: '/reports/BESS%20Sector_Report%20by%20Climate%20Angels%20.pdf',
  blocks: [
    /* ── 1. Introduction ── */
    {
      type: 'heading',
      eyebrow: 'Section 1',
      text: 'Introduction: The Critical Balance of the Modern Grid',
    },
    {
      type: 'paragraph',
      text: 'The electrical grid operates under a physical constraint unique among commodity markets: at every millisecond, generation must precisely match consumption. Historically, this equilibrium was maintained via dispatchable generation — coal, gas, and hydro units that could modulate output in response to demand. However, the global energy transition has dismantled these traditional management assumptions. As we pivot toward weather-dependent, variable renewable energy (VRE), supply is no longer a controllable variable but an exogenous one. In this paradigm, Energy Storage Systems (ESS) have evolved from a non-ancillary supplemental resource into a foundational infrastructure requirement for grid survival.',
    },
    {
      type: 'paragraph',
      text: 'In India, this transition is best illustrated by the “Duck Curve.” The grid now experiences a massive midday surplus of low-marginal-cost solar energy, driving market prices on the IEX Day-Ahead Market to collapse — regularly hitting ₹0.30/kWh. Conversely, as solar output drops, residential and commercial demand surges for the evening peak, pushing prices toward the ₹10/kWh regulatory ceiling. This midday-to-evening spread has widened at a 17% compound annual growth rate since 2019, creating a structural arbitrage opportunity. Battery Energy Storage Systems (BESS) are the primary technological solution to this temporal mismatch, providing the flexibility necessary to stabilize a high-penetration renewable grid.',
    },
    {
      type: 'image',
      src: `${IMG}/duck-curve.png`,
      alt: 'The Duck Curve — IEX Day-Ahead Market representative day',
      caption: 'The time dimension: charging on cheap midday solar, discharging into the evening peak',
    },

    /* ── 2. Decoding BESS ── */
    {
      type: 'heading',
      eyebrow: 'Section 2',
      text: 'Decoding BESS: The Technical Language of Storage',
    },
    {
      type: 'paragraph',
      text: 'For the strategic investor, a BESS asset is not merely a piece of equipment but a complex financial instrument governed by electrochemical physics. Understanding technical specifications is mandatory, as these metrics directly dictate the asset’s ability to capture specific revenue streams. For instance, response times determine eligibility for high-value ancillary services, while cycle life dictates the long-term capital expenditure required for battery augmentation.',
    },
    {
      type: 'paragraph',
      text: 'The report synthesizes the core concepts essential for evaluating the financial viability of storage projects — from the distinction between power and energy ratings to round-trip efficiency, depth of discharge, and levelized cost of storage.',
    },
    {
      type: 'paragraph',
      lead: 'Strategic Asset Allocation Implications.',
      text: 'The distinction between MW (Power) and MWh (Energy) defines the asset’s role in a portfolio. MW-heavy systems are designed for sub-second stabilization, earning high premiums for speed, while MWh-dense assets are designed for energy-shifting over several hours. An investor must align the technical configuration of the BESS with the intended market: 2-hour systems are currently the commercial “sweet spot” for capturing India’s peak spreads and providing grid services, while 4-hour systems are increasingly required by the National Electricity Plan (NEP-14) to provide firm renewable capacity.',
    },

    /* ── 3. Beyond Arbitrage ── */
    {
      type: 'heading',
      eyebrow: 'Section 3',
      text: 'Beyond Arbitrage: The Multi-Dimensional Value of BESS',
    },
    {
      type: 'paragraph',
      text: 'While price arbitrage is the most visible revenue driver, BESS provides a suite of critical grid services essential for replacing the “spinning reserve” and “governor response” of retiring thermal assets. BESS outperforms traditional thermal “peaker” plants across four critical dimensions:',
    },
    {
      type: 'list',
      items: [
        {
          title: 'Frequency Regulation',
          body: 'As the grid loses the natural inertia of coal plants, BESS provides primary frequency response. These assets can respond in under 30 milliseconds — orders of magnitude faster than thermal ramping. Under India’s Secondary Reserve Ancillary Services (SRAS), operators can capture revenue by maintaining dispatch accuracy exceeding 95%.',
        },
        {
          title: 'Spinning Reserve',
          body: 'BESS provides instantaneous capacity to cover sudden generation losses. Unlike coal plants, which must burn fuel while idling to provide this service, batteries maintain readiness with zero fuel consumption and minimal mechanical wear.',
        },
        {
          title: 'Black Start Capability',
          body: 'In the event of system failure, BESS can re-energize grid segments without external power. As coal assets retire, this capability serves as a vital, non-negotiable insurance policy for national grid resilience.',
        },
        {
          title: 'Transmission Congestion Management',
          body: 'By absorbing local surpluses, BESS can defer or eliminate the need for transmission upgrades costing hundreds of crore per kilometer. Under CERC frameworks, this “grid deferral value” provides uncorrelated diversification, as revenue is independent of wholesale price volatility.',
        },
      ],
    },
    {
      type: 'callout',
      title: 'Operational Superiority',
      body: 'BESS is technically superior to the thermal alternatives it replaces. Its sub-30ms response time and zero-fuel idle state make it structurally more capital-efficient than thermal peaker plants in an environment characterized by rapid generation shifts.',
    },

    /* ── 4. India Context ── */
    {
      type: 'heading',
      eyebrow: 'Section 4',
      text: 'The India Context: A 236 GWh Strategic Necessity',
    },
    {
      type: 'paragraph',
      text: 'India’s storage mandate is driven by the aggressive target of 500 GW of non-fossil capacity by 2030. To maintain grid stability at this scale, the National Electricity Plan requires 236 GWh of storage. Without this infrastructure, the grid faces massive “curtailment” — the economically perverse practice of switching off solar generation because it cannot be absorbed.',
    },
    { type: 'subheading', text: 'India-Specific Strategic Drivers' },
    {
      type: 'list',
      items: [
        {
          title: 'Deployment Velocity',
          body: 'India is adding renewable capacity faster relative to GDP than any other major economy, creating an immediate, acute need for flexibility.',
        },
        {
          title: 'Thermal Fleet Inflexibility',
          body: 'Much of India’s coal fleet consists of large supercritical units that cannot ramp down below 55–65% of rated capacity without risking damage, leaving the grid unable to accommodate solar peaks.',
        },
        {
          title: 'Industrial Scale',
          body: 'With over 600,000 MW of industrial load, there is a massive opportunity for behind-the-meter storage. Industrial consumers face peak tariffs of ₹8–12/kWh, creating a strong internal rate of return (IRR) for on-site storage that avoids high demand charges.',
        },
      ],
    },
    {
      type: 'callout',
      title: 'The Execution Gap',
      body: 'As of early 2025, India’s installed BESS capacity is approximately 0.5 GWh (expected status, FY2025 E). This represents less than 0.25% of the 236 GWh target for 2030. To meet the non-negotiable demand of the National Electricity Plan, the deployment trajectory must undergo a 100x acceleration within the next seven years.',
    },

    /* ── 5. Investment Landscape ── */
    {
      type: 'heading',
      eyebrow: 'Section 5',
      text: 'The Investment Landscape: Risks, Barriers, and Realities',
    },
    {
      type: 'paragraph',
      text: 'The transition from policy aspiration to a bankable reality is currently obstructed by institutional chokepoints that investors must carefully navigate. Two critical risks dominate the current bankability agenda:',
    },
    {
      type: 'list',
      items: [
        {
          title: 'DISCOM Financial Health',
          body: 'The persistent financial weakness and payment unreliability of India’s distribution companies (DISCOMs) remain the primary bottleneck. For BESS projects to be bankable, they require a solvent, reliable offtaker to sign long-term capacity contracts.',
        },
        {
          title: 'Supply Chain Vulnerability',
          body: 'Approximately 85% of global Lithium Iron Phosphate (LFP) cell production is controlled by China. Every megawatt deployed in India today deepens this strategic dependency, as domestic cell manufacturing has yet to reach meaningful commercial scale.',
        },
      ],
    },
    {
      type: 'image',
      src: `${IMG}/discom-problem.png`,
      alt: 'What the DISCOM problem actually is — five factors',
      caption: 'Why DISCOMs will not sign long-term PPAs: the five dimensions of the offtaker risk',
    },
    {
      type: 'paragraph',
      lead: 'The Analyst’s Perspective on Returns.',
      text: 'Merchant arbitrage economics only crossed the threshold of viability in FY2024. While the widening Duck Curve makes the case for energy shifting compelling, the most robust investment cases now incorporate secondary revenue streams like SRAS (yielding roughly ₹0.50/kWh for high-accuracy dispatch). Successful BESS portfolios will be those that balance merchant volatility with grid services to achieve uncorrelated, risk-adjusted returns.',
    },
    {
      type: 'image',
      src: `${IMG}/investments-global.png`,
      alt: 'Global BESS investment — total funding 2016 to 2024',
      caption: 'Investments: global total funding (USD millions), 2016–2024',
    },
    {
      type: 'image',
      src: `${IMG}/investments-india.png`,
      alt: 'Indian BESS investment — total funding and investors',
      caption: 'Investments: India total funding and the active investor base',
    },
    {
      type: 'image',
      src: `${IMG}/investments-india-stats.png`,
      alt: 'Indian BESS investment — key statistics and companies by stage',
      caption: 'India key statistics and the venture funnel by current stage',
    },

    /* ── 6. Conclusion ── */
    {
      type: 'heading',
      eyebrow: 'Section 6',
      text: 'Conclusion: Unlocking the Future of Energy',
    },
    {
      type: 'paragraph',
      text: 'BESS is the only technology capable of profitably bridging the gap between midday solar abundance and evening demand surges. It is the linchpin of India’s energy transition. However, realizing the sector’s potential requires moving beyond technology pilots to address the “bankability agenda” — ensuring fiscal solvency among offtakers and diversifying revenue streams.',
    },
    {
      type: 'paragraph',
      text: 'As the grid moves toward a 100x acceleration in capacity, the opportunity for early movers to capture structural arbitrage and provide essential grid services is unprecedented.',
    },

    /* ── Expert Panel ── */
    {
      type: 'heading',
      eyebrow: 'Expert Panel',
      text: 'The Climate Angels BESS Webinar: What the Experts Said',
    },
    {
      type: 'paragraph',
      text: 'To pressure-test the conclusions of this report against the people building, financing, and regulating storage in India, Climate Angels convened a live expert panel — “Where is the Money to be Made in BESS?” The session drew over 200 registrations and ran as a free-flowing, deliberately unscripted debate across the full value chain: cells, system integration, software and dispatch intelligence, project finance, and grid services.',
    },
    {
      type: 'image',
      src: `${IMG}/webinar-overview.png`,
      alt: 'BESS webinar overview and the panel',
      caption: 'The panel brought deliberately different vantage points to the same question',
    },
    {
      type: 'quote',
      text: 'Everyone assumes BESS prices will only go down. That is the worst assumption one can make.',
      attribution: 'Abhishek Shukla, ReNew',
    },
    {
      type: 'image',
      src: `${IMG}/key-takeaways.png`,
      alt: 'Eight key takeaways from the expert panel',
      caption: 'Eight key takeaways from the panel',
    },
  ],
};

/* ── Design tokens ─────────────────────────────────────────────── */

const C = {
  pageBg: '#ede8d6',
  heroBg: '#e3ddc7',
  border: '#d9d3be',
  accent: '#0e5a52',
  gold: '#c08a2d',
  ink: '#1a1a1a',
};

/* ── Typographic components ────────────────────────────────────── */

function BlockHeading({ eyebrow, text }: { eyebrow?: string; text: string }) {
  return (
    <div className="mt-16 mb-6 first:mt-0">
      {eyebrow && (
        <span
          className="block text-xs font-semibold uppercase tracking-[0.22em] mb-2.5"
          style={{ fontFamily: 'var(--font-inter)', color: C.accent }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-2xl md:text-[1.9rem] font-bold uppercase leading-tight"
        style={{ fontFamily: 'var(--font-oswald)', color: C.ink }}
      >
        {text}
      </h2>
      <div className="mt-3" style={{ width: 44, height: 4, background: C.accent, borderRadius: 2 }} />
    </div>
  );
}

function BlockSubheading({ text }: { text: string }) {
  return (
    <h3
      className="mt-10 mb-4 text-lg md:text-xl font-bold"
      style={{ fontFamily: 'var(--font-jakarta)', color: C.ink }}
    >
      {text}
    </h3>
  );
}

function BlockParagraph({ text, lead }: { text: string; lead?: string }) {
  return (
    <p
      className="mb-6 text-gray-700 leading-[1.85]"
      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
    >
      {lead && <span className="font-bold" style={{ color: C.ink }}>{lead} </span>}
      {text}
    </p>
  );
}

function BlockList({ items }: { items: { title?: string; body: string }[] }) {
  return (
    <ul className="mb-8 space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            className="mt-[0.65rem] shrink-0 rounded-full"
            style={{ width: 7, height: 7, background: C.gold }}
          />
          <p
            className="text-gray-700 leading-[1.75]"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
          >
            {it.title && <span className="font-semibold" style={{ color: C.ink }}>{it.title}: </span>}
            {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function BlockQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="my-10 px-6 md:px-10 text-center">
      <p
        className="text-xl md:text-2xl leading-snug font-medium"
        style={{ fontFamily: 'var(--font-jakarta)', color: C.accent }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite
          className="mt-3 block not-italic text-gray-500"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
        >
          &mdash; {attribution}
        </cite>
      )}
    </blockquote>
  );
}

function BlockCallout({ title, body }: { title: string; body: string }) {
  return (
    <aside
      className="my-8 rounded-xl px-6 py-5"
      style={{ background: '#f6f3e7', borderLeft: `4px solid ${C.accent}`, border: `1px solid ${C.border}`, borderLeftWidth: 4, borderLeftColor: C.accent }}
    >
      <p
        className="font-bold mb-1.5"
        style={{ fontFamily: 'var(--font-jakarta)', color: C.ink, fontSize: 'var(--type-16)' }}
      >
        {title}
      </p>
      <p
        className="text-gray-700 leading-[1.75]"
        style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
      >
        {body}
      </p>
    </aside>
  );
}

function BlockImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${C.border}`, backgroundColor: '#ffffff' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-center text-gray-500"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'heading':
      return <BlockHeading key={i} eyebrow={block.eyebrow} text={block.text} />;
    case 'subheading':
      return <BlockSubheading key={i} text={block.text} />;
    case 'paragraph':
      return <BlockParagraph key={i} text={block.text} lead={block.lead} />;
    case 'list':
      return <BlockList key={i} items={block.items} />;
    case 'quote':
      return <BlockQuote key={i} text={block.text} attribution={block.attribution} />;
    case 'callout':
      return <BlockCallout key={i} title={block.title} body={block.body} />;
    case 'image':
      return <BlockImage key={i} src={block.src} alt={block.alt} caption={block.caption} />;
  }
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function TesterPage() {
  const r = REPORT;
  return (
    <main style={{ backgroundColor: C.pageBg }}>
      <JsonLd
        data={reportSchema({
          name: 'A Deep Dive Into Battery Energy Storage System',
          description: r.caption,
          slug: 'bess-sector-report',
        })}
      />
      {/* ── Masthead ── */}
      <section style={{ backgroundColor: C.heroBg, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-12">
          <Breadcrumb
            items={[{ label: 'Research', href: '/research' }, { label: r.title }]}
          />

          <header className="mt-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-10)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-[2.9rem] font-bold uppercase leading-[1.08] mb-5"
              style={{ fontFamily: 'var(--font-oswald)', color: C.ink }}
            >
              {r.title}
            </h1>

            {/* Caption */}
            <p
              className="text-gray-600 leading-[1.7] mb-7 max-w-2xl"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
            >
              {r.caption}
            </p>

            {/* Meta row: author · date · read time */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-5"
              style={{ borderTop: `1px solid ${C.border}`, fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
            >
              <span
                className="flex items-center justify-center rounded-full font-bold text-white uppercase"
                style={{ width: 34, height: 34, background: C.accent, fontSize: 'var(--type-13)' }}
                aria-hidden
              >
                {r.author.charAt(0)}
              </span>
              <span className="font-semibold" style={{ color: C.ink }}>{r.author}</span>
              <span className="text-gray-400">&bull;</span>
              <span className="text-gray-600">{r.date}</span>
              <span className="text-gray-400">&bull;</span>
              <span className="text-gray-600">{r.readTime}</span>

              {r.pdf && (
                <a
                  href={r.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ fontFamily: 'var(--font-jakarta)', background: C.accent, fontSize: 'var(--type-13)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Report
                </a>
              )}
            </div>
          </header>
        </div>
      </section>

      {/* ── Cover image — bridges masthead and body ── */}
      {r.cover && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-0">
          <div className="relative" style={{ marginTop: '-0px' }}>
            <div
              className="rounded-xl overflow-hidden mt-8"
              style={{ border: `1px solid ${C.border}`, boxShadow: '0 18px 40px -18px rgba(26,26,26,0.28)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.cover.src} alt={r.cover.alt} className="w-full h-auto block" />
            </div>
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-14">
        {r.blocks.map(renderBlock)}
      </article>

      {/* ── End CTA ── */}
      {r.pdf && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div
            className="rounded-2xl px-6 py-9 text-center"
            style={{ background: '#ffffff', border: `1px solid ${C.border}` }}
          >
            <h3
              className="text-xl md:text-2xl font-bold uppercase mb-2"
              style={{ fontFamily: 'var(--font-oswald)', color: C.ink }}
            >
              Read the Full Report
            </h3>
            <p
              className="text-gray-600 max-w-xl mx-auto mb-6"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
            >
              Tender analysis, case studies, and a comprehensive map of the ecosystem &mdash; in the
              complete professional report.
            </p>
            <a
              href={r.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ fontFamily: 'var(--font-jakarta)', background: C.accent, fontSize: 'var(--type-16)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download the Report
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
