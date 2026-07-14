import JoinForm from '@/components/JoinForm';

/* ════════════════════════════════════════════════════════════════
   /get-involved — MEF CLIMATE COMMUNITY

   Site design system: navbar/footer via the (main) layout, Oswald/
   Inter type scale, red #e50000 accent. Page metadata is set by the
   route's layout.tsx. The previous version is parked at ./_v1-page.tsx
   (underscore-prefixed, not routed) for reference.
   ════════════════════════════════════════════════════════════════ */

const RED = '#e50000';

const AUDIENCES = [
  {
    title: 'Students & Young Professionals',
    body: 'Start your climate career with real projects, guided learning, and networks.',
    cols: [
      ['Internships', 'Projects', 'Learning'],
      ['Certificates', 'Research', 'Networks'],
    ],
  },
  {
    title: 'Volunteers & Creators',
    body: 'Put your creative and practical skills to work on campaigns that matter.',
    cols: [
      ['Writing', 'Design', 'Storytelling'],
      ['Research', 'Events', 'Campaigns'],
    ],
  },
  {
    title: 'Founders & Innovators',
    body: 'Grow your climate solution with mentors, pilots, and access to capital.',
    cols: [
      ['Accelerators', 'Mentors', 'Investors'],
      ['Demo Days', 'Pilots', 'Funding'],
    ],
  },
  {
    title: 'Researchers & Professionals',
    body: 'Publish, collaborate, and mentor the next generation of climate talent.',
    cols: [
      ['Reports', 'Working Groups', 'Speaking'],
      ['Research', 'Mentoring', 'Collaboration'],
    ],
  },
  {
    title: 'Investors & Donors',
    body: 'Back credible climate solutions, from curated deals to long-term grants.',
    cols: [
      ['Curated Deals', 'Demo Days', 'Founders'],
      ['Fellowships', 'Grants', 'Impact Investment'],
    ],
  },
  {
    title: 'Corporates & CSR Teams',
    body: 'Deploy climate capital, talent, and partnerships with confidence.',
    cols: [
      ['Projects', 'CSR Grants', 'Partnerships'],
      ['Employee Engagement', 'Impact Monitoring'],
    ],
  },
];

const ACCESS_ROWS: {
  title: string;
  body: string;
  pointers: string[];
  img?: { src: string; alt: string };
}[] = [
  {
    title: 'Climate Projects',
    body: 'Hands-on initiatives where members contribute to real environmental outcomes.',
    pointers: ['Field Initiatives', 'Research', 'Volunteering', 'Startup Pilots', 'Local Action'],
    img: { src: '/images/msv-plantation%20drive.png', alt: 'Community members at a plantation drive' },
  },
  {
    title: 'Research & Reports',
    body: 'Knowledge that keeps the community informed and credible.',
    pointers: ['Sector Reports', 'Case Studies', 'Research', 'Policy Insights'],
    img: { src: '/images/fellowship/image-10.webp', alt: 'Research and reports' },
  },
  {
    title: 'Accelerators',
    body: 'Structured support for early-stage climate solutions.',
    pointers: ['Learning', 'Mentorship', 'Partnerships', 'Market Access'],
    img: { src: '/images/Amazon-AWS-GoClimate-Accelerator.webp', alt: 'Amazon AWS GoClimate accelerator cohort' },
  },
  {
    title: 'Events & Demo Days',
    body: 'Where the ecosystem meets, presents, and connects.',
    pointers: ['Founders', 'Investors', 'Researchers', 'Corporates', 'Policymakers'],
    img: { src: '/images/Singapore-Summit_1-1536x1024%20(convert.io).webp', alt: 'Speakers and attendees at the Singapore climate summit' },
  },
  {
    title: 'Funding & Mentorship',
    body: 'Guidance and capital to move ideas forward.',
    pointers: ['Founder Guidance', 'Grants', 'Investor Readiness', 'Specialist Networks'],
    img: { src: '/images/LCE_Card%20(convert.io).webp', alt: 'Low Carbon Earth mentorship programme' },
  },
  {
    title: 'Investment Pipeline',
    body: 'A curated view of climate startups ready for capital.',
    pointers: ['Climate Startups', 'Deal Flow', 'Founder Showcases', 'Investment'],
    img: { src: '/images/community/investment-pipeline.webp', alt: 'Investment-ready startup dashboard' },
  },
  {
    title: 'CSR Grant Deployment',
    body: 'A clear route for corporates to fund climate work.',
    pointers: ['Identify', 'Design', 'Fund', 'Implement'],
    img: { src: '/images/fellowship/image-8.webp', alt: 'CSR grant deployment' },
  },
  {
    title: 'Impact Monitoring',
    body: 'Transparent tracking of outcomes across the ecosystem.',
    pointers: ['Outcomes', 'Participation', 'Environmental Impact', 'Grant Capital'],
    img: { src: '/images/community/research-reports.png', alt: 'Impact monitoring dashboard' },
  },
];

