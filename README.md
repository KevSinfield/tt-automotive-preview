# TT Automotive — homepage redesign preview

A static, single-page homepage demo for TT Automotive (Loughborough). It is **not the live site** and does not change https://ttauto.co.uk/ in any way.

- Public URL: https://kevsinfield.github.io/tt-automotive-preview/
- `noindex, nofollow` meta tag plus `robots.txt` (`Disallow: /`). A "Website redesign preview" strip sits at the top of the page.
- No sign-in, forms, search, pricing, stock checks, retail-shop link or photo upload. Every link that leaves the homepage goes to an existing TT page, which was checked on 12 Nov 2026 (all returned HTTP 200).

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

## Local preview

```bash
python3 -m http.server 8768 --directory ~/Dev/tt-automotive-preview
```
