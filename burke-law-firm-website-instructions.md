# Burke Law Firm — Claude Code Build Instructions

> **How to use this file:** Open it in VS Code alongside Claude Code. Paste each Phase prompt into Claude Code one at a time. Always wait for Claude Code to confirm completion before moving to the next phase.

---

## Core Directive

**Replicate TorkLaw.com as precisely as possible in HTML/CSS/JS.**

Copy the layout, section order, visual design, spacing, typography scale, component patterns, content structure, and conversion elements exactly as they appear on TorkLaw.com. Use the screenshots in `design-references/` as your pixel-level reference for every section.

All firm-specific content (name, phone, colors, attorney names, case results) uses Burke Law Firm placeholders for now. The client will replace these manually later. Your job is to get the structure, design, and layout right — not the final content.

**Tech stack:** Pure HTML5 + CSS3 + Vanilla JS. No frameworks. No Bootstrap. No Tailwind. No jQuery. Each page is a standalone `.html` file deployable on any static host.

---

## Placeholder Values (use throughout all pages)

| Item | Placeholder |
|---|---|
| Firm name | Burke Law Firm |
| Phone | (617) 555-0100 |
| Email | info@burkelawfirm.com |
| Address | 123 Main Street, Boston, MA 02101 |
| Attorney 1 | [Attorney Name 1] |
| Attorney 2 | [Attorney Name 2] |
| Case result 1 | $X,XXX,XXX — [Case Type] |
| Case result 2 | $XXX,XXX — [Case Type] |
| Google rating | 5.0 ★ (XX reviews) |
| Bar number | MA Bar #XXXXXX |

---

## File Structure

```
burke-law-firm/
│
├── index.html                  ← Homepage (TorkLaw homepage replica)
├── personal-injury.html        ← Personal Injury practice area page
├── oui-defense.html            ← OUI Defense practice area page
├── about.html                  ← About / Attorney profiles page
├── contact.html                ← Contact + consultation form page
│
├── css/
│   └── styles.css              ← All shared styles
│
├── js/
│   └── main.js                 ← All interactivity
│
├── assets/
│   ├── logo.svg                ← Firm logo SVG
│   └── og-image.png            ← Social share preview
│
└── design-references/          ← TorkLaw screenshots (READ BEFORE BUILDING)
```

---

## Phase 0 — Study the Screenshots

**Prompt for Claude Code:**

```
Before writing any code, open and study every image in the `design-references/` folder.

For each screenshot, note and remember:
1. Exact section order on the page (top to bottom)
2. Layout grid used (full-width, two-column, three-column, etc.)
3. Background colors per section (dark, light, white, gradient)
4. Typography: headline sizes, font weights, uppercase vs mixed case labels
5. Button styles: shape, color, size, text, hover states
6. Navigation: structure, logo placement, link arrangement, CTA button position
7. Hero section: left/right column split, form placement, headline style, trust indicators
8. Trust bar / stats bar: layout, number formatting, icon use
9. Card components: shadow, radius, hover effect, icon style
10. Footer: column layout, link grouping, bottom bar

Write a brief summary of what you observed in each screenshot before we start building.
Do NOT write any code yet. Just confirm your observations.
```

---

## Phase 1 — Global CSS (styles.css)

**Prompt for Claude Code:**

