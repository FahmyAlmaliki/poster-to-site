import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Waves,
  Wind,
  Sun,
  Cpu,
  Droplets,
  Leaf,
  MapPin,
  Download,
  ArrowRight,
  Zap,
  Globe2,
  Users,
  ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-island.jpg";
import owcImg from "@/assets/owc.jpg";
import windImg from "@/assets/wind.jpg";
import biodsscImg from "@/assets/biodssc.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KALAOTOA RISE — Smart Eco-Island System" },
      {
        name: "description",
        content:
          "A Resilient, Integrated, Smart, and Ecological framework powering Kalaotoa Island with 100% local renewable energy.",
      },
      { property: "og:title", content: "KALAOTOA RISE — Smart Eco-Island System" },
      {
        property: "og:description",
        content:
          "Hybrid microgrid combining wave, wind, and bio-solar energy with AI-driven Smart Energy Management.",
      },
    ],
  }),
  component: Index,
});

const ENERGY_SOURCES = [
  { key: "owc", name: "OWC (Wave)", min: 105000, max: 158000, color: "oklch(0.5 0.17 240)" },
  { key: "wind", name: "HAWT + VAWT (Wind)", min: 210000, max: 300000, color: "oklch(0.62 0.16 155)" },
  { key: "biodssc", name: "Bio-DSSC (Solar)", min: 30000, max: 45000, color: "oklch(0.78 0.16 70)" },
] as const;

function Index() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    owc: true,
    wind: true,
    biodssc: true,
  });

  const data = useMemo(() => {
    return ENERGY_SOURCES.filter((s) => enabled[s.key]).map((s) => ({
      name: s.name,
      value: Math.round((s.min + s.max) / 2),
      color: s.color,
    }));
  }, [enabled]);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const islandDemand = 320000;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <EnergySystem />
      <Calculator
        enabled={enabled}
        setEnabled={setEnabled}
        data={data}
        total={total}
        demand={islandDemand}
      />
      <Microgrid />
      <IslandMap />
      <Roadmap />
      <Impact />
      <Team />
      <Footer />
    </div>
  );
}

