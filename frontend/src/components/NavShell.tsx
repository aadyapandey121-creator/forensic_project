import type { ReactNode } from "react";

interface NavShellProps {
  page: string;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

const NAV_ITEMS = [
  { id: "landing", label: "Home" },
  { id: "console", label: "Console" },
  { id: "certificate", label: "Certificate" },
  { id: "tamperdemo", label: "Tamper Demo" },
];

export default function NavShell({ page, onNavigate, children }: NavShellProps) {
  if (page === "landing") return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <nav className="border-b border-white/5 px-8 py-3 flex items-center justify-between sticky top-0 z-50" style={{ background: "rgba(6,12,24,0.95)", backdropFilter: "blur(12px)" }}>
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1c2e52, #3b82f6)" }}>
            <span className="text-white text-[10px] font-bold font-mono">Ak</span>
          </div>
          <span className="text-white font-bold tracking-widest text-xs uppercase group-hover:text-blue-300 transition-colors">AKHANDA</span>
        </button>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 text-[11px] font-mono tracking-wider uppercase transition-colors rounded ${
                page === item.id
                  ? "text-white bg-white/6"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 5px #22c55e" }} />
          <span className="text-[10px] font-mono text-slate-500">LIVE</span>
        </div>
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
}
