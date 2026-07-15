import type { Metadata } from 'next';
import JoinForm from '@/components/JoinForm';
import Breadcrumb from '@/components/newmef/Breadcrumb';

export const metadata: Metadata = {
  title: 'For Students & Young Professionals',
  description:
    'Work on real climate projects, learn from researchers and founders, and build your climate career profile with MEF.',
};

/* ════════════════════════════════════════════════════════════════
   /get-involved/for-students — STUDENT AUDIENCE PAGE (demo)

   First of the audience-category pages. Structure follows
   data-packets/mds/get-involved_for-students_v2.md — 8 beats:
   hero → world you enter → real projects → what can you do →
   what will you gain → pathway → where this takes you → join.
   ════════════════════════════════════════════════════════════════ */

const RED = '#e50000';

const ECOSYSTEM = [
  'Climate projects',
  'Startups & accelerators',
  'Researchers & professionals',
  'Investors & mentors',
  'Corporates & CSR teams',
  'Policy & institutional partners',
];

/* Snapshots — real artefacts from live projects, not stock cards */

const ACTIONS = [
  {
    title: 'Join an Internship',
    body: 'Apply independently or through your university. Work on research, content, programmes, community, or partnerships.',
  },
  {
    title: 'Work on Climate Projects',
    body: 'Support field initiatives, reports, startup programmes, and campaigns.',
  },
  {
    title: 'Research & Publish',
    body: 'Contribute to reports, case studies, and sector research.',
  },
  {
    title: 'Attend Events & Webinars',
    body: 'Meet founders, investors, policymakers, and researchers.',
  },
  {
    title: 'Learn from Mentors',
    body: 'Guidance from people working across climate tech, finance, policy, and research.',
  },
  {
    title: 'Take Leadership',
    body: 'Lead a student chapter, project, event, or working group.',
  },
];

const GAINS = [
  { title: 'Certificates', body: 'Recognition for internships, projects, and contributions.', icon: 'award' },
  { title: 'Stipend Opportunities', body: 'Selected internships and project roles include a stipend.', icon: 'banknote' },
  { title: 'Practical Experience', body: 'Evidence of real work beyond classroom assignments.', icon: 'briefcase' },
  { title: 'A Climate Career Profile', body: 'A visible record of your projects, research, publications, certificates, and leadership.', icon: 'profile' },
  { title: 'Mentorship', body: 'Learn from founders, experts, researchers, and investors.', icon: 'users' },
  { title: 'Networking', body: 'Connect at the heart of the climate ecosystem.', icon: 'share' },
  { title: 'Field Exposure', body: 'Conferences, project visits, demo days — with travel across cities and regions on selected programmes.', icon: 'map' },
];

