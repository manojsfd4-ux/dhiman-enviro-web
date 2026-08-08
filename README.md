# Dhiman Enviro — website (ready to publish)

Plain HTML/CSS/JS. No build step, no Node, no command line. Upload and it's live.

## Publish (GitHub Pages)

1. Open your repository → **Add file → Upload files**
2. Drag **everything inside this folder** (index.html, _next, products,
   about, contact, .nojekyll, etc.) — not the folder itself
3. Commit
4. **Settings → Pages** → Source: *Deploy from a branch*, Branch: **main**,
   folder: **/ (root)** → Save
5. Live in about a minute

## What's in here — 31 pages

Home · Products (listing) · 17 product detail pages · About · Factory ·
Quality · Exports · Dealers · Gallery · Downloads · FAQ · Contact ·
Privacy · Terms · 404 · sitemap.xml · robots.txt

## Verified before shipping

- 0 broken internal links (all 33 checked)
- Every page: one H1, unique title, meta description, canonical URL
- Schema: Organization, Product (×17), Breadcrumb (×17), FAQPage
- sitemap.xml: 30 URLs, every one resolves
- Skip link, keyboard focus rings, labelled SVG, reduced-motion respected

## Still to add (marked "Content placeholder" on the live site)

1. Product photographs → `/products/<name>.jpg`
2. Factory and gallery photographs
3. Catalogue + certificate PDFs → `/downloads/`
4. Vector logo → `logo.svg`
5. OG share image → `og.jpg` (1200×630)
6. Business hours on Contact
7. Export destinations / shipping terms
8. Dealer list
9. Legal review of Privacy + Terms

## Getting updates

Tell Claude what to change. Claude rebuilds this folder and gives it back as a
zip. Replace the files in GitHub the same way. GitHub Pages updates itself.
