// A complete 15s vertical (9:16) Meta ad for the Gravity 6-Week Shred.
// Audience: women 50+. Angle: transformation/benefit. CTA: Apply.
//
// Structure (teaches <Series> — scenes play back-to-back, each child's
// useCurrentFrame() restarts at 0 so its animations are self-contained):
//   Hook (90) → Benefits (150) → Brand reveal (110) → CTA (100) = 450 frames.
import {
  AbsoluteFill,
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ── Brand ────────────────────────────────────────────────────────────────────
const ORANGE = "#FF6A00";
const BG = "#0A0A0A";
const FONT = "'Arial Black', 'Helvetica Neue', system-ui, sans-serif";

// ── Reusable reveal: spring-driven fade + slide-up. `delay` staggers items. ──
const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
}> = ({ children, delay = 0, y = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16 },
    durationInFrames: 22,
  });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

// A centered, padded column — the default layout for every scene.
const Scene: React.FC<{
  children: React.ReactNode;
  align?: "center" | "flex-start";
}> = ({ children, align = "center" }) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: align,
      flexDirection: "column",
      padding: 90,
      textAlign: align === "center" ? "center" : "left",
      gap: 24,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      color: ORANGE,
      fontSize: 46,
      fontWeight: 900,
      letterSpacing: 10,
      fontFamily: FONT,
    }}
  >
    {children}
  </span>
);

const Big: React.FC<{ children: React.ReactNode; size?: number }> = ({
  children,
  size = 132,
}) => (
  <div
    style={{
      color: "white",
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.02,
      fontFamily: FONT,
    }}
  >
    {children}
  </div>
);

// ── Scene 1: Hook ────────────────────────────────────────────────────────────
const Hook: React.FC = () => (
  <Scene>
    <FadeUp delay={0}>
      <Kicker>WOMEN OVER 50</Kicker>
    </FadeUp>
    <FadeUp delay={8}>
      <Big>Drop a dress size</Big>
    </FadeUp>
    <FadeUp delay={16}>
      <Big>
        in <span style={{ color: ORANGE }}>6 weeks</span>
      </Big>
    </FadeUp>
  </Scene>
);

// ── Scene 2: Benefits ────────────────────────────────────────────────────────
const BENEFITS = ["No crash diets", "No endless cardio", "Eat the foods you love"];

const Benefit: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <FadeUp delay={delay} y={40}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        color: "white",
        fontSize: 70,
        fontWeight: 800,
        fontFamily: FONT,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 84,
          height: 84,
          borderRadius: 999,
          background: ORANGE,
          color: BG,
          fontSize: 52,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      {text}
    </div>
  </FadeUp>
);

const Benefits: React.FC = () => (
  <Scene align="flex-start">
    <FadeUp delay={0}>
      <span style={{ color: ORANGE, fontSize: 50, fontWeight: 900, fontFamily: FONT }}>
        Here&apos;s the deal:
      </span>
    </FadeUp>
    <div style={{ display: "flex", flexDirection: "column", gap: 44, marginTop: 20 }}>
      {BENEFITS.map((b, i) => (
        <Benefit key={b} text={b} delay={18 + i * 26} />
      ))}
    </div>
  </Scene>
);

// ── Scene 3: Brand reveal (big spring pop) ───────────────────────────────────
const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 9 }, durationInFrames: 30 });
  const scale = interpolate(pop, [0, 1], [0.6, 1]);

  return (
    <Scene>
      <FadeUp delay={0}>
        <Kicker>INTRODUCING</Kicker>
      </FadeUp>
      <div style={{ transform: `scale(${scale})` }}>
        <Big size={150}>
          THE
          <br />
          <span style={{ color: ORANGE }}>6-WEEK SHRED</span>
        </Big>
      </div>
      <FadeUp delay={22}>
        <span style={{ color: "#bbb", fontSize: 54, fontWeight: 700, fontFamily: FONT }}>
          Built for women 50+
        </span>
      </FadeUp>
    </Scene>
  );
};

// ── Scene 4: CTA (pulsing button) ────────────────────────────────────────────
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  // Gentle pulse: sine wave on scale, ~once per second.
  const pulse = 1 + 0.04 * Math.sin((frame / 30) * Math.PI * 2);

  return (
    <Scene>
      <FadeUp delay={0}>
        <Big size={92}>Ready to start?</Big>
      </FadeUp>
      <FadeUp delay={10}>
        <div
          style={{
            transform: `scale(${pulse})`,
            background: ORANGE,
            color: BG,
            fontSize: 76,
            fontWeight: 900,
            fontFamily: FONT,
            padding: "36px 80px",
            borderRadius: 999,
            marginTop: 20,
            boxShadow: `0 0 80px ${ORANGE}66`,
          }}
        >
          APPLY NOW
        </div>
      </FadeUp>
      <FadeUp delay={18}>
        <span style={{ color: "white", fontSize: 50, fontWeight: 700, fontFamily: FONT }}>
          Tap “Learn More” 👇
        </span>
      </FadeUp>
    </Scene>
  );
};

// ── Background glow that drifts across the whole ad (global frame). ───────────
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const glowY = interpolate(frame, [0, durationInFrames], [35, 70]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% ${glowY}%, #3a1d00 0%, ${BG} 55%)`,
      }}
    />
  );
};

// ── Bottom progress bar that fills across the full 450 frames. ───────────────
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const width = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 12, width: `${width}%`, background: ORANGE }} />
    </AbsoluteFill>
  );
};

// Always-on Gravity wordmark in the corner.
const Wordmark: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", padding: 70 }}>
    <span
      style={{
        color: "white",
        fontSize: 44,
        fontWeight: 900,
        letterSpacing: 6,
        fontFamily: FONT,
      }}
    >
      GRAVITY<span style={{ color: ORANGE }}>.</span>
    </span>
  </AbsoluteFill>
);

// ── The ad itself: Background + Wordmark + ProgressBar persist; Series cuts
//    between the four scenes. ────────────────────────────────────────────────
export const ShredAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT }}>
      <Background />
      <Wordmark />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Benefits />
        </Series.Sequence>
        <Series.Sequence durationInFrames={110}>
          <BrandReveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={100}>
          <CTA />
        </Series.Sequence>
      </Series>
      <ProgressBar />
    </AbsoluteFill>
  );
};
