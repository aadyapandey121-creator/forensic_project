interface LandingProps {
  onNavigate: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #060c18 0%, #0a1020 60%, #0f1a30 100%)" }}>
      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1c2e52, #3b82f6)" }}>
            <span className="text-white text-xs font-bold font-mono">Ak</span>
          </div>
          <span className="text-white font-bold tracking-widest text-sm uppercase">AKHANDA</span>
          <span className="text-blue-400/60 text-xs font-mono ml-2">v2.4.1</span>
        </div>
        <div className="flex items-center gap-1">
          {["Console", "Certificate", "TamperDemo"].map((label) => (
            <button
              key={label}
              onClick={() => onNavigate(label.toLowerCase())}
              className="px-4 py-2 text-xs font-medium tracking-wider text-slate-400 hover:text-white transition-colors uppercase"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-blue-500/30" style={{ background: "rgba(59,130,246,0.08)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #22c55e" }} />
          <span className="text-xs font-mono text-blue-300 tracking-widest uppercase">CERT-IN Empanelled · FSL-Approved · IEA 65B Compliant</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-6" style={{ letterSpacing: "-0.02em" }}>
          AKHANDA
        </h1>
        <p className="text-lg md:text-xl font-light text-slate-400 max-w-xl mb-3" style={{ letterSpacing: "0.06em" }}>
          अखंड — Unbroken. Indivisible. Complete.
        </p>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mb-14">
          Forensic chain-of-custody integrity system for seized digital media.
          Every action cryptographically sealed to the last. Every entry witnessed by a second independent node.
          No page can be quietly removed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <button
            onClick={() => onNavigate("console")}
            className="px-8 py-3.5 rounded text-sm font-semibold text-white tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg, #1c2e52 0%, #3b82f6 100%)", boxShadow: "0 0 24px rgba(59,130,246,0.3)" }}
          >
            Open Console
          </button>
          <button
            onClick={() => onNavigate("tamperdemo")}
            className="px-8 py-3.5 rounded text-sm font-semibold text-red-400 border border-red-500/40 tracking-wider uppercase hover:bg-red-500/10 transition-all active:scale-95"
          >
            Run Tamper Demo
          </button>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-4xl w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          {[
            {
              icon: "⛓",
              title: "Linked-Hash Chain",
              body: "Each entry's SHA-256 hash seals the previous one. A single altered byte propagates as an instant, auditable break.",
            },
            {
              icon: "👁",
              title: "Dual-Node Witness",
              body: "A physically separate approval node must countersign every entry. No single operator can fabricate the record alone.",
            },
            {
              icon: "📜",
              title: "Court Certificate",
              body: "Outputs a structured certificate in the format now required by Indian courts under Section 65B of the Indian Evidence Act.",
            },
          ].map((f) => (
            <div key={f.title} className="p-8 text-left" style={{ background: "#060c18" }}>
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2 text-sm tracking-wide uppercase">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-8 py-5 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-600">© 2024 AKHANDA Forensic Systems Pvt. Ltd., New Delhi</span>
        <span className="text-xs font-mono text-slate-700">MHA EMPANELLED · ISO 17025</span>
      </footer>
    </div>
  );
}