```
Study the TorkLaw screenshots in `design-references/` carefully, then create `css/styles.css`.

Extract the following directly from the screenshots:
- The exact background colors used in each section type
- The primary, secondary, and accent colors used for text, buttons, and borders
- Font sizes for H1, H2, H3, body, labels, and small text
- Button shapes, padding, and border-radius
- Card shadow depth and border-radius
- Navbar height and background
- Section vertical padding amounts
- Max content width

Then build styles.css with:

1. CSS RESET
   - box-sizing: border-box on everything
   - margin: 0, padding: 0
   - font smoothing (-webkit-font-smoothing: antialiased)

2. CSS VARIABLES — extracted from TorkLaw screenshots:
   - All colors as --color-[name]
   - All font sizes as --text-[size]
   - Spacing scale: --space-xs through --space-3xl
   - Shadows: --shadow-sm, --shadow-md, --shadow-lg
   - Border radius: --radius-sm, --radius-md, --radius-lg

3. GOOGLE FONTS — match TorkLaw's font pairing as closely as possible from screenshots. Load via Google Fonts link tag.

4. BASE TYPOGRAPHY — html, body, h1–h6, p, a, ul, li base styles

5. SHARED COMPONENTS matching TorkLaw exactly:
   - .btn-primary (main CTA button — match TorkLaw color, size, shape, text style)
   - .btn-secondary (outlined or alternate CTA)
   - .btn-phone (phone number button style from TorkLaw navbar/hero)
   - .section-eyebrow (small uppercase label above section headings)
   - .section-heading (large section title style)
   - .section-subheading (supporting paragraph under section title)
   - .card (match TorkLaw card style exactly: shadow, radius, padding, hover)
   - .form-card (the floating consultation form card from the hero)
   - .badge / .pill (small trust badge elements)
   - .star-rating (gold stars for testimonials/reviews)
   - .divider (horizontal rule style)

6. NAVBAR (.navbar)
   - Match TorkLaw navbar exactly: height, background, logo position, link spacing, CTA button placement
   - .navbar-scrolled state (triggered by JS after 80px scroll)
   - Mobile hamburger button
   - Mobile dropdown menu

7. FOOTER
   - Match TorkLaw footer exactly: background color, column layout, link styles, bottom copyright bar

8. UTILITY CLASSES
   - .container (match TorkLaw max-width and horizontal padding)
   - .text-center, .text-left, .text-right
   - .bg-dark, .bg-light, .bg-white
   - .visually-hidden (for accessibility)

9. ANIMATIONS
   - .animate-on-scroll (opacity: 0, translateY: 20px, transitions to visible)
   - .visible (the triggered state)
   - CSS transitions for hover states on all interactive elements

10. MEDIA QUERIES
    - Mobile-first approach
    - Breakpoints at 768px and 1200px (or whatever TorkLaw uses — check screenshots)
    - All grid layouts collapse to single column on mobile
    - Font sizes reduce on mobile
    - Navbar collapses to hamburger on mobile

Match TorkLaw's visual design as closely as possible. Every color, spacing, and component decision should be based on what you see in the screenshots.
```

---

## Phase 2 — Homepage (index.html)

**Prompt for Claude Code:**

```
Study the TorkLaw homepage screenshots in `design-references/` then create `index.html`.

Replicate every section of the TorkLaw homepage in exact order, top to bottom. For each section:
- Match the layout (columns, grid, full-width)
- Match the background color
- Match the typography scale and weight
- Match the component styles (buttons, cards, badges)
- Match the spacing and visual density

Use Burke Law Firm placeholder content throughout (firm name, phone number, placeholder attorney names, placeholder case results).

Sections to build (in TorkLaw's exact order as seen in screenshots):

### NAVBAR
Replicate TorkLaw navbar exactly:
- Logo placement and style
- Navigation links and their order
- Phone number display style
- "Free Consultation" or equivalent CTA button
- Sticky behavior on scroll
- Mobile hamburger menu

### HERO SECTION
Replicate TorkLaw hero exactly:
- Full viewport height or match TorkLaw's hero height
- Background treatment (dark overlay, gradient, or color — match screenshots)
- Left column content: headline, subheadline, CTA buttons, trust indicators
- Right column: floating consultation form card (match TorkLaw form style exactly)
  - Form fields matching TorkLaw (name, phone, email, case type, description)
  - Submit button style matching TorkLaw
  - Any disclaimer or trust text below form
- Trust signals / social proof elements in hero (match TorkLaw's placement)

### STATS / TRUST BAR
Replicate TorkLaw's stats bar exactly:
- Background color
- Number format (e.g. $500M+, 10,000+)
- Label style
- Layout (horizontal row)
- Use Burke Law Firm placeholder stats

### PRACTICE AREAS SECTION
Replicate TorkLaw practice area cards exactly:
- Section heading and eyebrow label style
- Card layout (grid columns, card style)
- Icon or image style
- Card content structure (title, description, link/button)
- Burke Law Firm practice areas: Personal Injury, OUI/DUI Defense

### WHY CHOOSE US / FIRM DIFFERENTIATORS
Replicate TorkLaw's differentiator section exactly:
- Layout style (icons + text, numbered list, or other format)
- Background
- Content structure

### HOW IT WORKS / PROCESS
Replicate TorkLaw's process section exactly:
- Step numbering style
- Layout (horizontal steps or vertical)
- Background color
- Icon/number treatment

### ATTORNEY / TEAM SECTION
Replicate TorkLaw's attorney section exactly:
- Background
- Photo placeholder style (match TorkLaw's image treatment)
- Name, title, bio layout
- Use placeholder attorney names

### CASE RESULTS / VERDICTS
Replicate TorkLaw's case results section exactly:
- Layout and card style for results
- Number formatting ($X,XXX,XXX)
- Case type label style
- Use placeholder amounts

### TESTIMONIALS / REVIEWS
Replicate TorkLaw's testimonial section exactly:
- Card style and layout
- Star rating display
- Quote formatting
- Client name / case type attribution
- Use placeholder testimonial content

### CTA BAND / CONSULTATION SECTION
Replicate TorkLaw's mid or bottom CTA band exactly:
- Background
- Headline style
- Button layout
- Any supporting text

### FOOTER
Replicate TorkLaw footer exactly:
- Column structure
- Link grouping
- Logo placement
- Contact info layout
- Copyright bar
- Any legal disclaimer text

Link to css/styles.css and js/main.js. All phone numbers as <a href="tel:+16175550100"> links.
```

