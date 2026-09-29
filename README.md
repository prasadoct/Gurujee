# Ramakant Guruji — sample personal booking site

A pitch prototype for **Gurujee**: a platform that gives each priest their own booking website.
This is one complete example, built for Ramakant Kulkarni ("Ramakant Guruji"), Pune.

**Open `index.html` in any browser.** No build step, no backend.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure: hero, about, ceremonies, gallery, reviews, service area, FAQ, contact, booking dialog |
| `css/styles.css` | All styling, mobile-first |
| `js/i18n.js` | All interface text in Marathi (default) and English |
| `js/data.js` | **All editable content**: contact number, ceremonies (duration, dakshina options, online availability, details in both languages), areas, gallery |
| `js/art.js` | Placeholder illustrations (inline SVG still-lifes; no photos of people, no deity imagery) |
| `js/app.js` | Ceremony filter, booking flow, calendar, validation, confirmation, .ics export |

## Languages

Marathi by default, with a मराठी / English switch in the header (remembered per visitor).
Share `index.html?lang=en` to open in English.

## Booking flow

Ceremony → details (duration, dakshina options, what Guruji brings / family arranges, preparation) →
at home or online · dakshina option · date & approximate time (or "suggest the muhurat") →
contact & address (or city + video platform for online) → review & pay 50% advance (UPI / card / net banking) →
confirmation with reference, payment receipt, "Add to calendar" and "Send on WhatsApp".

- Deep links: `#book`, `#book/vastu-shanti`, `#book-online`.

- Front-end only: availability and payment are simulated and nothing is sent anywhere.
- Phone back button closes the booking sheet; Esc too. The calendar supports arrow keys, Home/End, PageUp/PageDown.

## Before sharing publicly

- Replace the placeholder phone / WhatsApp number in `js/data.js` (`CONFIG`).
- Add Guruji's portrait as `assets/ramakant-guruji.jpg` — it appears automatically in About and the hero.
- Connect a real payment gateway (the advance step is a mock).
- Swap the illustrations for real ceremony photos (with families' permission).
- Testimonials and gallery captions are illustrative sample content.

Fonts: Tiro Devanagari Marathi (headings) and Mukta (body) via Google Fonts. Both support Latin and Devanagari.
