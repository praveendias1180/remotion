// Your first composition. It demonstrates all 5 core concepts from
// docs/remotion-basics.md. Read the comments top-to-bottom.
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ── The title: fades + slides in using interpolate (linear mapping) ──────────
const Title: React.FC = () => {
  // CONCEPT 1: the current frame is just a number, 0,1,2,...
  const frame = useCurrentFrame();

  // CONCEPT 3: interpolate maps frame -> value.
  // Over frames 0→25, opacity goes 0→1 (a fade-in). Clamp so it stays at 1.
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Same idea for vertical position: slide up 40px → 0px.
  const translateY = interpolate(frame, [0, 25], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <h1
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: 130,
        fontWeight: 800,
        color: "white",
        opacity,
        marginLeft: 100,
        transform: `translateY(${translateY}px)`,
      }}
    >
      Hello, Praveen
    </h1>
  );
};

// ── The badge: pops in using spring (natural, bouncy motion) ─────────────────
const Badge: React.FC = () => {
  const frame = useCurrentFrame();
  // CONCEPT 2 (useVideoConfig): spring needs fps to compute physical timing.
  const { fps } = useVideoConfig();

  // CONCEPT 4: spring gives a 0→1 value that overshoots and settles.
  const scale = spring({ frame, fps, config: { damping: 10 } });

  return (
    <div
      style={{
        margin: 100,
        marginTop: 400,
        padding: "160px 32px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.15)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        fontSize: 40,
        transform: `scale(${scale})`,
      }}
    >
      Remotion ✨
    </div>
  );
};

export const HelloWorld: React.FC = () => {
  return (
    // AbsoluteFill = a div that fills the whole 1920x1080 frame. Your default
    // container. Here it paints the background and centers the children.
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a, #312e81)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* CONCEPT 5: Sequences control WHEN children appear. */}
      <Sequence from={0}>
        <Title />
      </Sequence>
      {/* Badge starts at frame 30. Inside it, useCurrentFrame() restarts at 0,
          so its spring begins animating exactly when it appears. */}
      <Sequence from={60}>
        <Badge />
      </Sequence>
    </AbsoluteFill>
  );
};
