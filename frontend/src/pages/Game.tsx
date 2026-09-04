import { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui";
import { HEIGHT, WIDTH } from "../game/constants";
import { MULTIPLIERS } from "../game/multipliers";
import { getSinkStyle } from "../game/sinkStyle";
import { usePlinko } from "../game/usePlinko";
import { baseURL } from "../utils";

export function Game() {
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const { canvasRef, ballManagerRef } = usePlinko((index) => {
    setResults((prev) => [...prev.slice(-7), index]);
  });

  async function addBall() {
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const response = await axios.post(`${baseURL}/game`, { data: 1 });
      ballManagerRef.current?.addBall(response.data.point);
    } catch {
      setError(`Can't reach the game server at ${baseURL} — is the backend running?`);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-4">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="max-w-full h-auto"
      />
      <div className="flex flex-col items-center gap-6">
        <Button className="px-10" onClick={addBall} disabled={pending}>
          {pending ? "Dropping…" : "Add ball"}
        </Button>
        {error && <p className="text-red-400 max-w-xs text-center">{error}</p>}
        {results.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm uppercase tracking-wide">
              Last hits
            </span>
            <div className="flex gap-2 flex-wrap justify-center max-w-xs">
              {[...results].reverse().map((sinkIndex, i) => {
                const style = getSinkStyle(sinkIndex);
                return (
                  <span
                    key={`${i}-${sinkIndex}`}
                    className="px-2.5 py-1 rounded font-bold text-sm"
                    style={{ backgroundColor: style.background, color: style.color }}
                  >
                    {MULTIPLIERS[sinkIndex]}x
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
