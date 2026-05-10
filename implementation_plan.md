# Cybersec Portfolio: Blog Integration & Cleanup

The goal of this phase is to remove the "System Diagnostics" (CPU/MEM) widget as requested, and architect a completely new section of the website dedicated to hosting a technical blog (styled as "Field Notes" or "Incident Reports") that perfectly matches the existing Intelligence Dossier aesthetic.

## User Review Required

> [!IMPORTANT]
> Since we are adding a whole new section to the site, I propose making the blog a separate HTML page (`blog.html`) rather than trying to stuff it into the bottom of the main `index.html` page. The main page will have a prominent link to the blog, and the blog will have a link back to the main dossier.
> **Does this multi-page approach sound good, or would you prefer a single-page design where clicking "Blog" hides the dossier and shows the blog content dynamically?**

## Proposed Changes

### Component 1: Cleanup

#### [MODIFY] [index.html](file:///c:/Users/carry/OneDrive/Desktop/cybersec/portfolio/index.html)
- Remove the `<div class="sys-diag">` element.
- Add a new navigation link in the Comms section or Header: `[ FIELD_NOTES (BLOG) ]`.

#### [MODIFY] [style.css](file:///c:/Users/carry/OneDrive/Desktop/cybersec/portfolio/style.css)
- Delete all `.sys-diag` CSS rules.
- Add specific layout rules for the blog post list (e.g., `.blog-list`, `.post-preview`).

#### [MODIFY] [app.js](file:///c:/Users/carry/OneDrive/Desktop/cybersec/portfolio/app.js)
- Remove the `sysDiagInterval` logic and `cpuEl`/`memEl` queries.

---

### Component 2: The Blog Architecture

#### [NEW] [blog.html](file:///c:/Users/carry/OneDrive/Desktop/cybersec/portfolio/blog.html)
- A new page utilizing the same `style.css` and `app.js` (so it retains the CRT scanlines, background, and fonts).
- Contains an "ARCHIVE DIRECTORY" layout listing multiple blog posts with dates, tags (e.g., `[MALWARE_ANALYSIS]`, `[CTF_WRITEUP]`), and short summaries.

#### [NEW] [post.html](file:///c:/Users/carry/OneDrive/Desktop/cybersec/portfolio/post.html)
- A template for a single blog post.
- Designed like a "Declassified Incident Report", containing the full text of an article, code snippet blocks, and images.

## Verification Plan

### Manual Verification
- Verify the system diagnostic HUD is completely removed and causes no JS errors.
- Click the new "FIELD NOTES" link on the main page to navigate to the blog.
- Verify the blog index looks clean and fits the spy/cyber aesthetic.
- Click a sample post on the blog index to navigate to the individual post template.
