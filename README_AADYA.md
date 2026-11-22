# Frontend handover — for Aadya

Your build works and it looks good. This is what changed underneath it, how to run it, and
how to check it on small screens, where there is real work still to do.

---

## Run it

```bash
npm install        # first time only
npm run dev        # opens on http://localhost:5173
```

That is the whole setup. Two other commands you will want:

```bash
npm run build      # production build, also catches type errors
npm run preview    # serve the production build, on http://localhost:4173
```

Always check `npm run build` before sending anything. `npm run dev` is forgiving; the build
is not.

---

## What changed in your code, and why

Your layout, colours, spacing and components are untouched. **The engine underneath is
different**, and you should know exactly how, because a judge will ask you about it.

### 1. The tamper demo now really verifies

Before, `Inject Tamper` ran a 900 ms timer and swapped to a second array where the entries
were already marked `tampered`. Nothing was computed.

It now edits one signed field in memory and **recomputes every fingerprint with the
browser's own SHA-256**. Rows turn red because the arithmetic disagrees. Open the developer
console and every recorded and recomputed hash is printed as it happens.

The new file is `src/lib/verify.ts`. It mirrors the Python core exactly — the same sixteen
fields, in the same order, each prefixed with its length before hashing. It has been checked
against real ledger data and reproduces the Python hashes exactly.

**If a judge asks you "is this real or a mock-up", the honest answer is now: real, press
F12 and watch.**

### 2. The invented case data is gone

The build contained "Insp. Meera Nair", case number "CBI/DEL/2024/1187", a device serial,
a write-blocker serial and "Autopsy 4.21.0". Realistic, and entirely fictional. On a tool
whose whole argument is that it never overstates anything, fabricated case records in front
of NTRO would have been fatal.

Everything now comes from a real ledger the tool produced on 3 September 2026: real
64-character hashes, real key identifiers, a real refused operation.

None of this is a criticism of your work. Figma Make generates placeholder content by
default, and the brief did not make clear that the verification had to be genuine.

### 3. Small things

`src/data/chainData.ts` is now generated from the real ledger — do not hand-edit it. The
page title comes from `.figma/make/site.json`.

---

## Responsiveness — the part that still needs you

I measured what is there. It is thin, and this is the most useful thing you can improve.

| Breakpoint | Uses in the whole app |
|---|---|
| `sm:` (phones) | **0** |
| `md:` (tablets) | 6 |
| `lg:` (laptops) | 3 |

| Risk | Count |
|---|---|
| `overflow-x-auto` on wide content | **0** |
| Fixed pixel widths | 1 |
| `min-w-` constraints | 2 |

Per component: `NavShell.tsx` **0**, `App.tsx` **0**, `Certificate.tsx` 1, `Console.tsx` 1,
`Landing.tsx` 3, `TamperDemo.tsx` 4.

### Why this matters more than usual here

**The screen displays 64-character hashes.** On a 375 px phone, one hash is roughly three
times the screen width. With no `overflow-x-auto` anywhere, that content will either push
the whole page sideways or spill out of its box. Both look broken.

### How to check it, in the browser

1. `npm run dev`, then press **F12**
2. Press **Ctrl + Shift + M** to turn on the device toolbar
3. Work through these widths, in this order:

| Width | Device | What to look for |
|---|---|---|
| **375 px** | iPhone SE | the hardest case. Does anything spill sideways? |
| **390 px** | iPhone 14 | the most common phone in a room |
| **768 px** | iPad portrait | does the layout switch or just squash? |
| **1024 px** | iPad landscape | the `lg:` breakpoint takes effect |
| **1440 px** | laptop | your normal view |

**The single test that matters:** at 375 px, try to scroll the page sideways. If the whole
page moves, something is too wide. Wide content should scroll **inside its own box**, never
move the page.

### What to fix, in order of value

1. **Wrap every wide block in a scrolling container.** Tables, hash rows, the certificate
   grid: `<div className="overflow-x-auto">`. This alone fixes most of it.
2. **Let hashes wrap or truncate.** They already use `break-all` in places. On phones,
   consider showing `0ae0900c…a8bf0602` with the full value on tap.
3. **Give `NavShell` a phone layout.** It has no responsive classes at all. A row of links
   that fits a laptop will not fit 375 px — let it scroll horizontally or stack.
4. **Check the certificate grid.** Two columns at 375 px is unreadable; it should become one.
5. **Add `sm:` steps** where you currently jump straight from mobile to `md:`.

### Checking on a real phone

The browser's device toolbar is good but not perfect — real phones have different fonts and
touch targets. On the same wi-fi:

```bash
npm run dev -- --host
```

It prints a second address like `http://192.168.1.x:5173`. Open that on your phone.

---

## Two things to leave alone

**`src/lib/verify.ts`** — if it changes, it stops matching the Python and every row goes red.
It is deliberately independent, and that is the point: the browser proves the ledger without
trusting the backend.

**`src/data/chainData.ts`** — generated from real output. Editing it by hand would put
invented data back on screen, which is the one thing this project cannot do.

Everything else is yours: layout, colour, type, spacing, motion, structure.

---

## What to say if a judge asks about your part

> *"The screen does not ask a server whether the ledger is valid. It rebuilds each entry
> from its sixteen signed fields, hashes it with the browser's own cryptography and
> compares. Press F12 and you can watch every hash being computed on your own machine."*

That is true, it is checkable in front of them, and it is a stronger claim than anything a
prettier interface could make.