const GAIN_CARDS = [
  { title: 'Certificates & Experience', icon: 'award', pointers: ['Projects', 'Internships', 'Volunteering', 'Research', 'Learning'] },
  { title: 'Climate Career Pathways', icon: 'route', pointers: ['Organisations', 'Mentors', 'Internships', 'Projects', 'Roles'] },
  { title: 'Founder & Alumni Network', icon: 'users', pointers: ['Founders', 'Mentors', 'Experts', 'Investors', 'Alumni'] },
  { title: 'Funding Opportunities', icon: 'banknote', pointers: ['Accelerators', 'Grants', 'Fellowships', 'Investment', 'Partnerships'] },
  { title: 'Demo Days & Investor Access', icon: 'presentation', pointers: ['Present', 'Meet Investors', 'Partnerships', 'Capital'] },
  { title: 'CSR Grant Eligibility', icon: 'landmark', pointers: ['Corporate CSR', 'Institutional Funding', 'Implementation'] },
  { title: 'Climate Profile', icon: 'profile', pointers: ['Certificates', 'Projects', 'Publications', 'Research', 'Speaking'] },
  { title: 'Networking', icon: 'share', pointers: ['Innovation', 'Research', 'Investment', 'Policy', 'Impact'] },
];

const PARTNERS = [
  { logo: '/images/partner-logos/unep_logo_horz.png', name: 'UNEP' },
  { logo: '/images/partner-logos/aws_logo_horz.png', name: 'AWS' },
  { logo: '/images/partner-logos/ifc_logo_horz.png', name: 'IFC' },
  { logo: '/images/partner-logos/incubation-network_logo_horz.png', name: 'The Incubation Network' },
  { logo: '/images/partner-logos/paytm_logo_horz.png', name: 'Paytm' },
  { logo: '/images/partner-logos/aepw_logo_horz.png', name: 'Alliance to End Plastic Waste' },
  { logo: '/images/partner-logos/unwomen_logo_horz.png', name: 'UN Women' },
  { logo: '/images/partner-logos/wri_logo_horz.png', name: 'WRI India' },
  { logo: '/images/partner-logos/googlecloud_logo_horz.png', name: 'Google Cloud' },
  { logo: '/images/partner-logos/investindia_logo_horz.png', name: 'Invest India' },
  { logo: '/images/partner-logos/giz__logo_horz.png', name: 'GIZ' },
  { logo: '/images/partner-logos/microsoft_logo_horz.png', name: 'Microsoft' },
  { logo: '/images/partner-logos/axisbank_logo_horz.png', name: 'Axis Bank' },
  { logo: '/images/partner-logos/amplus-solar_logo_horz.png', name: 'Amplus Solar' },
  { logo: '/images/partner-logos/wasteaid_logo_horz.png', name: 'WasteAid' },
];

