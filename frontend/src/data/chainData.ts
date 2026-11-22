// GENERATED from the real ledger this tool produced. Do not hand-edit.
// Source: D:\akhanda SIH\demo-data\chain.json   chain 1d33c5ee78fbc0c1
//
// Every `hash` below is a real 64-character SHA-256. The browser recomputes each
// one from the `raw` fields in lib/verify.ts, so nothing here is taken on trust.

export type EntryStatus = "verified" | "in-progress" | "tampered";

export interface ChainEntry {
  id: number;
  seq: string;
  timestamp: string;
  operator: string;
  action: string;
  details: string;
  hash: string;
  prevHash: string;
  witnessNode: string;
  witnessApproval: "APPROVED" | "PENDING" | "REJECTED";
  status: EntryStatus;
  custodyTier: string;
  outcome: string;
  /** The 16 signed fields, exactly as the tool hashed them. */
  raw: Record<string, string>;
}

export const CHAIN_ID = "1d33c5ee78fbc0c1";

export const CLEAN_CHAIN: ChainEntry[] = [
  {
    id: 1,
    seq: "AKH-1D33C5EE-000",
    timestamp: "2026-09-03T11:23:38Z",
    operator: "Operator key 9608a3150d1394a4",
    action: "FILE_RECOVERY",
    details: "Signature-based carving of the acquired image. Four files recovered and checked byte for byte against their originals.  Outcome recorded as PARTIAL.",
    hash: "0ae0900cd62d360dac7061c38797ceb7084f38b8f5b1d5ff286d69fca8bf0602",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    witnessNode: "witness 0b1088f7140ef514 (separate machine)",
    witnessApproval: "APPROVED",
    status: "verified",
    custodyTier: "WITNESS_COSIGNED",
    outcome: "PARTIAL",
    raw: {
          "entry_version": "3",
          "chain_id": "1d33c5ee78fbc0c1",
          "seq": "0",
          "prev_hash": "0000000000000000000000000000000000000000000000000000000000000000",
          "op_type": "RECOVER",
          "target_ref": "D:\\akhanda\\demo_bundle_g1\\seized_media.dd",
          "timestamp": "2026-09-03T11:23:38Z",
          "method": "Clear",
          "result_hash": "49bfb22ed641139dd7d302af63a18665475018662a14485fd9bb2ae1ab7bf6a6",
          "operator_decl": "(operator not named)",
          "concur_decl": "(expert not named)",
          "custody_tier": "WITNESS_COSIGNED",
          "outcome": "PARTIAL",
          "presence_ref": "",
          "operator_key_id": "9608a3150d1394a4",
          "tool_ref": "akhanda/0.1.0+c508412d47c60e56"
    },
  },
  {
    id: 2,
    seq: "AKH-1D33C5EE-001",
    timestamp: "2026-09-03T11:23:39Z",
    operator: "Operator key 9608a3150d1394a4",
    action: "SECURE_ERASURE",
    details: "Secure erasure of the target files, single overwrite pass, followed by read-back verification of the written pattern.  Outcome recorded as VERIFIED.",
    hash: "ef4d5f8b47fcee4f3f7992e0e7720cc4e9437a8ce5f57b429a678507919796ca",
    prevHash: "0ae0900cd62d360dac7061c38797ceb7084f38b8f5b1d5ff286d69fca8bf0602",
    witnessNode: "not co-signed (operator only)",
    witnessApproval: "PENDING",
    status: "verified",
    custodyTier: "SOFTWARE_KEY",
    outcome: "VERIFIED",
    raw: {
          "entry_version": "3",
          "chain_id": "1d33c5ee78fbc0c1",
          "seq": "1",
          "prev_hash": "0ae0900cd62d360dac7061c38797ceb7084f38b8f5b1d5ff286d69fca8bf0602",
          "op_type": "ERASE",
          "target_ref": "D:\\akhanda\\demo_bundle_g1\\to_erase",
          "timestamp": "2026-09-03T11:23:39Z",
          "method": "Clear",
          "result_hash": "c1d23013434166198ee541810309bea50bd8b40c78221f7799f4505efd4df0fd",
          "operator_decl": "(operator not named)",
          "concur_decl": "(expert not named)",
          "custody_tier": "SOFTWARE_KEY",
          "outcome": "VERIFIED",
          "presence_ref": "",
          "operator_key_id": "9608a3150d1394a4",
          "tool_ref": "akhanda/0.1.0+c508412d47c60e56"
    },
  },
  {
    id: 3,
    seq: "AKH-1D33C5EE-002",
    timestamp: "2026-09-03T11:23:41Z",
    operator: "Operator key 9608a3150d1394a4",
    action: "OPERATION_REFUSED",
    details: "Blocked before any data was destroyed: the required co-signer was unreachable. The refusal itself is recorded here.  Outcome recorded as NOT_PERFORMED.",
    hash: "6dc136125366ad9a247adc5243eaeed0621bc676b2cd99fa3739df004bf472df",
    prevHash: "ef4d5f8b47fcee4f3f7992e0e7720cc4e9437a8ce5f57b429a678507919796ca",
    witnessNode: "not co-signed (operator only)",
    witnessApproval: "PENDING",
    status: "verified",
    custodyTier: "SOFTWARE_KEY",
    outcome: "NOT_PERFORMED",
    raw: {
          "entry_version": "3",
          "chain_id": "1d33c5ee78fbc0c1",
          "seq": "2",
          "prev_hash": "ef4d5f8b47fcee4f3f7992e0e7720cc4e9437a8ce5f57b429a678507919796ca",
          "op_type": "REFUSED",
          "target_ref": "D:\\akhanda\\demo_bundle_g1\\seized_media.dd",
          "timestamp": "2026-09-03T11:23:41Z",
          "method": "NotPerformed",
          "result_hash": "0f2fb000236ede87aed20a7bec80eade24825b134eabb166ea5783219df34968",
          "operator_decl": "(operator not named)",
          "concur_decl": "(expert not named)",
          "custody_tier": "SOFTWARE_KEY",
          "outcome": "NOT_PERFORMED",
          "presence_ref": "",
          "operator_key_id": "9608a3150d1394a4",
          "tool_ref": "akhanda/0.1.0+c508412d47c60e56"
    },
  },
];
