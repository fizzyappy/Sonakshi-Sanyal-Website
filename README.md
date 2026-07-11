# Sonakshi Sanyal — Portfolio

A single-page portfolio site for illustrator and writer Sonakshi Sanyal.
Pure static HTML, CSS and JavaScript — no build step, no dependencies.


## Before you go live — replace these placeholders

A few bits of content are stand-ins. Edit them in `index.html` (or ask me to):

- **Contact email** — currently `hello@sonakshisanyal.com` (appears twice: the
  link `href="mailto:..."` and the visible text). Put your real email.
- **Social links** — the Instagram and Behance links point to `#`. Replace the
  `href="#"` with your real profile URLs, or delete the ones you don't use.
- **Publication descriptions** — the book/publication *titles* are real, but the
  one-line descriptions under them are my stand-ins. Swap in your own wording.
- **Programs & Recognition** — the names are real; confirm the participation and
  add real years/details where you want them.
- **Artwork titles** — several titles were invented as placeholders. Rename any
  in `js/artworks.js` (the `title` field).

Everything else (layout, colours, gallery, animations) is finished.

## Structure

```
index.html            the whole page
css/style.css         all styling (light "gallery paper" theme)
js/artworks.js        the artwork list (titles, mediums, stories, filter category)
js/main.js            animations, ambient petal field, gallery + lightbox
images/artwork/*.jpg  artwork thumbnails (shown in the grid and lightbox)
images/sketch-motif.png  the faint line drawing behind the name
```

## View it locally

Just open `index.html` in a browser. Or, to be safe with paths, run a tiny server:

```
cd sonakshi-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages (free)

1. Create a new, empty repository on GitHub (e.g. `sonakshi-portfolio`). Do NOT add a README/licence from GitHub (this folder already has one).
2. In a terminal, from inside this folder:

   ```
   git init
   git add .
   git commit -m "Launch Sonakshi Sanyal portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sonakshi-portfolio.git
   git push -u origin main
   ```

3. On GitHub: open the repo → **Settings** → **Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set branch to **main** and folder to **/ (root)**, then **Save**.
6. Wait ~1 minute. Your site goes live at:

   ```
   https://YOUR-USERNAME.github.io/sonakshi-portfolio/
   ```

### Custom domain (optional)
In the same Pages settings there's a **Custom domain** box. Enter a domain you own
(e.g. `sonakshisanyal.com`), then add the DNS records GitHub shows you at your
domain registrar.

## Notes

- The artwork images here are display-resolution (up to ~820px). To swap in
  full-resolution scans later, replace the files in `images/artwork/` (keep the
  same `*_t.jpg` filenames) and push again.
- To add or change artwork: edit `js/artworks.js` — each entry has a `slug`,
  `title`, `medium`, a `cat` used for filtering, `w`/`h`, and a short `story`.
- The `.nojekyll` file tells GitHub Pages to serve the files as-is.