const GAIN_ICONS: Record<string, React.ReactNode> = {
  award: (<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>),
  route: (<><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  banknote: (<><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></>),
  presentation: (<><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" /></>),
  landmark: (<><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><polygon points="12 2 20 7 4 7" /></>),
  profile: (<><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></>),
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></>),
};

/* ── Shared bits ───────────────────────────────────────────────── */

function SectionHeading({ title, sub, light }: { title: string; sub: string; light?: boolean }) {
  return (
    <header className="text-center mb-12">
      <h2
        className={`uppercase ${light ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-39)' }}
      >
        {title}
      </h2>
      <p
        className="mt-3"
        style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)', color: light ? 'rgba(255,255,255,0.7)' : '#6b7280' }}
      >
        {sub}
      </p>
    </header>
  );
}

function Pointers({ items, light, size }: { items: string[]; light?: boolean; size?: string }) {
  return (
    <ul
      className="flex flex-wrap gap-y-1"
      style={{ fontFamily: 'var(--font-inter)', fontSize: size ?? 'var(--type-13)', color: light ? 'rgba(255,255,255,0.72)' : '#6b7280' }}
    >
      {items.map((p, i) => (
        <li key={p} className="inline">
          {p}
          {i < items.length - 1 && (
            <span className="font-black mx-2" style={{ color: RED }}>
              &middot;
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}


/* ── Page ──────────────────────────────────────────────────────── */

export default function GetTesterPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-center"
        style={{
          backgroundImage: 'url(/images/community/pathway-climate-action-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100svh',
        }}
      >
        {/* Gradient overlay — dark on the left for text legibility, clearing to the right so the image bleeds through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 32%, rgba(0,0,0,0.28) 66%, rgba(0,0,0,0.08) 100%)',
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-left">
          <span
            className="font-semibold uppercase tracking-widest block mb-3"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)', color: '#f87171' }}
          >
            MEF Fellowship
          </span>

          <h1
            className="font-bold uppercase text-white leading-tight mb-3"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '0.03em' }}
          >
            <span className="block">MEF Climate</span>
            <span className="block">Community</span>
          </h1>

          <p
            className="text-gray-200 mb-5"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-25)', fontWeight: 500 }}
          >
            Your Pathway Into Climate
          </p>

          <div className="mb-7">
            <Pointers
              items={['Projects', 'Research', 'Accelerators', 'Funding', 'Mentorship', 'Events']}
              light
              size="var(--type-16)"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#join"
              className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
            >
              Join the Community
            </a>
            <a
              href="#access"
              className="inline-block px-6 py-2.5 border border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
            >
              Explore Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* ── Who Is It For ── */}
      <section id="who" className="py-20" style={{ background: '#f4f4f5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Who Is It For?" sub="Find your place in the climate ecosystem" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUDIENCES.map((a) => (
              <article
                key={a.title}
                className="flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Top half — dark: title + copy */}
                <div className="flex-1 p-6" style={{ background: '#0a0a0a' }}>
                  <h3
                    className="uppercase text-white"
                    style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-20)' }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="mt-2.5 leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)', color: 'rgba(255,255,255,0.66)' }}
                  >
                    {a.body}
                  </p>
                </div>

                {/* Bottom half — white: red-bullet pointers */}
                <div className="grid grid-cols-2 gap-x-5 p-6 bg-white">
                  {a.cols.map((col, i) => (
                    <ul
                      key={i}
                      className="list-disc pl-4 marker:text-[#e50000]"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)', lineHeight: 1.7, color: '#4b5563' }}
                    >
                      {col.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Can You Access ── */}
      <section id="access" className="border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What Can You Work On?" sub="Opportunities across the MEF ecosystem" />

          <div className="space-y-5">
            {ACCESS_ROWS.map((row, idx) => (
              <article
                key={row.title}
                className={`grid grid-cols-1 rounded-xl overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_34px_rgba(0,0,0,0.14)] transition-shadow ${
                  idx % 2 === 1
                    ? 'md:grid-cols-[minmax(0,1fr)_420px]'
                    : 'md:grid-cols-[420px_minmax(0,1fr)]'
                }`}
              >
                <div className={`relative w-full ${idx % 2 === 1 ? 'md:order-2' : ''}`} style={{ aspectRatio: '16 / 9' }}>
                  {row.img ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={row.img.src}
                        alt={row.img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover block"
                      />
                      {/* Subtle dark overlay to tone the image down */}
                      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-gray-400 uppercase tracking-[0.1em]"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'var(--type-13)',
                        background:
                          'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 10px, transparent 10px 20px)',
                      }}
                      role="img"
                      aria-label="Image placeholder"
                    >
                      Image
                    </div>
                  )}
                </div>

                <div className={`self-center p-7 md:p-9 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h3
                    className="uppercase text-black"
                    style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-25)' }}
                  >
                    {row.title}
                  </h3>
                  <p
                    className="mt-2 mb-4 text-gray-600 max-w-[58ch]"
                    style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
                  >
                    {row.body}
                  </p>
                  <Pointers items={row.pointers} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Can You Gain ── */}
      <section
        id="gain"
        className="relative py-20"
        style={{
          backgroundImage: 'url(/images/SAFFAL%20Member%20Types.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.72)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What Can You Gain?" sub="Build experience, access, and credibility" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GAIN_CARDS.map((c) => (
              <article
                key={c.title}
                className="rounded-xl p-6 border transition-colors hover:bg-white/15"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.18)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center justify-center shrink-0 rounded-lg text-white"
                    style={{ width: 40, height: 40, background: '#0a0a0a' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {GAIN_ICONS[c.icon]}
                    </svg>
                  </span>
                  <h3
                    className="uppercase text-white leading-tight"
                    style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-20)' }}
                  >
                    {c.title}
                  </h3>
                </div>
                <Pointers items={c.pointers} light />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Partners ── */}
      <section className="py-20" style={{ background: '#f4f4f5' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="font-bold uppercase tracking-wide text-black text-center mb-14"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-39)' }}
          >
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {PARTNERS.map(({ logo, name }) => (
              <div
                key={name}
                className="bg-white rounded-xl flex items-center justify-center p-5 border border-gray-200"
                style={{ width: '200px', height: '100px' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={name} className="max-w-full max-h-full object-contain" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join (wired form, shared client component) ── */}
      <JoinForm />
    </main>
  );
}
