# Ramakant Guruji — sample personal booking site

A pitch prototype for **Gurujee**: a platform that gives each priest their own booking website.
This is one complete example, built for Ramakant Kulkarni ("Ramakant Guruji"), Pune.

**Open `index.html` in any browser.** No build step, no backend.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure: hero, about, ceremonies, gallery, reviews, service area, FAQ, contact, booking dialog |
| `css/styles.css` | All styling, mobile-first |
| `js/data.js` | **All editable content**: contact number, rituals (details, dakshina, preparation), areas, gallery |
| `js/art.js` | Placeholder illustrations (inline SVG still-lifes; no photos of people, no deity imagery) |
| `js/app.js` | Ceremony filter, booking flow, calendar, validation, confirmation, .ics export |

## Booking flow

Ceremony → details (duration, dakshina, what Guruji brings / family arranges, preparation) →
date & approximate time (or "suggest the muhurat") → contact & address → review → confirmation
with reference number, "Add to calendar" and "Send on WhatsApp".

- Front-end only: availability is mocked (deterministic per date) and nothing is sent anywhere.
- Deep links for WhatsApp shares: `index.html#book` or `index.html#book/griha-pravesh`.
- Phone back button closes the booking sheet; Esc too. The calendar supports arrow keys, Home/End, PageUp/PageDown.

## Before sharing publicly

- Replace the placeholder phone / WhatsApp number in `js/data.js` (`CONFIG`).
- Swap the illustrations for real ceremony photos (with families' permission).
- Testimonials and gallery captions are illustrative sample content.

Fonts: Tiro Devanagari Marathi (headings) and Mukta (body) via Google Fonts. Both support Latin and Devanagari.
