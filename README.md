# TT Automotive — homepage redesign preview

A static, single-page homepage demo for TT Automotive (Loughborough). It is **not the live site** and does not change https://ttauto.co.uk/ in any way.

- Public URL: https://kevsinfield.github.io/tt-automotive-preview/
- `noindex, nofollow` meta tag plus `robots.txt` (`Disallow: /`). A "Website redesign preview" strip sits at the top of the page.
- No sign-in, forms, search, pricing, stock checks, retail-shop link or photo upload.
- **Built pages:** the homepage and **Diesel injectors** (`/diesel-injectors/`). The injectors page follows the extended mockup, and its content is recorded under *Diesel injectors: content handover* below. Its main content lives in `tools/content/diesel-injectors.html`, and the generator wraps it in the shared header and footer.
- **Everything else is a placeholder.** Every other page TT has (14 more) has a *Coming soon* placeholder in the preview at the same path as on ttauto.co.uk, e.g. `/diesel-injectors/`. So links stay inside the demo, and each placeholder can be replaced by the real page later. Each placeholder has the page title, TT's own one-line intro where there is one, a "This page hasn't been built yet" note, a link back to the homepage, and the phone, email and WhatsApp (coming soon) options.
- **Links that still leave the preview, on purpose:** *Trade login* goes to TT's existing portal (`ttal.originsoftware.co.uk`), *Apply for a trade account* goes to TT's real application form, *Surcharge, returns and warranty* goes to TT's real page, and the preview notice links to ttauto.co.uk. Both trade routes are working functions that would stay the same on a rebuilt site. All TT destinations were checked on 12 Nov 2026 and returned HTTP 200.
- **Rebuild placeholders:** after changing the header, footer or WhatsApp explainer in `index.html`, run `python3 tools/build_pages.py`. It copies them into every placeholder page. Edit the `PAGES` list in that script to add, rename or drop pages, and add `tools/content/<slug>.html` to turn a placeholder into a built page. `EXTERNAL` lists pages that always link to TT's real site.

## Sources (checked against ttauto.co.uk, 12 Nov 2026)

| Item | Value | Source |
|---|---|---|
| Logo | `assets/brand/tt-automotive-logo.png`, a byte-identical copy of `wp-content/uploads/2021/12/logo.png` (500 × 186, transparent PNG, includes the "The Diesel People" tagline) | Site header |
| Phone | 01509 633300 | /contact/ |
| Email | info@ttauto.co.uk | /contact/ (the homepage product box uses sales@ttauto.co.uk) |
| Hours | 8.30am – 5.00pm, Monday to Friday | /contact/ and site banner |
| Address | Unit 6, Royal Way, Off Belton Road, Loughborough, Leicestershire LE11 5XR | /contact/ |
| Company reg. | 1153016 | /contact/ |
| Trade login | https://ttal.originsoftware.co.uk/user/login (TT's existing portal; nothing behind it was opened or tested) | Homepage header button |
| Apply for a trade account | /apply-for-a-trade-credit-account/ | Homepage header button |
| Manufacturer associations | Bosch, Delphi, Denso, Stanadyne, VDO, Zexel, HC Cargo, using TT's own logo files | Homepage "Associations" strip |

## Imagery

- **Illustrative** (cropped from the approved mockup and captioned as illustrative on the page): the hero injector, the three service-route photos, the workshop test bench and the three product images in `assets/img/`. They come from a 798 px mockup, so they look soft on large and high-density screens. Replace them with real TT photos, or with 2000 px+ versions, before launch.
- **TT's own:** the logo, the association logos and `assets/img/tt-loughborough-premises.jpg` (the building photo from /about-us/, saved for later use and not on the page yet). TT's other product photos on the live site are 124 px thumbnails, which are too small to use here.

## Differences from the mockup

- The logo is TT's real file, so it includes the "The Diesel People" tagline. The mockup's redrawn version leaves it out. In the navy footer the logo sits on a white panel, because the burgundy and purple artwork doesn't show up on navy.
- The associations strip uses TT's real colour logos and adds **HC Cargo**, which appears in TT's own strip. The mockup shows six monochrome wordmarks.
- The mockup's typo "Dissel pumps" is corrected to "Diesel pumps".
- The workshop feature uses TT's own wording ("We repair thousands of components every year…"). It links to the Repair and Remanufacturing pages instead of "Inside our workshop", because there is no workshop-tour page.
- The trade section copy is adapted from TT's application page, not the mockup's "Access our trade customer area…", so that the single action is clear.
- The footer has no **Privacy Policy** link, because ttauto.co.uk has no privacy page (/privacy-policy/ returns 404 and none is in the sitemap). "Website by …" is replaced with "Website redesign preview".

## Diesel injectors: content handover

Source: https://ttauto.co.uk/diesel-injectors/, checked 12 Nov 2026. Layout from the extended mockup.

