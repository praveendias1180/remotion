# remotion

Learning [Remotion](https://www.remotion.dev) — making videos with React, where your
component is rendered once per frame and the frames are stitched into an MP4.

## Setup

```bash
npm install
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Open **Remotion Studio** — live preview, scrub the timeline frame by frame |
| `npm run render` | Render the `HelloWorld` composition → `out/video.mp4` |
| `npm run upgrade` | Upgrade all Remotion packages together |

Start with `npm run dev` — the Studio is where the concepts click.

## Project layout

```
src/
├── index.ts          # registerRoot() — the entry point
├── Root.tsx          # registers each <Composition> (a renderable video)
└── HelloWorld.tsx     # the first video; demos all 5 core concepts

docs/
└── remotion-basics.md # written notes on the mental model
```

## The 5 core concepts

1. **Frames & FPS** — think in frames (`0,1,2…`), not seconds. `useCurrentFrame()`.
2. **Composition** — registers a video and its metadata (duration, fps, size).
3. **`interpolate`** — maps a frame number to a value (linear). Drives fades, slides, etc.
4. **`spring`** — natural, bouncy motion instead of linear.
5. **`Sequence`** — controls *when* elements appear; resets the child's local frame to 0.

See [`docs/remotion-basics.md`](docs/remotion-basics.md) for the full explanation.

## Learn more

- [Remotion docs](https://www.remotion.dev/docs)
- [Fundamentals](https://www.remotion.dev/docs/the-fundamentals)
