import type { Metadata } from 'next';
import Breadcrumb from '@/components/newmef/Breadcrumb';

export const metadata: Metadata = {
  title: 'A Deep Dive Into Battery Energy Storage System',
  description:
    "Assess the technological landscape of LFP batteries and the bankability models required to meet the nation's 236 GWh energy storage mandate.",
};

const PDF_HREF = '/reports/BESS%20Sector_Report%20by%20Climate%20Angels%20.pdf';
const IMG = '/images/Reports/bess';

const HERO_STATS = [
  { value: '236 GWh', label: 'BESS mandated by the National Electricity Plan by FY2032' },
  { value: '~0.5 GWh', label: 'Operational capacity today — under 0.25% of the target' },
  { value: '₹7.5/kWh', label: 'Midday-to-evening price spread, widening ~17% a year since 2019' },
  { value: '100×', label: 'Deployment acceleration required over the next seven years' },
];

/* ── Small presentational helpers ─────────────────────────── */

function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mt-14 mb-5">
      {eyebrow && (
        <span
          className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ fontFamily: 'var(--font-inter)', color: '#0e5a52' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 uppercase leading-tight"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        <span
          className="inline-block align-middle mr-3"
          style={{ width: 34, height: 4, background: '#0e5a52', borderRadius: 2 }}
        />
        {children}
      </h2>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-gray-700 leading-[1.8] mb-5"
      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
    >
      {children}
    </p>
  );
}

function Lead({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p
      className="text-gray-700 leading-[1.8] mb-5"
      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
    >
      <span className="font-bold text-gray-900">{label}</span> {children}
    </p>
  );
}

