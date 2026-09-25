---
inclusion: manual
---

# DENIED. — Complete Project Handbook

This is the master handover document. A fresh Kiro session (or a human) reading
this file end-to-end has everything needed to continue working on DENIED.
Written September 2026, at the point the project moved off the original
development machine.

---

## 1. What DENIED. is

DENIED. is a premium streetwear brand — deniedofficial.com, Instagram
@denied._official. Positioning: wearable storytelling, limited pieces,
deliberate scarcity. Owner: Divyansh Ahuja (GitHub DA2793).

**Tagline:** "Not for Everyone. Luxury for the Selected."

**The brand card (locked, on the About page):**
- Why DENIED? Because approval was never the goal. The best stories begin with "No."
- What is DENIED? Wearable storytelling. Limited pieces. Never restocked.
- DENIED who? The ordinary. Some standards still exist.

The founder's letter on /about closes with "If you understand, you belong."
A curated one-liner bank lives in `Business/brand-copy.md` (tiered: hero lines
vs. supporting lines; "Prove Them Wrong" was retired for conflicting with
"Nothing To Prove").

Brand palette in code: gold `#C9A96E`, ivory `#F6F1E7`, near-black grounds.
Display type on generated assets: Bahnschrift Bold Condensed (closest local
match to the site's display font).

## 2. Repository and deployment

- Repo: `github.com/DA2793/deniedofficial` — Next.js 14 (App Router,
  TypeScript, Tailwind, framer-motion).
- Hosting: Vercel, deploys from `main`.
- **Ship workflow (covenant):** work and commit on `dev`, then
  `git push origin dev:main dev` (updates both branches in one push).
- **Quality gate:** `npx tsc --noEmit` AND `npm run build` must pass before
  any code push. Asset-only swaps (replacing an image at the same path) may
  skip the build.
- **Never commit:** `Business/`, `Designs/`, root `Products/` — these are
  local working folders. `public/Products/` (the live site images) IS
  committed. Note: a few old snapshots of the excluded folders exist in git
  history; the local/uploaded copies are the current truth.

### Services and keys
- Supabase (DB + auth) and Razorpay (payments) — keys live ONLY in
  `.env.local` (never committed; `.env.example` shows the shape).
- Qikink — print-on-demand production partner. No API; masters are uploaded
  through their dashboard manually.

### Dependencies to install on a new machine
1. Node.js — version pinned in `.nvmrc`; then `npm install`.
2. Python 3 with `pip install pillow numpy openpyxl` — all design/mockup/reel
   pipelines are Python.
3. ffmpeg — reel encoding.
4. `.env.local` restored to repo root.
Verify with `npm run dev` (site on :3000) and `npm run build`.

## 3. Site architecture

### Product data — `src/data/products.ts`
Single source of truth for the catalog. No CMS. Key fields on `Product`:
- `category`: "T-Shirts" | "Shirts" | "Caps" (plain string, must match
  everywhere — collection tabs, navbar, footer, Categories grid).
- `tier` (T-Shirts only): "The Foundation" (always in stock) | "The Numbered"
  (capped at 100, never restocked) | "The Chapter" (themed story worlds) |
  null (Caps, Shirts, some women's pieces).
- `chapterSlug`: chapter products link to `/chapter/<slug>` instead of the
  product page — the story sells the piece.
- `geet` + `geetImages`: membership of unisex pieces in The Geet Collection
  (women's storefront at /geet); first geetImage fronts the card so a male
  model never faces a Geet card.
- `cardTitle` / `cardSubtitle`: card-only display overrides. Used by the
  Shirts so six same-named products show as "Black / Oversized Shirt" etc.
- `unitCap`: 100 for Numbered/Chapter pieces, null = untracked/unlimited.
- Builders keep entries compact: `neelkanthTee()`, `animeTee()`,
  `oversizedShirt()`, `geetColorImages()`.

### Product IDs (non-contiguous, hand-assigned)
- 1–21: originals (Signature, Acid Washed, Supima, Polo id 4, Caps 5–6,
  Numbered oversized 7–13 incl. Unique 7, Geet pieces 18–21, etc.)
- 22–28: Neelkanth chapter tees
- 29: Think Outside the Box
- 30–38: Anime chapter (see §5)
- 39–44: Oversized Shirts, one product PER COLOUR: 39 Black, 40 Maroon,
  41 Navy Blue, 42 Baby Pink, 43 Lavender, 44 Baby Blue. Pastels (42–44)
  are also Geet members. Shirts tab shows fixed order via `SHIRT_ORDER`
  in `src/app/collection/page.tsx`: 39, 41, 40, 42, 43, 44.

### Stock model (two independent layers)
1. **Unit caps** — Supabase table `product_stock` (product_id, unit_cap,
   units_sold). Only Numbered/Chapter products have rows; a missing row means
   unlimited (Foundation, Caps, Shirts). Checkout reserves atomically via the
   `reserve_product_stock` Postgres function. Product pages fetch
   `/api/stock` only when `tier` is non-null. Sold-out display text:
   "Unavailable."
2. **Variant sellouts** — `src/lib/variantAvailability.ts`, a hard-coded
   rule list (productIds × colour × sizes) that disables specific size
   buttons. **Kept in sync manually with `Business/out-of-stock.xlsx` — the
   sheet is a FULL REPLACEMENT list, not additive.** When the owner says
   "updated out of stock", read the xlsx and rewrite UNAVAILABLE_VARIANTS to
   match exactly (confirm restocks before removing rules).

### Pages worth knowing
- `/collection` — category tabs (All/T-Shirts/Shirts/Caps), tier + gender
  sub-filters (T-Shirts only), hero H1 names the open category, session-
  stable shuffle (`useShuffledProducts`, seed in sessionStorage) EXCEPT the
  Shirts tab which is pinned.
- `/chapter/anime|neelkanth|zodiac` — story-led chapter worlds. "Enter the
  Collection" CTA exists ONLY on Zodiac; Neelkanth/Anime use per-beat
  "Claim Yours".
- `/geet` — The Geet Collection storefront, curated order in GEET_ORDER
  (GeetClient.tsx), currently leads with shirt pastels 42, 43, 44.
- `/about` — brand card ("The Name, Answered"), founder's letter.
- Product images: `public/Products/<Category>/<Tier>/<Product>/<Colour>/n.webp`
  (folder names strip spaces; newer products use webp, older ones png).
  Convention: convert source PNGs to webp quality 88 for the site.

## 4. Categories snapshot (Sept 2026)

- **T-Shirts**: Foundation (Signature Oversized, Polo, Supima...), Numbered
  (Acid Washed, Unique, The Game Begins, Think Outside the Box...), Chapter
  (Zodiac, Neelkanth 22–28, Anime 30–38), Geet pieces.
- **Shirts** (new, launched Sept 2026): one style — Monogram Oversized Shirt
  at ₹1,199, 6 colours, always available, never numbered. Ivory monogram
  chest mark on dark colours, black monogram on pastels. Size chart S–3XL
  (chest 41→51, length 26.5→31.5) from `Products/Shirts/Size Chart.xlsx`.
- **Caps**: Ottoman, Snapback (Black/Red). Untiered, unlimited, "One Size".

## 5. The Anime chapter (Saga 01: One Piece)

Nine tees, ₹1,499, Black + Navy Blue only (Royal Blue was eliminated after
Qikink mockup checks), cap 100 each, `chapterSlug: "anime"`. **Locked
narrative order** (ids follow it): Identity 30, Dream 31, Ambition 32,
Crew 33, Evolution 34, Loyalty 35, Liberation 36, Cost 37, 3D2Y 38.

Names are concepts, never character names (Luffy→Liberation, Zoro→Loyalty) —
IP safety + pattern consistency. Each has a locked one-line story (in
products.ts descriptions, e.g. Loyalty: "Nothing happened. Yet everything
did."). The chapter page (`AnimeChapterClient.tsx`) is a nine-beat saga that
auto-matches products by name prefix; `GrandLineBackdrop.tsx` draws the
charted-sea theme. 3 images per colour: 1 = back print mannequin (hero),
2 = shared front crest, 3 = model back.

## 6. Design enhancement pipeline (the print masters)

**`Designs/Enhancements/process_enhancements.py`** converts GPT/design drafts
into print-ready transparent PNG masters in `Designs/Enhancements/Print-Ready/`.
Output: 600 DPI, 12in-wide default (7200px) or a fit-box (e.g. chest emblems
2100×2400 = 3.5×4in). Run `python process_enhancements.py "<Name>.png"` to
process one design without touching others.

**Modes** (per-design in the DESIGNS dict):
- `white` — everything snaps to one spot colour (default white; e.g. ivory
  #F6F1E7). For solid single-colour marks.
- `two-tone` — cream + red spot separation (Legend badge).
- `luminance` — greyscale art → white ink whose alpha follows brightness;
  dark areas become knockout (the black garment supplies shadow).
- `spot-alpha` — source alpha drives coverage, ink snapped to one spot.
- `full-colour` — palette preserved, alpha from source transparency;
  near-neutral brights snap to white, near-blacks to black.
- `fc-knockout` — multi-colour art composited on solid black → black knocked
  out to transparency, palette preserved (most chapter art uses this).
- `ink-on-light` — dark ink on light ground → tonal black ink for light garments.
- `embroidery` — quantize to N thread colours, hard edges (Polo chest logos).

**SOURCE_TWEAKS** pre-fix specific drafts (examples): `solidify_ink` (push
inked pixels to full brightness so spot marks print 100% — the Monogram),
`gate_jpeg_noise` (clamp JPEG mosquito noise before knockout),
`invert_dark_neutrals`, checkerboard removal for drafts with fake baked-in
transparency (Legends v2 — only warm pixels carry ink). **POST_TWEAKS** run at
print resolution: `crisp_edges` (mild unsharp), map annotations (Amarnath,
Jyotirlinga).

**Hard-won lessons:**
- A JPG source with compression mud stays muddy at any DPI — get a clean
  transparent redraw before re-enhancing (Think Outside the Box v2).
- "Transparent-looking" drafts often have the checkerboard baked into RGB
  pixels — detect and dissolve, never trust visually.
- Qikink upload caps: >36MB bounces, 32MB clears; design library says 25MB;
  puff print allows 35MB. Ladder: 600 DPI master → drop to 400–450 DPI
  ("-Qikink" variants) when a file is too heavy.
- Puff print (vinyl, white only): single solid colour, hard edges (no
  anti-aliasing), no interior micro-texture — fill distress grain by
  ENCLOSED-HOLE AREA, never by morphological close (close melts small
  letterforms; hole-area fill preserves exact edges). See
  `Designs/Enhancements/Tools/make_legends_puff.py`.

**Monogram masters:** `Monogram (Ivory).png` (#F6F1E7, dark garments) and
`Monogram (Black).png` (light garments), 2100×2256 @600 DPI (3.5×3.76in),
chest-emblem scale.

## 7. Mockup pipelines

**Covenant: mockups composite the EXACT production master pixels — never a
re-render, never a redraw.** GPT renders are used only as placement
references, never as final mockups.

**Compositor formula (shared across pipelines):** overlay master onto blank;
visible alpha = source_alpha^vis_gamma with vis_gamma 0.22; anime script also
applies colour_gamma 0.72 + saturation 1.3 (owner-approved "Qikink vibrancy" —
conservative settings were rejected as too dull).

- **Anime**: `Designs/Anime/Tools/create_anime_mockups.py` — placement locked
  at B2: mannequin (564,745), model (583,779).
- **Shirts**: `Designs/Shirts/Tools/create_shirt_mockups.py` — SPECS:
  mannequin centre (634,748) max (22,24); male model (620,459) max (22,24);
  pastel mannequins same spec with Black master; female models (676,466)
  max (22,24) with Black master. Blanks live in `Designs/Shirts/`
  (Black/Maroon/Navy Blue × mannequin+model, pastels × mannequin+female model).

**Placement calibration method (proven, use it for anything new):** never
eyeball, never trust whole-garment bbox mapping across different fits.
Anchor to garment landmarks (placket line, top button, button gap, sleeve
seam), transfer fractions from an approved reference, then give the owner a
labelled grid/size-strip sheet (cells A1–C3 / S1–S4) and let them pick.
Owner picks are law: "B2 it is" ends the discussion.

## 8. Reels (Instagram)

Both reels are built frame-by-frame in Python (PIL/numpy) piped to ffmpeg —
full motion control, no canned filters. 1080×1920 @30fps, H.264 CRF 19,
silent (audio added in the IG app).

- **Anime**: `Designs/Anime/Tools/build_reel.py` — owner's cards + 9 tees in
  saga order. Gotcha: never feed a looped still into zoompan (duration
  explodes); single-frame inputs, zoompan generates the clip.
- **Shirts**: `Designs/Shirts/Tools/build_shirts_reel.py` (v2, the good one) —
  structure: rapid montage of 6 existing products (hard cuts, alternating
  punch-ins, 0.43s each) → stamp card "T-SHIRTS. / CAPS. / READY FOR WHAT'S
  NEXT?" → six shirts full-bleed with varied transitions (fade/slides/
  circle-open) → closing "OVERSIZED SHIRTS / NOW LIVE" + six colour dots
  (sampled from actual garment pixels) + globe/Instagram icons drawn in code.
  Cards sit on a warm ombre (near-black → coffee-gold) with a centre glow.
  Owner feedback history: no static pasted text (animate line by line), 
  full-bleed images (no letterboxing), generous read-time holds.

## 9. Business folder

- `inventory-ledger.xlsx` — stock ledger.
- `pricing-calculator.xlsx` — cost/margin maths.
- `out-of-stock.xlsx` — variant sellouts; sync target for
  variantAvailability.ts (full replacement semantics).
- `brand-copy.md` — locked brand card + tiered one-liner bank.

## 10. Working with the owner (conventions that matter)

- Short messages, fast iterations. Show visual QC (contact sheets, labelled
  grids, preview crops) and let them pick from labelled options.
- They verify on Qikink's own mockups before locking anything print-related.
- Locked decisions stay locked (saga order, story lines, brand card,
  placements) — don't relitigate.
- Always give file paths for anything they need to look at.
- Verify plainly: hash-check files when duplicates are suspected (it has
  caught real mistakes twice: swapped model blanks, navy-duplicated black).
- Clean up temporary QC/preview files after approval.

## 11. Loose ends at handover (Sept 2026)

- Stock SQL for anime ids 30–38 (insert into product_stock) was handed to
  the owner; execution never confirmed — verify rows exist before the next
  anime stock question.
- Multitronics polo embroidery preview was sent for approval; never confirmed.
- JBG design source is low-res (301×359) — flagged, only chest-scale safe.
- The anime reel concept discussion (opening options 1–5) was superseded by
  the owner supplying their own cards; reel v1 shipped.