const GAIN_ICONS: Record<string, React.ReactNode> = {
  award: (<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>),
  banknote: (<><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></>),
  briefcase: (<><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  profile: (<><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></>),
  map: (<><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.895l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></>),
};

const PATHWAY = [
  'Join MEF',
  'Attend an orientation or webinar',
  'Select your area of interest',
  'Work on a project or internship',
  'Contribute research, content, or fieldwork',
  'Earn recognition and certificates',
  'Build your climate profile — and access mentors, networks, and career opportunities',
];

const EXPOSURE = [
  'UNEP-backed programmes',
  'SDGs & climate policy',
  'Accelerator cohorts',
  'Climate summits & demo days',
  'Research publications',
  'India, South Asia & Asia-Pacific programmes',
];

/* Institutions the visitor already trusts — shown, not claimed */
const INSTITUTIONS = [
  { logo: '/images/partner-logos/unep_logo_horz.png', name: 'UNEP' },
  { logo: '/images/partner-logos/unwomen_logo_horz.png', name: 'UN Women' },
  { logo: '/images/partner-logos/ifc_logo_horz.png', name: 'IFC' },
  { logo: '/images/partner-logos/giz__logo_horz.png', name: 'GIZ' },
  { logo: '/images/partner-logos/wri_logo_horz.png', name: 'WRI India' },
  { logo: '/images/partner-logos/aws_logo_horz.png', name: 'AWS' },
  { logo: '/images/partner-logos/googlecloud_logo_horz.png', name: 'Google Cloud' },
  { logo: '/images/partner-logos/microsoft_logo_horz.png', name: 'Microsoft' },
];

const DIRECTIONS = [
  'Climate research',
  'Sustainability',
  'Climate tech',
  'Startups',
  'Policy',
  'Finance',
  'CSR',
  'Consulting',
  'Nonprofits',
];

/* ── Shared bits ───────────────────────────────────────────────── */

function SectionHeading({ title, sub, light }: { title: string; sub?: string; light?: boolean }) {
  return (
    <header className="text-center mb-12">
      <h2
        className={`uppercase ${light ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-39)' }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="mt-3"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)', color: light ? 'rgba(255,255,255,0.7)' : '#6b7280' }}
        >
          {sub}
        </p>
      )}
    </header>
  );
}

/* Subtle, suggestive section-closing cue — the dhvani, not the shout */
function SectionCue({ children, href = '#join', light }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return (
    <div className="mt-10 text-center">
      <a
        href={href}
        className="inline-flex items-center gap-2 group"
        style={{
          fontFamily: 'var(--font-oswald)',
          fontSize: 'var(--type-16)',
          letterSpacing: '0.06em',
          color: light ? '#f87171' : RED,
          textTransform: 'uppercase',
        }}
      >
        {children}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700"
      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
    >
      {children}
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function ForStudentsPage() {
  return (
    <main className="bg-white">
      {/* ── 1. Hero ── */}
      <section
        className="relative flex flex-col"
        style={{
          backgroundImage: 'url(/images/community/pathway-climate-action-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '560px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 32%, rgba(0,0,0,0.28) 66%, rgba(0,0,0,0.08) 100%)',
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col flex-1">
          <div className="[&_a]:text-gray-300 [&_span]:text-gray-300 [&_.text-gray-800]:text-white">
            <Breadcrumb
              items={[{ label: 'Get Involved', href: '/get-involved' }, { label: 'For Students' }]}
            />
          </div>

          <div className="flex flex-col justify-center flex-1 pb-14">
            <span
              className="font-semibold uppercase tracking-widest block mb-3"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)', color: '#f87171' }}
            >
              For Students &amp; Young Professionals
            </span>

            <h1
              className="font-bold uppercase text-white leading-tight mb-3"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '0.03em' }}
            >
              <span className="block">Build Your Climate</span>
              <span className="block">Career Profile</span>
            </h1>

            <p
              className="text-gray-200 mb-4"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-25)', fontWeight: 500 }}
            >
              Your climate career does not have to begin after graduation.
            </p>

            <p
              className="text-gray-300 max-w-xl mb-7 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
            >
              Work on real climate projects. Learn from researchers, founders, investors, and
              institutions. Earn the experience, network, and credibility to begin a career in
              climate.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#join"
                className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
                style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
              >
                Join as a Student
              </a>
              <a
                href="#do"
                className="inline-block px-6 py-2.5 border border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
                style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
              >
                Explore Opportunities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The World You Enter ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="uppercase text-black mb-5"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-39)' }}
          >
            Step Into the Real World of Climate Action
          </h2>
          <p
            className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
          >
            At MEF, climate work happens through the intersection of science, innovation,
            technology, design, and finance. You will get a chance to work on climate finance,
            tech, startups, policies, models, and pilot projects.
          </p>
          <p
            className="uppercase tracking-widest text-gray-400 mb-4"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)' }}
          >
            You may work alongside
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {ECOSYSTEM.map((e) => (
              <Chip key={e}>{e}</Chip>
            ))}
          </div>
          <a
            href="#join"
            className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
          >
            Begin Climate Journey
          </a>
        </div>
      </section>

      {/* ── 3. Snapshots from Live Projects ── */}
      <section className="py-20" style={{ background: '#f4f4f5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Snapshots from Live Projects"
            sub="Not brochures — working artefacts, straight from the field and the lab"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {/* AgriGuru — field snapshot */}
            <figure className="bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
              <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/image6.jpeg"
                  alt="Drone shot of a smart fan for drip irrigation, built by students"
                  loading="lazy"
                  className="w-full h-full object-cover block"
                />
              </div>
              <figcaption
                className="px-6 py-4 text-gray-600"
                style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
              >
                <span className="font-semibold text-gray-900">AgriGuru · field</span> — drone shot
                from a student-made smart fan for the drip irrigation project.
              </figcaption>
            </figure>

            {/* Traffic model — live, interactive */}
            <figure className="bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
              <div className="relative w-full" style={{ aspectRatio: '16 / 10', background: '#0f172a' }}>
                <iframe
                  src="/models/lanediverge3.html"
                  title="Live traffic model — Delhi airport exit with mixed Indian traffic"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <figcaption
                className="px-6 py-4 text-gray-600"
                style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
              >
                <span className="font-semibold text-gray-900">Traffic modelling · live</span> — a
                running simulation of a Delhi airport exit in mixed Indian traffic. Drag the
                sliders; it&apos;s real.
              </figcaption>
            </figure>
          </div>
          <SectionCue>Your work could sit here next</SectionCue>
        </div>
      </section>

      {/* ── 4. What Can You Do ── */}
      <section id="do" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What Can You Do?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIONS.map((a, i) => (
              <article
                key={a.title}
                className="rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <span
                  className="block font-bold mb-3"
                  style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-20)', color: RED }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="uppercase text-black"
                  style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-20)' }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-2 text-gray-600 leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
                >
                  {a.body}
                </p>
              </article>
            ))}
          </div>
          <SectionCue>Pick one — start there</SectionCue>
        </div>
      </section>

      {/* ── 5. What Will You Gain ── */}
      <section className="py-20" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What Will You Gain?" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {GAINS.map((g) => (
              <article
                key={g.title}
                className="rounded-xl p-6 border transition-colors hover:bg-white/15"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.16)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex items-center justify-center shrink-0 rounded-lg"
                    style={{ width: 40, height: 40, background: RED, color: '#fff' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {GAIN_ICONS[g.icon]}
                    </svg>
                  </span>
                  <h3
                    className="uppercase text-white leading-tight"
                    style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-20)' }}
                  >
                    {g.title}
                  </h3>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)', color: 'rgba(255,255,255,0.66)' }}
                >
                  {g.body}
                </p>
              </article>
            ))}
          </div>
          <SectionCue light>Everything here has your name on it</SectionCue>
        </div>
      </section>

      {/* ── 6. Your Student Pathway ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Your Student Pathway" sub="From joining to a working climate profile" />
          <ol className="relative">
            {PATHWAY.map((step, i) => (
              <li key={step} className="relative flex gap-5 pb-9 last:pb-0">
                {/* connector line */}
                {i < PATHWAY.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[19px] top-10 bottom-0 w-px"
                    style={{ background: '#e5e7eb' }}
                  />
                )}
                <span
                  className="relative z-10 flex items-center justify-center shrink-0 rounded-full font-bold text-white"
                  style={{ width: 40, height: 40, background: i === PATHWAY.length - 1 ? RED : '#0a0a0a', fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-16)' }}
                >
                  {i + 1}
                </span>
                <p
                  className="pt-2 text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-16)' }}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
          <SectionCue>Step one takes two minutes</SectionCue>
        </div>
      </section>

      {/* ── 7. Where This Takes You ── */}
      <section className="py-16" style={{ background: '#f4f4f5' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Where This Takes You" />
          <div className="space-y-8">
            <div>
              <p
                className="uppercase tracking-widest text-gray-400 mb-3 text-center"
                style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)' }}
              >
                Exposure
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {EXPOSURE.map((e) => (
                  <Chip key={e}>{e}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p
                className="uppercase tracking-widest text-gray-400 mb-4 text-center"
                style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)' }}
              >
                The Company You&rsquo;ll Keep
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {INSTITUTIONS.map(({ logo, name }) => (
                  <div
                    key={name}
                    className="bg-white rounded-lg flex items-center justify-center p-3 border border-gray-200"
                    style={{ width: '150px', height: '76px' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt={name} className="max-w-full max-h-full object-contain" draggable={false} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="uppercase tracking-widest text-gray-400 mb-3 text-center"
                style={{ fontFamily: 'var(--font-oswald)', fontSize: 'var(--type-13)' }}
              >
                Career Directions
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {DIRECTIONS.map((d) => (
                  <Chip key={d}>{d}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Join — wired form, role pre-set to student ── */}
      <JoinForm defaultRole="student" />
    </main>
  );
}