function BulletList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mb-6 space-y-4">
      {items.map((it) => (
        <li key={it.title} className="flex gap-3">
          <span
            className="mt-2 shrink-0 rounded-full"
            style={{ width: 8, height: 8, background: '#c08a2d' }}
          />
          <p
            className="text-gray-700 leading-[1.75]"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
          >
            <span className="font-semibold text-gray-900">{it.title}:</span> {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #d9d3be', backgroundColor: '#ffffff' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption
          className="mt-2 text-center text-gray-500"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-8 rounded-xl px-6 py-5"
      style={{ background: '#f3efe0', borderLeft: '4px solid #0e5a52' }}
    >
      <p
        className="text-gray-800 leading-[1.75]"
        style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
      >
        {children}
      </p>
    </blockquote>
  );
}

function DownloadButton({ block }: { block?: boolean }) {
  return (
    <a
      href={PDF_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`${block ? 'flex w-full' : 'inline-flex'} items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-white transition-colors`}
      style={{ fontFamily: 'var(--font-jakarta)', background: '#0e5a52', fontSize: 'var(--type-16)' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Access the Full BESS Sector Report
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function BessSectorReportPage() {
  return (
    <main style={{ backgroundColor: '#ede8d6' }}>
      {/* Hero band — a deeper shade of the page background */}
      <section style={{ backgroundColor: '#e3ddc7', borderBottom: '1px solid #d9d3be' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          <Breadcrumb
            items={[
              { label: 'Research', href: '/research' },
              { label: 'A Deep Dive Into Battery Energy Storage System' },
            ]}
          />

          {/* Title block */}
          <header className="mt-4">
            <h1
              className="text-3xl md:text-5xl font-bold text-gray-900 uppercase leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              The Battery Imperative: Navigating India&rsquo;s Energy Storage Revolution
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
            >
              A Climate Angels sector report on LFP battery technology and the bankability models
              required to meet India&rsquo;s 236 GWh energy storage mandate.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Energy Storage', 'Battery Technology', 'LFP', 'India Grid'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-10)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            <DownloadButton />
          </header>
        </div>
      </section>

      {/* ── Dark editorial hero (commented out — kept for reference) ──────
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0d3b37' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{ width: 520, height: 520, top: -150, right: -110, border: '1px solid rgba(203,160,77,0.22)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12">
          <span
            className="inline-block rounded border px-3 py-1.5 uppercase tracking-[0.2em] mb-8"
            style={{
              borderColor: 'rgba(203,160,77,0.5)',
              color: '#cba04d',
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--type-10)',
            }}
          >
            Research Series &middot; Sector Deep Dive
          </span>
          <h1
            className="font-bold leading-[1.12] mb-6"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: '#f4f1e6',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            The Battery Imperative: Navigating India&rsquo;s Energy Storage Revolution
          </h1>
          <p
            className="max-w-2xl leading-[1.85] mb-8"
            style={{ fontFamily: 'var(--font-inter)', color: '#a7c3bf', fontSize: 'var(--type-16)' }}
          >
            India needs 236 GWh of battery storage by 2032 &mdash; from a base of roughly 0.5 GWh
            today. Grid physics demands it, policy mandates it, and the economics crossed the
            viability line only in FY2024. The question is no longer whether storage gets built, but
            who captures the value &mdash; and who gets wiped out along the way.
          </p>
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
          >
            <span className="font-semibold" style={{ color: '#f4f1e6' }}>
              Climate Angels Research
            </span>
            <span style={{ color: '#cba04d' }}>&bull;</span>
            <span style={{ color: '#8fb0ab' }}>May 2026</span>
            <span style={{ color: '#cba04d' }}>&bull;</span>
            <span style={{ color: '#8fb0ab' }}>12 min read</span>
          </div>
          <p
            className="mt-1 mb-10"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)', color: '#6f938e' }}
          >
            Battery Energy Storage Systems
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: 1, backgroundColor: 'rgba(255,255,255,0.08)' }}
          >
            {HERO_STATS.map((s) => (
              <div
                key={s.value}
                className="px-5 pt-4 pb-6"
                style={{ backgroundColor: '#0d3b37', borderTop: '2px solid #cba04d' }}
              >
                <div
                  className="font-bold mb-1"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#cba04d',
                    fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'var(--type-13)',
                    color: '#9fbdb8',
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ──────────────────────────────────────────────────────────────── */}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-20 [&>*:first-child]:mt-0">
        {/* 1. Introduction */}
        <SectionHeading eyebrow="Section 1">Introduction: The Critical Balance of the Modern Grid</SectionHeading>
        {/* Cover image — add back in v2
        <Figure
          src={`${IMG}/hero.png`}
          alt="A Deep Dive Into Battery Energy Storage System — Climate Angels"
        />
        */}
        <P>
          The electrical grid operates under a physical constraint unique among commodity markets:
          at every millisecond, generation must precisely match consumption. Historically, this
          equilibrium was maintained via dispatchable generation&mdash;coal, gas, and hydro units
          that could modulate output in response to demand. However, the global energy transition
          has dismantled these traditional management assumptions. As we pivot toward
          weather-dependent, variable renewable energy (VRE), supply is no longer a controllable
          variable but an exogenous one. In this paradigm, Energy Storage Systems (ESS) have evolved
          from a non-ancillary supplemental resource into a foundational infrastructure requirement
          for grid survival.
        </P>
        <P>
          In India, this transition is best illustrated by the &ldquo;Duck Curve.&rdquo; The grid
          now experiences a massive midday surplus of low-marginal-cost solar energy, driving market
          prices on the IEX Day-Ahead Market to collapse&mdash;regularly hitting &#8377;0.30/kWh.
          Conversely, as solar output drops, residential and commercial demand surges for the evening
          peak, pushing prices toward the &#8377;10/kWh regulatory ceiling. This midday-to-evening
          spread has widened at a 17% compound annual growth rate since 2019, creating a structural
          arbitrage opportunity. Battery Energy Storage Systems (BESS) are the primary technological
          solution to this temporal mismatch, providing the flexibility necessary to stabilize a
          high-penetration renewable grid.
        </P>

        {/* 2. Decoding BESS */}
        <SectionHeading eyebrow="Section 2">Decoding BESS: The Technical Language of Storage</SectionHeading>
        <P>
          For the strategic investor, a BESS asset is not merely a piece of equipment but a complex
          financial instrument governed by electrochemical physics. Understanding technical
          specifications is mandatory, as these metrics directly dictate the asset&rsquo;s ability to
          capture specific revenue streams. For instance, response times determine eligibility for
          high-value ancillary services, while cycle life dictates the long-term capital expenditure
          required for battery augmentation.
        </P>
        <P>
          The report synthesizes the core concepts essential for evaluating the financial viability
          of storage projects&mdash;from the distinction between power and energy ratings to
          round-trip efficiency, depth of discharge, and levelized cost of storage.
        </P>
        <Lead label="Strategic Asset Allocation Implications.">
          The distinction between MW (Power) and MWh (Energy) defines the asset&rsquo;s role in a
          portfolio. MW-heavy systems are designed for sub-second stabilization, earning high
          premiums for speed, while MWh-dense assets are designed for energy-shifting over several
          hours. An investor must align the technical configuration of the BESS with the intended
          market: 2-hour systems are currently the commercial &ldquo;sweet spot&rdquo; for capturing
          India&rsquo;s peak spreads and providing grid services, while 4-hour systems are
          increasingly required by the National Electricity Plan (NEP-14) to provide firm renewable
          capacity.
        </Lead>

        {/* 3. Beyond Arbitrage */}
        <SectionHeading eyebrow="Section 3">Beyond Arbitrage: The Multi-Dimensional Value of BESS</SectionHeading>
        <P>
          While price arbitrage is the most visible revenue driver, BESS provides a suite of critical
          grid services essential for replacing the &ldquo;spinning reserve&rdquo; and
          &ldquo;governor response&rdquo; of retiring thermal assets. BESS outperforms traditional
          thermal &ldquo;peaker&rdquo; plants across four critical dimensions:
        </P>
        <BulletList
          items={[
            {
              title: 'Frequency Regulation',
              body:
                'As the grid loses the natural inertia of coal plants, BESS provides primary frequency response. These assets can respond in under 30 milliseconds—orders of magnitude faster than thermal ramping. Under India’s Secondary Reserve Ancillary Services (SRAS), operators can capture revenue by maintaining dispatch accuracy exceeding 95%.',
            },
            {
              title: 'Spinning Reserve',
              body:
                'BESS provides instantaneous capacity to cover sudden generation losses. Unlike coal plants, which must burn fuel while idling to provide this service, batteries maintain readiness with zero fuel consumption and minimal mechanical wear.',
            },
            {
              title: 'Black Start Capability',
              body:
                'In the event of system failure, BESS can re-energize grid segments without external power. As coal assets retire, this capability serves as a vital, non-negotiable insurance policy for national grid resilience.',
            },
            {
              title: 'Transmission Congestion Management',
              body:
                'By absorbing local surpluses, BESS can defer or eliminate the need for transmission upgrades costing hundreds of crore per kilometer. Under CERC frameworks, this “grid deferral value” provides uncorrelated diversification, as revenue is independent of wholesale price volatility.',
            },
          ]}
        />
        <Lead label="Operational Superiority.">
          BESS is technically superior to the thermal alternatives it replaces. Its sub-30ms response
          time and zero-fuel idle state make it structurally more capital-efficient than thermal
          peaker plants in an environment characterized by rapid generation shifts.
        </Lead>

        {/* 4. India Context */}
        <SectionHeading eyebrow="Section 4">The India Context: A 236 GWh Strategic Necessity</SectionHeading>
        <P>
          India&rsquo;s storage mandate is driven by the aggressive target of 500 GW of non-fossil
          capacity by 2030. To maintain grid stability at this scale, the National Electricity Plan
          requires 236 GWh of storage. Without this infrastructure, the grid faces massive
          &ldquo;curtailment&rdquo;&mdash;the economically perverse practice of switching off solar
          generation because it cannot be absorbed.
        </P>
        <p
          className="font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
        >
          India-Specific Strategic Drivers:
        </p>
        <BulletList
          items={[
            {
              title: 'Deployment Velocity',
              body:
                'India is adding renewable capacity faster relative to GDP than any other major economy, creating an immediate, acute need for flexibility.',
            },
            {
              title: 'Thermal Fleet Inflexibility',
              body:
                'Much of India’s coal fleet consists of large supercritical units that cannot ramp down below 55–65% of rated capacity without risking damage, leaving the grid unable to accommodate solar peaks.',
            },
            {
              title: 'Industrial Scale',
              body:
                'With over 600,000 MW of industrial load, there is a massive opportunity for behind-the-meter storage. Industrial consumers face peak tariffs of ₹8–12/kWh, creating a strong internal rate of return (IRR) for on-site storage that avoids high demand charges.',
            },
          ]}
        />
        <Lead label="The Execution Gap.">
          As of early 2025, India&rsquo;s installed BESS capacity is approximately 0.5 GWh (expected
          status, FY2025 E). This represents less than 0.25% of the 236 GWh target for 2030. To meet
          the non-negotiable demand of the National Electricity Plan, the deployment trajectory must
          undergo a 100x acceleration within the next seven years.
        </Lead>

        {/* 5. Investment Landscape */}
        <SectionHeading eyebrow="Section 5">The Investment Landscape: Risks, Barriers, and Realities</SectionHeading>
        <P>
          The transition from policy aspiration to a bankable reality is currently obstructed by
          institutional chokepoints that investors must carefully navigate. Two critical risks
          dominate the current bankability agenda:
        </P>
        <BulletList
          items={[
            {
              title: 'DISCOM Financial Health',
              body:
                'The persistent financial weakness and payment unreliability of India’s distribution companies (DISCOMs) remain the primary bottleneck. For BESS projects to be bankable, they require a solvent, reliable offtaker to sign long-term capacity contracts.',
            },
            {
              title: 'Supply Chain Vulnerability',
              body:
                'Approximately 85% of global Lithium Iron Phosphate (LFP) cell production is controlled by China. Every megawatt deployed in India today deepens this strategic dependency, as domestic cell manufacturing has yet to reach meaningful commercial scale.',
            },
          ]}
        />
        <PullQuote>
          <span className="font-bold text-gray-900">The Analyst&rsquo;s Perspective on Returns.</span>{' '}
          Merchant arbitrage economics only crossed the threshold of viability in FY2024. While the
          widening Duck Curve makes the case for energy shifting compelling, the most robust
          investment cases now incorporate secondary revenue streams like SRAS (yielding roughly
          &#8377;0.50/kWh for high-accuracy dispatch). Successful BESS portfolios will be those that
          balance merchant volatility with grid services to achieve uncorrelated, risk-adjusted
          returns.
        </PullQuote>

        {/* 6. Conclusion */}
        <SectionHeading eyebrow="Section 6">Conclusion: Unlocking the Future of Energy</SectionHeading>
        <P>
          BESS is the only technology capable of profitably bridging the gap between midday solar
          abundance and evening demand surges. It is the linchpin of India&rsquo;s energy transition.
          However, realizing the sector&rsquo;s potential requires moving beyond technology pilots to
          address the &ldquo;bankability agenda&rdquo;&mdash;ensuring fiscal solvency among offtakers
          and diversifying revenue streams.
        </P>
        <P>
          As the grid moves toward a 100x acceleration in capacity, the opportunity for early movers
          to capture structural arbitrage and provide essential grid services is unprecedented.
        </P>

        {/* Webinar */}
        <SectionHeading eyebrow="Expert Panel">The Climate Angels BESS Webinar: What the Experts Said</SectionHeading>
        <P>
          To pressure-test the conclusions of this report against the people building, financing, and
          regulating storage in India, Climate Angels convened a live expert panel&mdash;&ldquo;Where
          is the Money to be Made in BESS?&rdquo; The session drew over 200 registrations and ran as a
          free-flowing, deliberately unscripted debate across the full value chain: cells, system
          integration, software and dispatch intelligence, project finance, and grid services.
        </P>

        {/* CTA */}
        <div
          className="mt-12 rounded-2xl px-6 py-8 text-center"
          style={{ background: '#ffffff', border: '1px solid #d9d3be' }}
        >
          <h3
            className="text-xl md:text-2xl font-bold text-gray-900 uppercase mb-2"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Unlock the Full Analysis
          </h3>
          <p
            className="text-gray-600 max-w-xl mx-auto mb-6"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
          >
            For a deeper dive into specific tender analysis, case studies of successful projects, and
            a comprehensive map of the Indian storage ecosystem, access our full professional report.
          </p>
          <div className="max-w-md mx-auto">
            <DownloadButton block />
          </div>
        </div>
      </div>
    </main>
  );
}