---

## Phase 3 — Personal Injury Page (personal-injury.html)

**Prompt for Claude Code:**

```
Study the TorkLaw personal injury practice area page screenshots in `design-references/` then create `personal-injury.html`.

Replicate the TorkLaw practice area page layout exactly. If you don't have a specific screenshot for this page, follow the same design system as the homepage and replicate the typical TorkLaw practice area page structure.

Sections (in TorkLaw order):
1. NAVBAR — same as homepage
2. PRACTICE AREA HERO — Dark background, H1 about Massachusetts Personal Injury, subhead, CTA buttons, same hero form as homepage
3. CASE TYPES SECTION — Grid of case type cards matching TorkLaw style:
   Car Accidents, Truck Accidents, Slip & Fall, Wrongful Death, Dog Bites, Motorcycle Accidents, Pedestrian Accidents, Bicycle Accidents
4. WHY HIRE US FOR INJURY CASES — Match TorkLaw's equivalent section
5. CASE RESULTS — Placeholder injury case results in TorkLaw's result card style
6. THE LEGAL PROCESS — Steps specific to personal injury claims (matching TorkLaw step style)
7. FAQ ACCORDION — 6 questions about Massachusetts personal injury law:
   - "How long do I have to file in Massachusetts?" (Answer: 3-year statute of limitations)
   - "What if I was partially at fault?"
   - "How much is my case worth?"
   - "Do I have to go to court?"
   - "How long does it take?"
   - "What does 'no fee unless you win' mean?"
8. TESTIMONIALS — injury-specific placeholder testimonials
9. CTA BAND — same style as homepage
10. FOOTER — same as homepage
```

---

## Phase 4 — OUI Defense Page (oui-defense.html)

**Prompt for Claude Code:**

```
Study TorkLaw screenshots in `design-references/` then create `oui-defense.html`.

Replicate TorkLaw's practice area page structure exactly, adapted for OUI/DUI Defense content.

Sections:
1. NAVBAR — same as homepage
2. HERO — Dark background, urgent H1 about Massachusetts OUI Defense, subhead, CTA + form (same as homepage hero form)
3. CONSEQUENCES SECTION — What's at stake with an OUI conviction (match TorkLaw urgency section style):
   License Suspension, Fines, Possible Jail Time, Ignition Interlock Device, Insurance Rate Increases, Criminal Record
4. DEFENSE STRATEGIES — Cards matching TorkLaw card style:
   Challenging the Traffic Stop, Field Sobriety Test Issues, Breathalyzer Errors, Officer Credibility
5. OFFENSE LEVELS TABLE — Massachusetts OUI penalties table (1st / 2nd / 3rd offense) styled to match TorkLaw's table style if present, otherwise match card style
6. CASE RESULTS — Placeholder OUI case results
7. FAQ ACCORDION — 6 questions:
   - "What is the legal BAC limit in Massachusetts?" (0.08%)
   - "Can I refuse a breathalyzer in Massachusetts?"
   - "Will I lose my license after an OUI?"
   - "Can an OUI charge be dismissed?"
   - "Should I take a plea deal?"
   - "How much does an OUI lawyer cost?"
8. TESTIMONIALS — OUI-specific placeholder testimonials
9. CTA BAND
10. FOOTER
```

