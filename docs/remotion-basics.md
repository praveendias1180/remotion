# Remotion: the core idea

**Remotion lets you make videos using React.** That's the whole pitch. Instead of dragging clips around in a timeline like Premiere or After Effects, you *write code*, and Remotion renders that code into an MP4.

The key insight that makes it click:

> A video is just a series of still images shown quickly. Remotion renders your React component **once per frame**, takes a screenshot of each, and stitches those screenshots into a video.

So if your video is 30 frames per second and lasts 2 seconds, Remotion renders your component **60 times** — once for frame 0, frame 1, frame 2, … frame 59. Your job is to answer one question: *"What should the screen look like at frame N?"*

That's the entire paradigm. Everything else is detail.

---

# The 5 concepts you actually need

## 1. Frames and FPS (the unit of time)

In Remotion you **don't think in seconds — you think in frames.**

- **FPS** (frames per second) = how many frames make up one second. Commonly `30`.
- A frame is just a number: `0, 1, 2, 3...`
- Time in seconds = `frame / fps`. So frame `90` at 30fps = 3 seconds in.

You get the current frame with a hook:

```jsx
import { useCurrentFrame } from "remotion";

const frame = useCurrentFrame(); // 0, then 1, then 2... as the video plays
```

Every animation you ever write is ultimately: *"given this frame number, compute a value."*

## 2. The Composition (your video's blueprint)

A **Composition** registers a video that can be rendered. It defines the metadata:

```jsx
<Composition
  id="MyVideo"          // unique name
  component={MyVideo}   // which React component to render
  durationInFrames={90} // 90 frames = 3 seconds at 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

You can have many Compositions in one project (intro, ad, tutorial…). They show up in the Remotion Studio sidebar.

## 3. `useCurrentFrame` + `interpolate` (how you animate)

This is the heart of it. **`interpolate` maps a frame number to a value.** Think "when frame goes from A to B, make this value go from X to Y."

```jsx
import { useCurrentFrame, interpolate } from "remotion";

const frame = useCurrentFrame();

// Over frames 0→30, fade opacity from 0→1
const opacity = interpolate(frame, [0, 30], [0, 1]);

return <div style={{ opacity }}>Hello</div>;
```

At frame 0, opacity is 0 (invisible). At frame 15, it's 0.5. At frame 30+, it's 1. That's a fade-in. You'll use `interpolate` constantly — for position, scale, rotation, color, anything numeric.

> ⚠️ One gotcha: by default `interpolate` keeps extrapolating past your range (frame 60 would give opacity 2). You almost always want to clamp it:
> ```jsx
> interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })
> ```

## 4. `spring` (natural motion)

`interpolate` is linear (robotic). `spring` gives you bouncy, physical motion that feels alive:

```jsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({ frame, fps, config: { damping: 12 } });
return <div style={{ transform: `scale(${scale})` }}>Pop!</div>;
```

`useVideoConfig()` gives you the fps/width/height of the current composition.

## 5. `Sequence` (timing things to appear later)

A video isn't one animation — it's many things happening at different times. `<Sequence>` shifts when a child "starts," and resets that child's frame counter to 0.

```jsx
<Sequence from={0} durationInFrames={30}>
  <Title />          {/* visible frames 0–30 */}
</Sequence>
<Sequence from={30}>
  <Subtitle />       {/* appears at frame 30; ITS useCurrentFrame starts at 0 */}
</Sequence>
```

That last point is important and surprising: inside a `Sequence from={30}`, the child's `useCurrentFrame()` returns 0 at frame 30. Each Sequence has its own local timeline. This is what makes components reusable.

---

# How it fits together

```
Root.tsx ──registers──> <Composition> ──points to──> Your component
                                                          │
                                              renders once per frame
                                                          │
                                    useCurrentFrame() tells it "what frame am I?"
                                                          │
                              interpolate/spring compute the look for that frame
                                                          │
                                         Sequences control WHEN things show
```

Two other building blocks you'll meet soon: `<AbsoluteFill>` (a div that fills the whole frame — your default container), and `<Series>` (play things back-to-back without computing `from` by hand). Plus `<Audio>`, `<Video>`, `<Img>` for media.
