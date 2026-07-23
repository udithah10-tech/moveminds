# MoveMinds

A premium, fully static website for **MoveMinds** — a youth-led adaptive dance and inclusive movement initiative founded by Uditha Harish, empowering neurodiverse children through movement.

> Every Mind Moves Differently. Every Child Belongs.

Built with **plain HTML, CSS, and JavaScript** — no frameworks, no build step, no backend. Ready to deploy directly to **GitHub Pages**.

## Structure

```
moveminds/
├── index.html          # Home / About
├── founder.html        # Founder + interactive timeline
├── programs.html       # 5 programs
├── impact.html         # Impact pillars
├── gallery.html        # Filterable masonry gallery + lightbox
├── get-involved.html   # Volunteer / Partner / Support
├── contact.html        # Contact form + info
├── css/
│   └── style.css       # Full design system
├── js/
│   └── script.js       # Nav, reveal, timeline, gallery, form
├── images/
│   ├── logo.png        # Official MoveMinds logo
│   ├── favicon.png
│   └── placeholders/   # (add real photos here later)
└── README.md
```

## Features

- Sticky navbar (transparent at top, frosted white on scroll) with animated mobile menu
- Full-screen animated hero with floating logo, gradient blobs, and scroll cue
- Scroll-reveal animations throughout (staggered, respects `prefers-reduced-motion`)
- Interactive founder timeline with an animated progress line
- Filterable masonry gallery with a lightbox preview
- Accessible contact form with static success confirmation (no backend)
- Premium navy photo placeholders labeled for the real images to come

## Replacing placeholders with real photos

1. Add your photos to `images/placeholders/` (or `images/`).
2. In the relevant page, replace the placeholder block:
   ```html
   <div class="ph">
     <span class="ph__badge">Photo placeholder</span>
     <span class="ph__label">Founder / Movement Photo</span>
   </div>
   ```
   with an image:
   ```html
   <img src="images/placeholders/your-photo.jpg" alt="Descriptive alt text" class="ph" />
   ```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Create a GitHub repository and upload all files (keep the folder structure).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

No configuration files are required — everything works as static files.

## Contact

Email: moveminds123@gmail.com

&copy; 2026 MoveMinds. All rights reserved.