---

## Phase 5 — About Page (about.html)

**Prompt for Claude Code:**

```
Study TorkLaw's About page screenshots in `design-references/` then create `about.html`.

Replicate TorkLaw's About page layout exactly.

Sections:
1. NAVBAR
2. PAGE HERO — Match TorkLaw's inner page hero style (shorter than homepage hero): H1 "About Burke Law Firm", subheadline
3. FIRM OVERVIEW — Two-column section matching TorkLaw layout: firm story text left, supporting element right (stat block, quote, or image placeholder)
4. ATTORNEY PROFILES — Match TorkLaw's attorney profile layout exactly:
   - Photo placeholder (match TorkLaw's image style and size)
   - Name and title treatment
   - Bio paragraph
   - Credentials / bar admissions
   - Practice focus
   Two attorneys: [Attorney Name 1] and [Attorney Name 2]
5. FIRM VALUES / APPROACH — Match TorkLaw's values or differentiator section
6. AWARDS / RECOGNITION — Match TorkLaw's badge/award section if present (use placeholder award names)
7. CTA BAND — Same as homepage
8. FOOTER
```

---

## Phase 6 — Contact Page (contact.html)

**Prompt for Claude Code:**

```
Study TorkLaw's contact page screenshots in `design-references/` then create `contact.html`.

Replicate TorkLaw's contact page layout exactly.

Sections:
1. NAVBAR
2. PAGE HERO — Short inner page hero: "Contact Burke Law Firm", free consultation subhead
3. CONTACT LAYOUT — Match TorkLaw's contact page two-column layout:
   LEFT COLUMN:
   - Phone (large, prominent, clickable)
   - Email
   - Office address
   - Office hours
   - Emergency availability note
   - Map embed placeholder div (styled to match TorkLaw's map area)

   RIGHT COLUMN — Full intake form matching TorkLaw's form style:
   - First Name, Last Name
   - Phone Number
   - Email Address
   - Best Time to Call (select)
   - Practice Area (select: Personal Injury / OUI Defense)
   - Case Description (textarea)
   - How Did You Hear About Us (select)
   - Submit button (match TorkLaw style exactly)
   - Trust indicators below form (SSL, confidentiality, no obligation)

4. FAQ — 3–4 consultation FAQs matching TorkLaw FAQ style
5. FOOTER
```

---

## Phase 7 — JavaScript (js/main.js)

**Prompt for Claude Code:**

```
Create `js/main.js` for the Burke Law Firm website. Implement all interactive behavior to match TorkLaw's functionality.

1. STICKY NAVBAR
   - Add class 'navbar-scrolled' when window.scrollY > 80
   - Remove when back at top
   - CSS handles the visual transition

2. MOBILE MENU
   - Toggle mobile nav open/closed on hamburger click
   - Close on outside click
   - Close on ESC key
   - Prevent body scroll when menu is open

3. CONSULTATION FORM VALIDATION (all forms with class 'consultation-form')
   - Validate on submit
   - Required: name, phone, email, case description
   - Phone: 10 digits (US format, allows spaces/dashes/parens)
   - Email: standard format
   - Show inline error messages below invalid fields (red border + error text)
   - On success: hide form, show success message matching TorkLaw's style:
     "Thank you! A member of our team will contact you within 2 hours.
      For urgent matters, call us now at (617) 555-0100."

4. SMOOTH SCROLL
   - All internal anchor links (#section) scroll smoothly
   - Offset by navbar height so content isn't hidden under sticky nav

5. FAQ ACCORDION
   - Elements: .faq-item > .faq-question + .faq-answer
   - Click question to toggle answer open/closed
   - Animate height with max-height transition
   - Only one open at a time
   - Add/remove .active class on .faq-item

6. SCROLL REVEAL ANIMATIONS
   - IntersectionObserver on all .animate-on-scroll elements
   - Add .visible class when element enters viewport (threshold: 0.15)
   - CSS handles the actual fade + slide up animation

7. STATS COUNTER ANIMATION
   - When stats/trust bar enters viewport, count numbers up from 0 to target
   - Duration: 2 seconds
   - Use requestAnimationFrame for smooth animation
   - Format numbers with commas, preserve suffixes ($, +, M, K)

8. MOBILE STICKY CTA BAR (match TorkLaw mobile behavior)
   - On mobile only (< 768px): show a sticky bottom bar with phone button + consultation button
   - Hide when user is in the hero section (already sees CTA)
   - Show when user scrolls past hero

9. ACTIVE NAV LINK
   - Add .active class to current page's nav link based on current URL path
```

