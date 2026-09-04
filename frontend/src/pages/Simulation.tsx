import { useState } from "react";
import { Button } from "../components/ui";
import { HEIGHT, WIDTH } from "../game/constants";
import { randomStartX, usePlinko } from "../game/usePlinko";

export function Simulation() {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState(0);

  const { canvasRef, ballManagerRef } = usePlinko((index) => {
    setCounts((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    setTotal((prev) => prev + 1);
  });

  function dropBall() {
    ballManagerRef.current?.addBall(randomStartX());
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-6">
      <div className="flex mx-16 flex-col justify-center py-10 text-white">
        <h2 className="text-2xl font-bold mb-3">Balls landed: {total}</h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-1">
          {Object.keys(counts)
            .map(Number)
            .sort((a, b) => a - b)
            .map((index) => (
              <div key={index} className="flex justify-between gap-4">
                <span>Slot {index}</span>
                <span className="font-bold">{counts[index]}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="max-w-full h-auto"
        />
        <Button className="px-10 mb-6" onClick={dropBall}>
          Drop ball
        </Button>
      </div>
    </div>
  );
}
