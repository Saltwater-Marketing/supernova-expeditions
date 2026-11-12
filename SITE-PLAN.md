# Supernova Expeditions Site Plan
Business type: Tour operator (multi day expedition yacht charters)
Domain: supernovaexpeditions.com · Phone: 360-800-3523 · Email: paul@supernovaexpeditions.com
Booking: built in calendar + Netlify Forms request (no third party booking tool) · GA4: G-01R3VFS37W (carried over)

## Open items for Paul
1. Mountain bike pricing: current site lists $900 per person per night, a $2,000 per person preview rate, and about $5,000 per person for future trips. Which goes on the site, and what are the 2027 dates?
2. Boat length: site says 75', 78' and "about 80'". We used 78'. Confirm.
3. Scuba details: minimum certification / drysuit experience, and whether guests bring their own gear or rentals are available.
4. Departure dock: which marina or dock in Anacortes, and parking.
5. Captain Paul's last name (for bio and schema), and any Google or TripAdvisor reviews we can show.

## Decisions to confirm with Andre'
- Dinner cruises dropped per client; /dinner-cruises 301s to /private-charters/.
- Corporate retreats, culinary voyages, dry boat charters and skipper coaching folded into Private Charters as "ways to charter" (they're not in Paul's list of 3 trips, but they have live pricing). Remove if he wants them gone.
- No reviews section yet (none on current site).
- Calendar is updated by editing one data file. If Paul wants to edit it himself, add a simple editor login (Decap CMS or similar) before launch.

## Menu
Expeditions (Scuba Diving / Private Charters / Mountain Biking) · The Boat · Calendar · Pricing · About · Contact · [Request Dates]
Footer: Gallery, FAQ, Privacy Policy, newsletter signup.

## Pages and URLs
| URL | Was | Hero photo |
|---|---|---|
| / | / | supernova-at-anchor |
| /expeditions/ | new | kayak-river-mouth |
| /scuba-diving-expeditions/ | new (from home copy) | pnw-scuba-reef |
| /private-charters/ | new (home + /dinner-cruises) | beach-landing-paddleboards |
| /mountain-bike-expeditions/ | /ride-the-islands + /5-day-bike-itinerary | mountain-bike-ridge |
| /the-boat/ | /the-boat | supernova-at-anchor |
| /about-us/ | /about-us | captain-paul |
| /calendar/ | /calendar + /san-juan-charter-inquiry | none |
| /pricing/ | /pricing | none |
| /gallery/ | /gallery | none |
| /contact/ | /contact | none |
| /faq/ | new | none |
| /subscribe/ | /subscribe | none |
| /privacy-policy/ | /privacy-policy | none |

## Photo notes
- 26 photos pulled from the current site and converted to WebP. Final photos to come from Paul's OneDrive folder.
- Gaps: no real underwater photo confirmed as Paul's own (pnw-scuba-reef and humpback-whale-tail may be stock; confirm before launch). Need mountain biking photos from the trips, more scuba photos and a landing craft photo with divers/bikes loaded.
- Two GoDaddy stock (Getty) images were not copied.

## Rule conflicts in carried over copy
- Approved copy uses "Captain Paul" (first name only) throughout.
- Bike itinerary copy is long; tightened into a 5 day timeline but kept Paul's wording where possible.

## Nov 12 update to SWM standards
- Banners: a clean full-width photo with nothing printed on it (the boat is the product), then a white band with the H1 and one jump button; distance line and subtitle under that. Every page has a photo banner. Client feedback Nov 12: never cover the boat with words.
- One booking label ("Request Dates"), one button per section, phone as a text link. Header Book button visible on phones; floating mobile buttons removed.
- White header with the logo at 80px (desktop) / 72px (phones); Gallery added to the menu.
- Footer: no heading tags, Facebook as an icon, "Website by Saltwater Marketing" credit.
- Gallery sorted by activity with tap to enlarge. FAQ schema on trip pages and the FAQ page; BreadcrumbList on trip pages.
- Self-hosted fonts, inlined CSS, resized images, delayed tracking loader. Robots allow AI crawlers.
- Home has a guest reviews placeholder until Paul has Google reviews to show.