---

## Phase 8 — Logo SVG (assets/logo.svg)

**Prompt for Claude Code:**

```
Create `assets/logo.svg` — a clean text-based law firm logo for Burke Law Firm.

Study the TorkLaw logo from the screenshots for style reference (text treatment, weight, layout).

Requirements:
- "BURKE LAW FIRM" as the primary text
- Professional serif or sans-serif treatment matching the overall site aesthetic
- Works on dark backgrounds (navbar) — use white or gold text
- viewBox="0 0 240 60", no background fill (transparent)
- Pure SVG with no external font dependencies (use system font fallbacks)
- Simple, authoritative — no decorative elements beyond a possible thin rule or icon
```

---

## Phase 9 — Final Polish Pass

**Prompt for Claude Code:**

```
Do a complete final polish pass across all pages. Open each .html file and check:

1. VISUAL CONSISTENCY
   - Navbar is identical across all pages
   - Footer is identical across all pages
   - Active nav link highlights correctly per page
   - Section spacing is consistent (no page feels tighter or looser than others)

2. TORKLAW FIDELITY CHECK
   - Re-open design-references/ screenshots
   - Compare each built section against its screenshot reference
   - Fix any sections where layout, spacing, color, or component style drifted from the reference
   - Pay special attention to: hero section, trust bar, cards, and footer

3. MOBILE RESPONSIVENESS
   - Hero stacks to single column (form below text) on mobile
   - All grids collapse to 1 column below 768px
   - Navbar becomes hamburger on mobile
   - All buttons are full-width on mobile
   - No horizontal overflow on any page at 375px viewport width
   - Font sizes are readable on mobile (minimum 16px body)

4. CONVERSION ELEMENTS (verify on every page)
   - Phone number is clickable (tel: link) everywhere it appears
   - "Free Consultation" CTA is above the fold on every page
   - Consultation form appears on every page
   - "No Fee Unless We Win" appears at least once per page

5. PERFORMANCE
   - All <script> tags have defer attribute
   - CSS linked in <head>
   - No inline styles (everything in styles.css)
   - Images have width and height attributes

6. ACCESSIBILITY
   - All form inputs have <label> elements
   - All images have alt attributes
   - Buttons have descriptive text
   - Focus styles visible on all interactive elements (:focus-visible)
   - Sufficient color contrast on all text

7. SEO META TAGS (add to each page <head>)
   - <title> unique per page, includes "Burke Law Firm" and "Massachusetts"
   - <meta name="description"> 150–160 chars, unique per page
   - <meta name="viewport" content="width=device-width, initial-scale=1">
   - Open Graph tags (og:title, og:description, og:image)
   - <link rel="canonical"> for each page

8. LEGAL FOOTER NOTE
   - Every page footer includes: "Attorney Advertising. Results may vary. Prior results do not guarantee similar outcomes."
```

---

## Notes for Claude Code

- **Primary reference:** Always check `design-references/` screenshots before building any section. What you see in those screenshots overrides any assumption you might make.
- **Content is placeholder:** Do not worry about getting Burke Law Firm's real content perfect — use placeholders everywhere. The client replaces content manually later.
- **No frameworks:** Pure HTML/CSS/JS only. No Bootstrap, no Tailwind, no jQuery, no React.
- **Massachusetts law details:** For FAQ answers, use accurate Massachusetts law (3-year PI statute of limitations, 0.08% BAC limit, MA OUI penalties). Mark anything uncertain with `[VERIFY]`.
- **Phone links:** Every phone number instance must be `<a href="tel:+16175550100">(617) 555-0100</a>`.
- **Image placeholders:** No stock photos. Use CSS background gradients or styled `<div>` placeholders with dimensions matching TorkLaw's image areas.
