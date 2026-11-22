import { useState } from "react";
import { CLEAN_CHAIN, type ChainEntry } from "../data/chainData";

const STATUS_CONFIG = {
  verified: {
    label: "VERIFIED",
    dot: "bg-green-400",
    glow: "#22c55e",
    bar: "bg-green-500/20 border-green-500/30",
    text: "text-green-400",
    badge: "bg-green-500/10 text-green-400 border-green-500/30",
    rowClass: "chain-status-green",
  },
  "in-progress": {
    label: "IN PROGRESS",
    dot: "bg-amber-400",
    glow: "#f59e0b",
    bar: "bg-amber-500/10 border-amber-500/20",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    rowClass: "chain-status-amber",
  },
  tampered: {
    label: "TAMPERED",
    dot: "bg-red-500",
    glow: "#ef4444",
    bar: "bg-red-500/10 border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
    rowClass: "",
  },
};

function formatTs(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST";
}

function HashDisplay({ hash, label }: { hash: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">{label}</span>
      <button onClick={copy} className="flex items-center gap-1.5 group text-left">
        <span className="font-mono text-[10px] text-slate-400 group-hover:text-blue-300 transition-colors break-all">{hash}</span>
        <span className="text-[9px] text-slate-600 group-hover:text-blue-400 shrink-0">{copied ? "✓" : "copy"}</span>
      </button>
    </div>
  );
}

function EntryRow({ entry, index, expanded, onToggle }: { entry: ChainEntry; index: number; expanded: boolean; onToggle: () => void }) {
  const cfg = STATUS_CONFIG[entry.status];
  const isFirst = index === 0;

  return (
    <div className={`${cfg.rowClass} animate-fade-in-up`} style={{ animationDelay: `${index * 60}ms` }}>
      {/* Connector line */}
      <div className="flex">
        <div className="flex flex-col items-center w-10 shrink-0">
          <div
            className={`status-dot w-3 h-3 rounded-full ${cfg.dot} shrink-0 mt-5`}
            style={{ boxShadow: `0 0 8px ${cfg.glow}` }}
          />
          {!isFirst || true ? <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.06)" }} /> : null}
        </div>

        {/* Card */}
        <div
          className={`flex-1 ml-3 mb-2 border rounded cursor-pointer transition-all hover:border-blue-500/30 ${cfg.bar}`}
          onClick={onToggle}
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 px-5 py-4">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs text-blue-300 font-medium">{entry.seq}</span>
                <span className={`text-[10px] font-mono font-semibold tracking-widest border rounded-sm px-2 py-0.5 ${cfg.badge}`}>{cfg.label}</span>
                <span className="text-[10px] font-mono text-slate-500">{entry.witnessApproval === "APPROVED" ? "🔒 Witness: APPROVED" : "⏳ Witness: PENDING"}</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-white tracking-wide">{entry.action.replace(/_/g, " ")}</span>
                <span className="text-slate-500 text-[11px]">·</span>
                <span className="text-slate-400 text-[11px]">{entry.operator}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">{entry.details}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] font-mono text-slate-500">{formatTs(entry.timestamp)}</div>
              <div className="text-[10px] font-mono text-slate-600 mt-0.5">{entry.witnessNode}</div>
              <div className="text-[10px] text-slate-600 mt-2">{expanded ? "▲" : "▼"}</div>
            </div>
          </div>

          {/* Expanded detail */}
          {expanded && (
            <div className="border-t border-white/5 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <HashDisplay hash={entry.hash} label="Entry hash" />
              <HashDisplay hash={entry.prevHash} label="Previous hash" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Console() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const verified = CLEAN_CHAIN.filter((e) => e.status === "verified").length;

  return (
    <div className="min-h-screen" style={{ background: "#060c18" }}>
      {/* Top bar */}
      <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold tracking-wide">Chain Console</span>
            <span className="text-xs font-mono text-slate-500">Chain 1d33c5ee78fbc0c1</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 mt-0.5">Flash Memory &middot; operator key 9608a3150d1394a4 &middot; witness key 0b1088f7140ef514</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Chain integrity</div>
            <div className="text-green-400 font-mono font-semibold text-sm">
              {verified}/{CLEAN_CHAIN.length} VERIFIED
            </div>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Verified</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> In Progress</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Tampered</span>
          </div>
        </div>
      </div>

      {/* Chain list */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div>
          {CLEAN_CHAIN.map((entry, i) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              index={i}
              expanded={expanded === entry.id}
              onToggle={() => setExpanded(expanded === entry.id ? null : entry.id)}
            />
          ))}
        </div>

        {/* Chain seal */}
        <div className="mt-4 ml-10 border border-green-500/20 rounded px-5 py-4" style={{ background: "rgba(34,197,94,0.04)" }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px #22c55e" }} />
            <span className="text-green-400 text-xs font-mono font-semibold tracking-widest uppercase">Chain Sealed — All entries verified</span>
          </div>
          <div className="mt-2 text-slate-500 text-[11px] font-mono">
            Terminal hash: <span className="text-slate-400">f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
