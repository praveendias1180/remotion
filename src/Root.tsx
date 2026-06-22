// The Root is where you REGISTER every video. Each <Composition> becomes an
// entry in the Studio sidebar and a render target on the CLI.
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"          // unique name (used by the render command)
        component={HelloWorld}   // which component to render, once per frame
        durationInFrames={120}   // 120 frames / 30fps = 4 seconds
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
