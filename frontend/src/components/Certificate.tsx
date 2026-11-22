import { useState } from "react";
import { CLEAN_CHAIN } from "../data/chainData";

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="py-3 border-b border-slate-800/60 flex flex-col gap-0.5">
      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{label}</span>
      <span className={`text-sm text-slate-200 ${mono ? "font-mono text-[11px] break-all" : ""}`}>{value}</span>
    </div>
  );
}

export default function Certificate() {
  const [printMode, setPrintMode] = useState(false);

  const terminalEntry = CLEAN_CHAIN[CLEAN_CHAIN.length - 1];

  return (
    <div className="min-h-screen" style={{ background: "#060c18" }}>
      {/* Toolbar */}
      <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div>
          <span className="text-white font-semibold tracking-wide">Certificate Viewer</span>
          <div className="text-[11px] font-mono text-slate-600 mt-0.5">
            Section 65B, Indian Evidence Act, 1872 — Electronic Record Certificate
          </div>
        </div>
        <button
          onClick={() => setPrintMode(!printMode)}
          className="px-5 py-2 rounded border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest hover:bg-blue-500/10 transition-all uppercase"
        >
          {printMode ? "Close Print View" : "Print / Export"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Certificate document */}
        <div
          className="rounded border border-white/8 overflow-hidden"
          style={{ background: printMode ? "#fff" : "#0a1020", color: printMode ? "#000" : undefined }}
        >
          {/* Header band */}
          <div
            className="px-8 py-6 flex items-start justify-between"
            style={{ background: printMode ? "#0f1a30" : "linear-gradient(135deg, #0f1a30 0%, #152240 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1c2e52, #3b82f6)" }}>
                  <span className="text-white text-sm font-bold font-mono">Ak</span>
                </div>
                <div>
                  <div className="text-white font-bold tracking-widest text-sm uppercase">AKHANDA</div>
                  <div className="text-blue-400/60 text-[10px] font-mono">Forensic Systems Pvt. Ltd., New Delhi</div>
                </div>
              </div>
              <h2 className="text-white text-lg font-semibold">Certificate of Electronic Record Integrity</h2>
              <p className="text-slate-400 text-xs mt-1">Issued under Section 65B, Indian Evidence Act, 1872</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Certificate No.</div>
              <div className="font-mono text-blue-300 font-medium">AKHANDA-CERT-1d33c5ee78fbc0c1</div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">Issued</div>
              <div className="font-mono text-slate-300 text-xs">14 Nov 2024, 15:30 IST</div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            <div className="text-xs text-slate-400 leading-relaxed mb-6 border-l-2 border-blue-500/40 pl-4">
              I, the person named in Part A below, certify that the electronic records described herein were produced by the AKHANDA
              Forensic Chain-of-Custody System operated at the Forensic Science Laboratory, New Delhi. The system was functioning
              properly during the period of examination. The records are an accurate reproduction of the information stored
              in the computer system.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <div>
                <div className="text-[10px] font-mono text-blue-400/70 uppercase tracking-widest mb-3">Case Details</div>
                <Field label="Chain identifier" value="1d33c5ee78fbc0c1" />
                <Field label="Hash of record" value="4a35a2ba707e646e...f21fedaf" />
                <Field label="Part B - Expert" value="Syntax Squad Examiner - key 0b1088f7140ef514" />
                <Field label="Part A - Person in charge" value="Pulkit Srivastava - key 9608a3150d1394a4" />
                <Field label="Date of Seizure" value="14 November 2024" />
                <Field label="Date of Certificate" value="14 November 2024, 15:30 IST" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-blue-400/70 uppercase tracking-widest mb-3">Device Details</div>
                <Field label="Media type" value="Flash Memory" />
                <Field label="Witness node" value="separate machine, key 0b1088f7140ef514" />
                <Field label="Capacity" value="931.51 GiB (1,000,204,886,016 bytes)" />
                <Field label="Presence device" value="not used for these entries" />
                <Field label="Tool used" value="Akhanda 0.1.0" />
                <Field label="Files Recovered" value="2,914 of 3,847 detected signatures" />
              </div>
            </div>

            {/* Chain summary */}
            <div className="mt-8 border border-white/6 rounded">
              <div className="px-5 py-3 border-b border-white/6 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Chain of Custody — Summary</span>
                <span className="text-xs font-mono text-green-400">6/6 entries verified</span>
              </div>
              <div className="divide-y divide-white/4">
                {CLEAN_CHAIN.map((entry) => (
                  <div key={entry.id} className="px-5 py-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-[10px]">✓</span>
                        <span className="text-xs text-slate-300 font-medium">{entry.action.replace(/_/g, " ")}</span>
                        <span className="text-slate-600 text-[10px]">·</span>
                        <span className="text-slate-500 text-[10px]">{entry.operator}</span>
                      </div>
                      <div className="font-mono text-[9px] text-slate-600 mt-0.5 break-all">{entry.hash}</div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 shrink-0">
                      {new Date(entry.timestamp).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal hash */}
            <div className="mt-6 p-4 rounded border border-blue-500/20" style={{ background: "rgba(59,130,246,0.06)" }}>
              <div className="text-[10px] font-mono text-blue-400/70 uppercase tracking-widest mb-1">Terminal Chain Hash</div>
              <div className="font-mono text-xs text-blue-300 break-all">{terminalEntry.hash}</div>
            </div>

            {/* Limitations — mandatory */}
            <div className="mt-8 p-5 rounded border border-amber-500/20" style={{ background: "rgba(245,158,11,0.05)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400 text-sm">⚠</span>
                <span className="text-amber-400 text-xs font-mono font-semibold tracking-widest uppercase">Certificate Limitations</span>
                <span className="text-[10px] font-mono text-amber-400/60 ml-auto">Mandatory Disclosure — IEA §65B(4)</span>
              </div>
              <ul className="text-[11px] text-slate-400 leading-relaxed space-y-1.5 list-none">
                <li>• This certificate attests to the <em>integrity of the forensic process</em>, not the provenance or admissibility of the underlying data.</li>
                <li>• AKHANDA records operator actions and chain linkage only. It cannot independently verify the identity of the human operators beyond their authenticated credentials at login.</li>
                <li>• The dual-node witness system requires both nodes to be online and mutually reachable at time of entry. Entries created during a network partition are flagged PENDING and must be ratified within 24 hours or invalidated.</li>
                <li>• Recovered file content has not been verified for legal relevance or authenticity by this certificate. Separate expert testimony is required for content interpretation.</li>
                <li>• This certificate was generated by an automated system. The certifying authority (named above) is responsible for independent review before submission to court.</li>
              </ul>
            </div>

            {/* Signature block */}
            <div className="mt-8 flex items-end justify-between border-t border-white/6 pt-6">
              <div>
                <div className="w-48 border-b border-slate-600 mb-1" />
                <div className="text-xs text-slate-400">Syntax Squad Examiner</div>
                <div className="text-[10px] font-mono text-slate-600">FSL New Delhi · Reg. No. FSL-ND-0042</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-600">AKHANDA System Seal</div>
                <div className="font-mono text-[9px] text-blue-400/60 break-all max-w-[200px]">0x7f3a91bc…d8e4f0a2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
