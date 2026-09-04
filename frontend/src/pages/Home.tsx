import { Quotes, FoundIssue } from "../components";
import { HEIGHT, WIDTH } from "../game/constants";
import { usePlinko } from "../game/usePlinko";

export function Home() {
  const { canvasRef } = usePlinko(undefined, 1000);

  return (
    <div>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex justify-center">
        <Quotes />
      </div>
      <FoundIssue />
    </div>
  );
}
