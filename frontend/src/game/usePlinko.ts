import { useEffect, useRef } from "react";
import { BallManager } from "./classes/BallManager";
import { WIDTH } from "./constants";
import { pad } from "./padding";

export type BallFinishHandler = (sinkIndex: number, startX?: number) => void;

export function randomStartX() {
  return pad(WIDTH / 2 + 20 * (Math.random() - 0.5));
}

// Owns the BallManager lifecycle for a canvas: creates it on mount,
// optionally auto-drops balls, and stops everything on unmount.
export function usePlinko(onFinish?: BallFinishHandler, autoDropMs?: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballManagerRef = useRef<BallManager | undefined>(undefined);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ballManager = new BallManager(canvas, (index, startX) =>
      onFinishRef.current?.(index, startX)
    );
    ballManagerRef.current = ballManager;

    const dropTimer = autoDropMs
      ? setInterval(() => ballManager.addBall(randomStartX()), autoDropMs)
      : undefined;

    return () => {
      if (dropTimer) clearInterval(dropTimer);
      ballManager.stop();
      ballManagerRef.current = undefined;
    };
  }, [autoDropMs]);

  return { canvasRef, ballManagerRef };
}