/* ---------------- Navigation ---------------- */

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#energy", label: "Energy" },
    { href: "#microgrid", label: "Microgrid" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#impact", label: "Impact" },
    { href: "#team", label: "Team" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <Waves className="h-4 w-4" />
          </span>
          <span className="text-base">
            KALAOTOA<span className="text-primary"> RISE</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#team"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Download className="h-4 w-4" /> Paper
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Aerial view of Kalaotoa Island with wind turbines"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/55 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
          <Globe2 className="h-3.5 w-3.5" /> 5th International Youth Summit
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-md md:text-7xl">
          Kalaotoa Rise
          <span className="block bg-gradient-to-r from-accent via-white to-secondary bg-clip-text text-transparent">
            Smart Eco-Island System
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          A <strong>Resilient, Integrated, Smart, and Ecological</strong> framework transforming
          Kalaotoa Island into a 100% renewable, AI-managed microgrid powered by waves, wind, and
          tropical bio-solar cells.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#energy"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
          >
            Explore the Energy System <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            <Download className="h-4 w-4" /> Download Paper
          </a>
        </div>

        <div className="mt-16 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { label: "Renewable Mix", value: "100%" },
            { label: "Annual Output", value: "503k kWh" },
            { label: "Implementation Phases", value: "3" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-5 text-center backdrop-blur"
            >
              <div className="text-2xl font-black text-white md:text-4xl">{s.value}</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/80 md:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <svg
        className="relative -mt-1 block w-full text-background"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,90 1440,40 L1440,90 L0,90 Z"
        />
      </svg>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  const stats = [
    { icon: Zap, label: "Fossil fuel dependency", value: "High" },
    { icon: Droplets, label: "Access to clean water", value: "Limited" },
    { icon: Leaf, label: "Untapped renewables", value: "Vast" },
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="01 — Background"
        title="About Kalaotoa Island"
        subtitle="A remote 3T island in South Sulawesi facing severe climate pressure, yet surrounded by abundant untapped renewable energy."
      />
      <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Kalaotoa Island in the Selayar Archipelago faces severe threats from climate change,
            developmental disparities, and immense pressure on natural resources. Communities depend
            on expensive fossil fuels, suffer limited access to clean water, and live above a vast
            abundance of renewable energy that remains untapped and unintegrated.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            KALAOTOA RISE proposes an innovation laboratory — a replicable prototype for sustainable
            development that can be deployed across the Indonesian archipelago of 17,000+ islands.
          </p>
        </div>
        <div className="grid gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="text-xl font-bold">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Energy System ---------------- */

function EnergySystem() {
  const items = [
    {
      icon: Waves,
      title: "OWC — Oscillating Water Column",
      img: owcImg,
      desc: "An array of 6–8 units drives Wells turbines and 10–15 kW generators, projecting 105,000–158,000 kWh annually — stable energy for 80–120 rural households.",
      output: "105k–158k kWh/yr",
      tint: "from-primary to-chart-4",
    },
    {
      icon: Wind,
      title: "HAWT + VAWT — Wind Turbines",
      img: windImg,
      desc: "A mixed array of horizontal and vertical axis turbines optimized for coastal and hilltop wind regimes, producing 210,000–300,000 kWh/year.",
      output: "210k–300k kWh/yr",
      tint: "from-secondary to-chart-2",
    },
    {
      icon: Sun,
      title: "Bio-DSSC — Dye-Sensitized Solar Cells",
      img: biodsscImg,
      desc: "Cells use natural organic pigments extracted from local tropical plants — papaya leaf, dragon fruit, purple sweet potato, hibiscus — generating 30,000–45,000 kWh/year.",
      output: "30k–45k kWh/yr",
      tint: "from-accent to-chart-3",
    },
  ];

  return (
    <section id="energy" className="bg-gradient-to-b from-muted/40 to-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="02 — The Solution"
          title="Triple Renewable Energy Sources"
          subtitle="Three complementary technologies form a hybrid microgrid powered entirely by local resources."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${it.tint} opacity-30`} />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-primary shadow">
                  <it.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-accent">
                  {it.output}
                </div>
                <h3 className="mt-2 text-xl font-bold leading-tight">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interactive Calculator ---------------- */

function Calculator({
  enabled,
  setEnabled,
  data,
  total,
  demand,
}: {
  enabled: Record<string, boolean>;
  setEnabled: (e: Record<string, boolean>) => void;
  data: { name: string; value: number; color: string }[];
  total: number;
  demand: number;
}) {
  const coverage = Math.min(100, Math.round((total / demand) * 100));
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="Interactive"
        title="Energy Calculator"
        subtitle="Toggle each source to see the projected annual output and the share of island demand it covers."
      />
      <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {ENERGY_SOURCES.map((s) => (
            <label
              key={s.key}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-muted/30 p-4 transition-all hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: s.color }}
                />
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(s.min / 1000).toFixed(0)}k – {(s.max / 1000).toFixed(0)}k kWh/year
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={enabled[s.key]}
                onChange={(e) =>
                  setEnabled({ ...enabled, [s.key]: e.target.checked })
                }
                className="h-5 w-5 accent-[var(--primary)]"
              />
            </label>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-5 text-primary-foreground">
            <div className="text-xs uppercase tracking-wider opacity-80">Total Projected Output</div>
            <div className="mt-1 text-4xl font-black">
              {(total / 1000).toFixed(0)}k <span className="text-lg font-medium">kWh / year</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${coverage}%` }}
              />
            </div>
            <div className="mt-2 text-sm opacity-90">
              Covers <strong>{coverage}%</strong> of island demand (~{(demand / 1000).toFixed(0)}k
              kWh/yr)
            </div>
          </div>
        </div>
        <div className="h-[360px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis dataKey="name" type="category" width={140} />
                <Tooltip
                  formatter={(v: number) => [`${v.toLocaleString()} kWh`, "Annual output"]}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center text-muted-foreground">
              Toggle at least one source to view the chart
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Smart Microgrid ---------------- */

function Microgrid() {
  const features = [
    {
      icon: Cpu,
      title: "AI-driven SEMS",
      desc: "Smart Energy Management System forecasts demand, balances loads, and orchestrates flows across the hybrid grid.",
    },
    {
      icon: Zap,
      title: "Hydrogen Storage",
      desc: "Excess renewable energy is converted and stored as hydrogen for long-duration grid stability.",
    },
    {
      icon: Users,
      title: "Energy Trading",
      desc: "Blockchain-based peer-to-peer trading empowers residents to buy and sell surplus generation locally.",
    },
    {
      icon: Droplets,
      title: "Desalination + Bio-Energy",
      desc: "Multifunctional outputs cover clean water (desalination) and organic waste-to-energy conversion.",
    },
  ];
  return (
    <section id="microgrid" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          kicker="03 — Intelligence"
          title="Smart Microgrid & SEMS"
          subtitle="An AI-managed nervous system projecting 345,000–503,000 kWh of orchestrated output — exceeding the island's total energy demand."
          light
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur transition-all hover:bg-white/10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Island Map ---------------- */

function IslandMap() {
  const markers = [
    { x: 18, y: 70, label: "OWC Array", icon: Waves, color: "bg-primary" },
    { x: 45, y: 30, label: "Wind Farm (HAWT/VAWT)", icon: Wind, color: "bg-secondary" },
    { x: 70, y: 55, label: "Bio-DSSC Garden", icon: Sun, color: "bg-accent" },
    { x: 55, y: 75, label: "SEMS Control Center", icon: Cpu, color: "bg-chart-4" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="Geography"
        title="Component Map — Kalaotoa Island"
        subtitle="Strategically placed across coastal, hilltop, and inland zones for maximum resource capture."
      />
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-border shadow-lg">
        <img
          src={heroImg}
          alt="Kalaotoa Island map"
          loading="lazy"
          className="h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20" />
        {markers.map((m) => (
          <div
            key={m.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <div className="group relative">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full ${m.color} text-white shadow-lg ring-4 ring-white/60`}
              >
                <m.icon className="h-5 w-5" />
              </div>
              <span className="absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100">
                {m.label}
              </span>
              <span className={`absolute inset-0 animate-ping rounded-full ${m.color} opacity-40`} />
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold shadow">
          <MapPin className="h-4 w-4 text-primary" /> Kalaotoa Island, Selayar Archipelago
        </div>
      </div>
    </section>
  );
}

/* ---------------- Roadmap ---------------- */

function Roadmap() {
  const phases = [
    {
      label: "Foundation",
      years: "Year 1–2",
      color: "from-primary to-chart-4",
      desc: "Installation of wind turbines, Bio-DSSC roofing, village battery banks, and the launch of the Bio-Energy Botanical Garden.",
    },
    {
      label: "Expansion",
      years: "Year 3–4",
      color: "from-secondary to-chart-2",
      desc: "Deployment of floating solar platforms, trial micro-turbines, and activation of hydrogen storage systems.",
    },
    {
      label: "Optimization",
      years: "Year 5+",
      color: "from-accent to-chart-3",
      desc: "Achieving >95% renewable fraction, seawater cooling systems, and establishing a community energy trading unit.",
    },
  ];
  return (
    <section id="roadmap" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="04 — Implementation"
          title="Three-Phase Roadmap"
          subtitle="A staged path from foundational infrastructure to a fully optimized, community-owned smart grid."
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent md:block" />
          <div className="grid gap-8 md:grid-cols-3">
            {phases.map((p, i) => (
              <div key={p.label} className="relative">
                <div
                  className={`mb-6 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${p.color} text-2xl font-black text-white shadow-lg ring-8 ring-muted/40`}
                >
                  {i + 1}
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent">
                    {p.years}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">{p.label}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Impact ---------------- */

function Impact() {
  const impacts = [
    {
      icon: Leaf,
      title: "Environmental",
      desc: "Significant reduction in carbon emissions and active preservation of coastal ecosystems.",
      sdg: "SDG 13",
    },
    {
      icon: Zap,
      title: "Economic",
      desc: "Lower energy costs for residents and new opportunities through eco-tourism and energy trading.",
      sdg: "SDG 7",
    },
    {
      icon: Users,
      title: "Social",
      desc: "Improving quality of life by providing stable, 24/7 access to electricity and clean water.",
      sdg: "SDG 11",
    },
  ];
  return (
    <section id="impact" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="05 — Impact"
        title="Impact & Sustainable Development Goals"
        subtitle="A replicable model directly contributing to SDG 7, 11, and 13 — affordable energy, sustainable communities, and climate action."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {impacts.map((im) => (
          <div
            key={im.title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">
                {im.sdg}
              </span>
              <im.icon className="mt-5 h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">{im.title} Impact</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{im.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-sm md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Projected Generation Mix</h3>
          <p className="mt-2 text-muted-foreground">
            With AI-managed SEMS orchestrating output, the integrated system is projected to deliver
            <strong className="text-foreground"> 345,000–503,000 kWh/year</strong> — exceeding the
            island's total energy demand and unlocking surplus for trading and storage.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {ENERGY_SOURCES.map((s, i) => (
              <li key={s.key} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background:
                      i === 0
                        ? "oklch(0.5 0.17 240)"
                        : i === 1
                          ? "oklch(0.62 0.16 155)"
                          : "oklch(0.78 0.16 70)",
                  }}
                />
                <span className="font-medium">{s.name}</span>
                <span className="ml-auto text-muted-foreground">
                  {(s.min / 1000).toFixed(0)}k–{(s.max / 1000).toFixed(0)}k kWh
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ENERGY_SOURCES.map((s) => ({
                  name: s.name,
                  value: Math.round((s.min + s.max) / 2),
                }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
              >
                <Cell fill="oklch(0.5 0.17 240)" />
                <Cell fill="oklch(0.62 0.16 155)" />
                <Cell fill="oklch(0.78 0.16 70)" />
              </Pie>
              <Tooltip
                formatter={(v: number) => `${v.toLocaleString()} kWh/yr`}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Team & Publication ---------------- */

function Team() {
  const team = [
    "Muhammad Pandu Pradana",
    "Aina Salsabila",
    "Fahmy Almaliki Dwi Aditya",
    "Muhammad Nashirulloh Aryanto",
    "Irsyad Annafi Nurhikmah",
  ];
  const advisors = ["Eka Maulana, S.T., M.Eng., M.T", "Cries Avian, S.T., M.T., Ph.D"];
  return (
    <section id="team" className="bg-gradient-to-b from-background to-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="06 — Team"
          title="The Team & Publications"
          subtitle="Brawijaya University — 5th International Youth Summit"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">The Team</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {team.map((name, i) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-accent">
              Faculty Advisors
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {advisors.map((a) => (
                <div
                  key={a}
                  className="rounded-xl border border-border bg-secondary/10 p-4 text-sm font-medium"
                >
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 text-primary-foreground shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Publications</h3>
            <p className="mt-4 text-lg font-semibold leading-snug">
              Download the official paper and IYS 5 poster.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="#"
                className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
              >
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Paper (PDF)
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
              >
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Poster IYS 5
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                <span>References</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-foreground py-12 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2 text-sm">
          <Waves className="h-5 w-5 text-accent" />
          <span className="font-bold">KALAOTOA RISE</span>
          <span className="opacity-60">— Smart Eco-Island System</span>
        </div>
        <p className="text-xs opacity-70">
          © 2026 Brawijaya University Team · 5th International Youth Summit
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Shared ---------------- */

function SectionHeader({
  kicker,
  title,
  subtitle,
  light,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div
        className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-accent" : "text-primary"}`}
      >
        {kicker}
      </div>
      <h2
        className={`mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl ${light ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? "text-white/80" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
