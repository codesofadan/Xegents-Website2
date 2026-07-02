# Video Showcase assets

The 3D drag-to-scroll coverflow on the homepage
(`components/sections/video-showcase.tsx`, shown just above the
"How do we Leverage AI?" section) reads its clips from this folder.

## Drop your 6 files here — exact names

| Clip | Video file    | Poster (thumbnail before Play) |
|------|---------------|--------------------------------|
| 1    | `video-1.mp4` | `poster-1.jpg`                 |
| 2    | `video-2.mp4` | `poster-2.jpg`                 |
| 3    | `video-3.mp4` | `poster-3.jpg`                 |
| 4    | `video-4.mp4` | `poster-4.jpg`                 |
| 5    | `video-5.mp4` | `poster-5.jpg`                 |
| 6    | `video-6.mp4` | `poster-6.jpg`                 |

The names must match exactly (or edit the `VIDEOS` array in
`components/sections/video-showcase.tsx`).

## Recommendations

- **Format:** `.mp4` (H.264 + AAC) — widest browser support. Add a `.webm`
  twin later if you want smaller files.
- **Orientation:** the cards are **portrait (9:16)** by default. If your clips
  are landscape, set `CARD_ASPECT = "16 / 9"` in the component (one line).
- **Posters:** a JPG frame from each clip. Without a poster the card still
  works (shows a branded gradient), but a poster looks far better before Play.
- **Size:** keep each clip trim (ideally < 15 MB) — they load on demand
  (`preload="metadata"` only for the centre + neighbours), but smaller = faster.
- **Titles/captions:** edit the `title` and `caption` fields in the `VIDEOS`
  array to label each clip.
