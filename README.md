# Yuxuan Hu — Personal Website

A personal site for [@berylhu43](https://github.com/berylhu43) — Yuxuan Hu, data scientist & ML
engineer with a film background. Built with **React + Vite**.

Aesthetic: a cinematic "grading-suite / edit-bay" — deep cool graphite, near-monochrome UI, a
single cyan readout accent, cinematic letterboxing, corner registration marks, and a live
timecode. The only warmth comes from the film stills.

🔗 **Live:** https://berylhu43.github.io/personal_web_skill_test/

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**, and set
**Source** to **GitHub Actions**.

> If you rename the repository, update `base` in `vite.config.js` to match the new
> `/<repo-name>/` path.

## Editing content

All copy and project data lives in [`src/data.js`](src/data.js) — edit there to update the
headline, the four projects, metrics, tags, education, or the film-still captions. No component
changes required.

### Adding the real project metrics

Each project's `metrics` array currently holds `{ pending: true }` placeholders, which render as
an honest "metric pending" chip. Replace each with `{ value: '…', label: '…' }`, e.g.:

```js
metrics: [
  { value: '94%', label: 'field accuracy' },
  { value: '12k', label: 'forms processed' },
],
```

### Adding the film stills

Drop 1–2 images at `public/stills/still-01.jpg` and `public/stills/still-02.jpg` (referenced in
`src/data.js`). Until the files exist, each frame shows a labelled placeholder. Recommended crop
is ~3:2; they're displayed full-bleed inside a framed well.

## Tech

- React 18 + Vite 5
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, the hero animation, and the scroll-progress bar
- A requestAnimationFrame 24fps timecode in the top bar
- Fonts: Bricolage Grotesque (display), IBM Plex Sans (body), IBM Plex Mono (data/timecode)
