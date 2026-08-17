/**
 * about_responsive.js
 * ─────────────────────────────────────────────────────────────
 * Patches index.html — injects responsive media queries for the
 * About Section ONLY. Desktop view is completely untouched.
 *
 * What this does:
 *  • Adds CSS classes to the 3 horizontal-scroll grid wrappers
 *    inside renderAboutSection() in script.js
 *      - Stats grid       → class="about-stats-grid"
 *      - Offer cards grid → class="about-offer-grid"
 *      - Leadership grid  → class="about-team-grid"
 *  • Mission/Vision grid  → class="about-mv-grid"  (stack on mobile)
 *  • Our Portals grid     → class="about-portals-grid" (stack on mobile)
 *  • Injects a <style> block into index.html <head> with all
 *    media queries covering ≤900px (tablet) and ≤600px (mobile)
 *
 * Run:  node about_responsive.js
 * ─────────────────────────────────────────────────────────────
 */

const fs = require('fs');

// ── 1. PATCH script.js — add classes to grid divs ────────────

let js = fs.readFileSync('script.js', 'utf8');

// ── Stats grid (5 stat cards) ─────────────────────────────────
// Original: <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px;margin-bottom:72px;">
js = js.replace(
  `<div style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px;margin-bottom:72px;\\">`,
  `<div class=\\"about-stats-grid\\" style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px;margin-bottom:72px;\\">`
);

// ── Mission / Vision grid (1fr 1fr) ───────────────────────────
// Original: <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:72px;">
js = js.replace(
  `<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:72px;\\">`,
  `<div class=\\"about-mv-grid\\" style=\\"display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:72px;\\">`
);

// ── What We Offer grid (6 cards, minmax 260px) ────────────────
// Original: <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;">
js = js.replace(
  `<div style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;\\">`,
  `<div class=\\"about-offer-grid\\" style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;\\">`
);

// ── Our Portals inner grid (1fr 1fr, max-width:700px) ─────────
// Original: <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;margin:0 auto;">
js = js.replace(
  `<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;margin:0 auto;\\">`,
  `<div class=\\"about-portals-grid\\" style=\\"display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;margin:0 auto;\\">`
);

// ── Leadership grid (4 cards, minmax 220px) ───────────────────
// Original: <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;">
js = js.replace(
  `<div style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;\\">`,
  `<div class=\\"about-team-grid\\" style=\\"display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;\\">`
);

fs.writeFileSync('script.js', js, 'utf8');
console.log('✅ script.js — classes injected into about grids');

// ── 2. PATCH index.html — inject <style> into <head> ─────────

let html = fs.readFileSync('index.html', 'utf8');

const styleBlock = `
<!-- ===== ABOUT SECTION RESPONSIVE STYLES (auto-injected) ===== -->
<style>
  /* ─────────────────────────────────────────────────────────────
     ABOUT SECTION — RESPONSIVE MEDIA QUERIES
     Desktop (> 900px): completely untouched, no rules apply.
     Tablet  (≤ 900px): Mission/Vision stacks, Portals stays 2col,
                        scroll grids shrink to fixed card widths.
     Mobile  (≤ 600px): Horizontal scroll for Stats, Offer, Team.
                        Mission/Vision stacks. Portals stacks.
  ───────────────────────────────────────────────────────────── */

  /* ── TABLET: ≤ 900px ───────────────────────────────────────── */
  @media (max-width: 900px) {

    /* Mission / Vision: stack to single column */
    .about-mv-grid {
      grid-template-columns: 1fr !important;
    }

    /* Stats: show 3 per row on tablet */
    .about-stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }

    /* Offer cards: 2 per row on tablet */
    .about-offer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Leadership: 2 per row on tablet */
    .about-team-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Portals: stays 2 col on tablet — no change needed */
  }

  /* ── MOBILE: ≤ 600px ───────────────────────────────────────── */
  @media (max-width: 600px) {

    /* About container: tighten padding on mobile */
    .about-seed-container > div {
      padding: 48px 16px !important;
    }

    /* Hero heading: smaller on mobile */
    .about-seed-container h1 {
      font-size: clamp(28px, 8vw, 40px) !important;
    }

    /* ── Mission / Vision: stack ──────────────────────────────── */
    .about-mv-grid {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }

    /* ── Our Portals: stack on mobile ────────────────────────── */
    .about-portals-grid {
      grid-template-columns: 1fr !important;
      max-width: 100% !important;
    }

    /* ── STATS — Horizontal scroll strip ─────────────────────── */
    .about-stats-grid {
      display: flex !important;
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      gap: 16px !important;
      padding-bottom: 16px !important;
      margin-bottom: 48px !important;
      /* hide scrollbar visually but keep functional */
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      -webkit-overflow-scrolling: touch;
    }
    .about-stats-grid::-webkit-scrollbar {
      display: none;
    }
    /* Each stat card: fixed width so they don't shrink */
    .about-stats-grid > div {
      flex: 0 0 160px !important;
      min-width: 160px !important;
      padding: 22px 16px !important;
    }

    /* ── WHAT WE OFFER — Horizontal scroll strip ──────────────── */
    .about-offer-grid {
      display: flex !important;
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      gap: 16px !important;
      padding-bottom: 16px !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      -webkit-overflow-scrolling: touch;
    }
    .about-offer-grid::-webkit-scrollbar {
      display: none;
    }
    /* Each offer card: fixed width */
    .about-offer-grid > div {
      flex: 0 0 220px !important;
      min-width: 220px !important;
    }

    /* ── LEADERSHIP TEAM — Horizontal scroll strip ────────────── */
    .about-team-grid {
      display: flex !important;
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      gap: 16px !important;
      padding-bottom: 16px !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      -webkit-overflow-scrolling: touch;
    }
    .about-team-grid::-webkit-scrollbar {
      display: none;
    }
    /* Each team card: fixed width */
    .about-team-grid > div {
      flex: 0 0 190px !important;
      min-width: 190px !important;
    }

    /* ── Section headings: shrink slightly ────────────────────── */
    .about-seed-container h2 {
      font-size: 26px !important;
    }

    /* ── Contact CTA: tighten padding ─────────────────────────── */
    .about-seed-container > div > div:last-child {
      padding: 36px 20px !important;
    }
  }
</style>
<!-- ===== /ABOUT SECTION RESPONSIVE STYLES ===== -->
</head>`;

// Only inject once
if (!html.includes('ABOUT SECTION RESPONSIVE STYLES')) {
  html = html.replace('</head>', styleBlock);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('✅ index.html — responsive <style> block injected into <head>');
} else {
  console.log('ℹ️  index.html — style block already exists, skipping.');
}

console.log('\n🎉 Done! About section is now responsive across all portals.');
console.log('   Desktop (> 900px) : unchanged ✅');
console.log('   Tablet  (≤ 900px) : Mission/Vision stacks, grids adjust');
console.log('   Mobile  (≤ 600px) : Stats / Offer / Leadership → horizontal scroll');
console.log('                       Mission/Vision / Portals  → stacked columns');
