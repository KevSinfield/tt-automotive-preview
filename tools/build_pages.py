#!/usr/bin/env python3
"""Build the "not built yet" placeholder pages for the TT Automotive preview.

- Rewrites links in index.html from https://ttauto.co.uk/<slug>/ to the preview's own <slug>/.
- Writes <slug>/index.html for every page in PAGES, reusing index.html's header, footer
  and WhatsApp explainer so every page looks and behaves the same.

Run from anywhere:  python3 tools/build_pages.py
Kept deliberately external: Trade login (TT's portal) and the ttauto.co.uk link in the preview notice.
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"

# slug: (page title, section for the breadcrumb, short intro in TT's own words or None)
PAGES = {
    "service": ("Our services", "Services", "A one-stop shop for new, remanufactured and repaired diesel pumps and injectors."),
    "comprehensive-diesel-engine-repair-service": ("Repair", "Services", "High quality repair using OE parts and equipment."),
    "quality-matched-remanufacturing-service": ("Remanufacturing", "Services", "Parts returned to OE specification with next day delivery."),
    "next-day-uk-delivery": ("Distribution", "Services", "A fast, efficient distribution network with next day UK delivery."),
    "diesel-vehicle-workshop": ("Diesel vehicle workshop", "Services", "Our specialist diesel vehicle workshop."),
    "dpf-cleaning": ("DPF cleaning", "Services", "Diesel particulate filter cleaning for a fraction of the cost of a replacement."),
    "products": ("Products", "Products", "High quality automotive parts."),
    "diesel-injectors": ("Diesel injectors", "Products", "Electronic and common rail diesel injectors."),
    "diesel-pumps": ("Diesel pumps", "Products", "New, remanufactured and repaired diesel pumps."),
    "consumables-catalogue": ("Consumables catalogue", "Products", "From washers to seal kits, a wide range of fast-moving consumable parts in stock."),
    "hc-cargo": ("HC Cargo", "Products", None),
    "about-us": ("About us", "About", "The UK’s largest independent diesel engine specialist."),
    "how-to-use-the-trade-website": ("How to use the trade website", "About", None),
    "contact": ("Contact us", "Contact", "Get in touch by phone or email."),
    "terms-conditions": ("Terms & Conditions", "Legal", None),
}

# Pages that always link to TT's real site (working functions, not pages to redesign).
EXTERNAL = {
    "apply-for-a-trade-credit-account": "https://ttauto.co.uk/apply-for-a-trade-credit-account/",
    "surcharge-returns-and-warranty": "https://ttauto.co.uk/surcharge-returns-and-warranty/",
}

# Built pages: tools/content/<slug>.html holds the page's <main> (paths written for one folder down).
CONTENT = ROOT / "tools" / "content"

ARROW ='<svg class="arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
PHONE = '<svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>'
MAIL = '<svg class="i i-line" aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>'
WA = '<svg class="wa-icon" aria-hidden="true" viewBox="0 0 24 24"><use href="#wa-glyph"/></svg>'


def rewrite_index():
    s = INDEX.read_text(encoding="utf-8")
    n = 0
    for slug in PAGES:
        s, k = re.subn(r'href="https://ttauto\.co\.uk/%s/"' % re.escape(slug), 'href="%s/"' % slug, s)
        n += k
    for slug, url in EXTERNAL.items():
        s, k = re.subn(r'href="%s/"' % re.escape(slug), 'href="%s"' % url, s)
        n += k
    INDEX.write_text(s, encoding="utf-8")
    return s, n


def to_subdir(fragment):
    """Make root-relative links in a copied fragment work one folder down."""
    fragment = re.sub(r'(href|src)="assets/', r'\1="../assets/', fragment)
    fragment = fragment.replace('href="./"', 'href="../"')
    for slug in PAGES:
        fragment = fragment.replace('href="%s/"' % slug, 'href="../%s/"' % slug)
    return fragment


def mark_current(fragment, slug):
    return fragment.replace('href="../%s/"' % slug, 'href="../%s/" aria-current="page"' % slug)


def build():
    s, n = rewrite_index()
    head = s[: s.index("<title>")]
    styles = s[s.index('<link rel="icon"'): s.index("</head>")]
    top = s[s.index("<body>"): s.index('<main id="main"')]
    bottom = s[s.index("</main>") + len("</main>"):]

    for slug, (title, section, intro) in PAGES.items():
        t = html.escape(title)
        lede = '<p class="lede">%s</p>' % html.escape(intro) if intro else ""
        main = f'''<main id="main" tabindex="-1">
  <section class="stub-hero" aria-labelledby="page-title">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="../">Home</a></li><li>{html.escape(section)}</li><li aria-current="page">{t}</li></ol></nav>
      <h1 id="page-title">{t}</h1>
      {lede}
    </div>
  </section>

  <section class="stub" aria-labelledby="stub-title">
    <div class="wrap">
      <div class="stub-card">
        <p class="stub-badge">Coming soon</p>
        <h2 id="stub-title">This page hasn’t been built yet</h2>
        <p>You’re looking at a demo of the new TT Automotive website. The homepage is ready to explore. This page is part of the next stage and will be designed once the homepage is signed off.</p>
        <a class="btn btn-primary" href="../">Back to the homepage{ARROW}</a>
      </div>

      <div class="stub-help">
        <h2>Need something in the meantime?</h2>
        <ul class="stub-contact">
          <li><a href="tel:+441509633300">{PHONE}01509 633300</a></li>
          <li><a href="mailto:info@ttauto.co.uk">{MAIL}info@ttauto.co.uk</a></li>
          <li><button type="button" class="stub-wa" data-wa-open aria-haspopup="dialog">{WA}WhatsApp (coming soon)</button></li>
        </ul>
        <p class="stub-hours">Monday – Friday 8:30am – 5:00pm</p>
      </div>
    </div>
  </section>
</main>'''
        built = CONTENT / f"{slug}.html"
        if built.exists():
            main = built.read_text(encoding="utf-8").strip()
        page = (
            head
            + f"<title>{t} – TT Automotive (redesign preview)</title>\n"
            + to_subdir(styles)
            + "</head>\n"
            + mark_current(to_subdir(top), slug)
            + main
            + mark_current(to_subdir(bottom), slug)
        )
        out = ROOT / slug / "index.html"
        out.parent.mkdir(exist_ok=True)
        out.write_text(page, encoding="utf-8")
    built = sorted(p.stem for p in CONTENT.glob("*.html")) if CONTENT.exists() else []
    print(f"rewrote {n} links in index.html; wrote {len(PAGES)} pages (built: {', '.join(built) or 'none'}; rest Coming soon)")


if __name__ == "__main__":
    build()
