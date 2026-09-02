import { useEffect, useRef } from "react";
import { BallManager } from "../game/classes/BallManager";
import { WIDTH } from "../game/constants";
import { pad } from "../game/padding";
import { Simulate } from "../components/Simulate";
import { Quotes, FoundIssue } from "../components";

export function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function simulate(ballManager: BallManager) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      ballManager.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current,
        () => {
          // Outputs tracking
        }
      );
      simulate(ballManager);

      return () => {
        ballManager.stop();
      };
    }
  }, [canvasRef]);

  return (
    <div className="">
      <canvas ref={canvasRef} width={WIDTH} />
      <div className="flex flex-col lg:flex-row  items-center justify-between ">
        <Simulate />
        <Quotes />
      </div>
      <FoundIssue />
    </div>
  );
}