**Retained (on the page, in TT's words or close to them)**
- **Headings:** "Diesel injectors" and "Electronic and common rail diesel injectors".
- **What TT offers:** new, remanufactured and repaired injectors.
- **New:** TT can supply a new part for whatever type of injector the vehicle needs, electronic or common rail.
- **Remanufactured:** brought back to its original specification, cost-effective and "as good as new". A great option when a quick turnaround and long-term reliability are the priorities.
- **Repaired:** might be the right choice if cost is a stronger consideration and the customer is prepared to wait a few days.
- **Injector examples:** all six captions in TT's order (Bosch common rail injector, Bosch diesel injectors, Common rail injectors, Diesel fuel injectors, Bosch EUI, Delphi EUI). They are shown as examples, with no stock or price wording.
- **Brand names:** Bosch, Delphi, Denso, Stanadyne, Siemens VDO and Zexel, as a plain "Manufacturer relationships" strip with no claims attached.

**Condensed**
- **Remanufacturing paragraph:** shortened to the two points above. "Demands a high level of investment in technology and training" is dropped, and TT's "assured long term reliability" becomes "long-term reliability".
- **Brand paragraphs:** the six per-brand paragraphs are reduced to the names strip.

**Held for TT to confirm (not on the preview page)**
- **Next-day delivery:** "delivered next day" (remanufactured injectors).
- **Warranty:** "complete with a comprehensive 12 month warranty".
- **Bosch centre count:** the injectors page says "one of just 32 Authorised Bosch Diesel Centres", but the About Us page says "one of just 28". TT needs to confirm the current figure.
- **Approval claims:** "All the OE manufacturers have approved our services…", "All our diesel injector repairs are authorised by the OE manufacturer", and "approved and authorised by the world's leading OE manufacturers…".
- **Vehicle-make list:** Toyota, Mercedes, VW and the rest. On the injectors page this sentence says TT is "fully authorised to supply diesel **pumps**", which looks like a copy error.
- **Brand-specific statements for TT to review before any are published:**
  - **Bosch:** "can supply and repair the full range of Bosch Diesel injectors".
  - **Delphi:** "authorised to repair their complete range of diesel injectors".
  - **Denso:** "making diesel injectors since 1957", plus "fully authorised".
  - **Stanadyne:** "an authorised repair centre for their complete range of diesel injectors".
  - **Siemens VDO:** "authorised repair centres – such as TT".
  - **Zexel:** "authorised to repair the full range of Zexel diesel **pumps**". This one is about pumps, so it is not presented as an injector claim.
  - **Naming:** the brand appears as "Siemens VDO" here but "VDO" in the homepage logo strip. TT should confirm which they want.
- **Trade site / retail site sentence:** not used. The retail destination isn't verified and the brief excludes a retail link.

**Images**
- **Example photos (illustrative, at Kev's request):** the gallery uses the six AI-generated images cropped from the extended mockup, because TT's own photos are only 124 px and looked poor. The gallery carries an "Illustrative images" label, and each image's alt text describes it generically, e.g. "Illustrative image of an electronic unit injector", rather than naming a brand. **Before launch** the branded captions (Bosch, Delphi) must sit on TT's real photos of those parts, not generated pictures.
- **TT's originals kept for reference:** in `assets/img/injectors/`, byte-identical to the live site and matched to their captions. Ask TT for larger versions.
- **Hero and test bench:** illustrative crops from the mockup, captioned "Illustrative photography". TT's site has no usable workshop photo. The test-bench image on TT's homepage is a used Bosch test bench advertised for sale, not TT's workshop.

**Links**
- **Inside the demo:** Speak to our team / Contact our team, Diesel pumps and Repair services open the demo's Coming soon pages, as you chose earlier. Each can switch to TT's live page with one line in `tools/build_pages.py`.
- **TT's real pages:** Trade login, Apply for a trade account, and Surcharge, returns and warranty. Surcharge was switched to TT's real page for this update. It is in the shared header and footer, so it also changed in the homepage's About menu and footer.

## WhatsApp add-on (demo only)

WhatsApp is shown as a planned add-on, not a working feature. TT's site lists no WhatsApp or mobile number, so the preview has no `wa.me` link and no number.

- **Where it appears:** "Send a photo on WhatsApp" in the *Need help finding a part?* card, "WhatsApp us" in the contact section, "WhatsApp (coming soon)" in the footer, and a sticky green button on phones only.
- **What it does here:** each button opens a "Coming soon" explainer. It has three steps (tap, send a photo of the part or label, the team replies in opening hours with an automatic reply out of hours), an *illustrative* example chat, and a "Demo only" note pointing to the phone and email.
- **To make it live:** confirm the number (WhatsApp Business can run on the 01509 landline), replace each `data-wa-open` button with `<a href="https://wa.me/44XXXXXXXXXX?text=...">`, and delete the `#wa-dialog` dialog and its script block in `assets/site.js`. Decide who monitors it and set the out-of-hours auto-reply first.
- The WhatsApp icon is a simple glyph drawn for this preview. Swap in the official WhatsApp brand asset for production.

## Local preview

```bash
python3 -m http.server 8768 --directory ~/Dev/tt-automotive-preview
```
