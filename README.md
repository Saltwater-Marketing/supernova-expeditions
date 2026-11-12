# Supernova Expeditions website

Static site built with Eleventy, hosted on Netlify. Managed by Saltwater Marketing.

## Updating the trip calendar
Edit `src/_data/trips.json`. One entry per scheduled trip:

```json
{ "title": "San Juan Islands Scuba Expedition", "type": "scuba", "start": "2027-06-07", "end": "2027-06-11",
  "status": "open", "spots": "3 staterooms", "price": "From $1,700 per stateroom per night" }
```

- `type`: `scuba`, `private` or `bike`
- `status`: `open` (taking bookings), `limited` (few spots left), `booked` (full or private)
- Dates are YYYY-MM-DD. Past trips drop off the list automatically.
- **Delete every entry with `"sample": true` before launch.**

Dates with no trip show as "available to request." Clicking any open date fills in the booking request form.

## Forms (Netlify Forms)
- `date-request`: calendar booking requests
- `contact`: contact page
- `newsletter`: popup, footer band and /subscribe/ (field `source` shows which one)

After the first deploy: Netlify > Forms > enable form detection, then Forms > Notifications > add an email notification to paul@supernovaexpeditions.com for each form. Export newsletter signups as CSV, or swap the form action to GHL/Mailchimp later.

## Other editable bits
- Phone, email, address, nav, social links (shown as icons), GA4 and GTM IDs: `src/_data/site.json`
- Gallery sections and photos: `src/_data/gallery.json`
- Page banners: the `hero:` block at the top of each page (photo, H1, one jump button, the line and subtitle under the banner)
- FAQ page (and its schema): `src/_data/faq.json`
- Pages: `src/*.njk` · Styles: `src/assets/css/site.css` · Photos: `src/images/` (WebP)

## Tracking
Set `"gtm"` in `src/_data/site.json` to the client's GTM container ID. The site then loads only GTM (delayed until first scroll/tap or 4 seconds) and GA4 must be set up inside GTM. Until then, GA4 loads directly with the same delay.

## Photos
Pages use resized copies in `src/images/w/` (480/800/1200/1600 wide) listed in `src/_data/imgmeta.json`. A new photo needs those copies and an entry; ask Claude to add it.

## Build
`npm install` then `npm run build` (outputs `_site`). `npm start` for a local preview.
Old GoDaddy URLs are redirected in `netlify.toml`.
