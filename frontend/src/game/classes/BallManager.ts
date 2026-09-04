import { HEIGHT, WIDTH, ballRadius, obstacleRadius } from "../constants";
import { Obstacle, Sink, createObstacles, createSinks } from "../objects";
import { getSinkStyle } from "../sinkStyle";
import { pad, unpad } from "../padding";
import { Ball } from "./Ball";

export class BallManager {
    private balls: Ball[];
    private canvasRef: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private obstacles: Obstacle[]
    private sinks: Sink[]
    private requestId?: number;
    private onFinish?: (index: number,startX?: number) => void;
    stopped = false;

    constructor(canvasRef: HTMLCanvasElement, onFinish?: (index: number,startX?: number) => void) {
        this.balls = [];
        this.canvasRef = canvasRef;
        this.ctx = this.canvasRef.getContext("2d")!;
        this.obstacles = createObstacles();
        this.sinks = createSinks();
        this.update();
        this.onFinish = onFinish;
    }

    addBall(startX?: number) {
        if (this.stopped) return;
        const newBall = new Ball(startX || pad(WIDTH / 2 + 13), pad(50), ballRadius, 'red', this.ctx, this.obstacles, this.sinks, (index) => {
            this.balls = this.balls.filter(ball => ball !== newBall);
            this.onFinish?.(index, startX)
        });
        this.balls.push(newBall);
    }

    drawObstacles() {
        this.ctx.fillStyle = 'white';
        this.obstacles.forEach((obstacle) => {
            this.ctx.beginPath();
            this.ctx.arc(unpad(obstacle.x), unpad(obstacle.y), obstacle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }
  
    drawSinks() {
        const SPACING = obstacleRadius * 2;
        this.ctx.font = "bold 11px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i];
            const style = getSinkStyle(i, this.sinks.length);
            const drawWidth = sink.width - SPACING;
            // box and label are both centered on the hit zone (sink.x ± sink.width / 2)
            this.ctx.fillStyle = style.background;
            this.ctx.fillRect(sink.x - drawWidth / 2, sink.y - sink.height / 2, drawWidth, sink.height);
            this.ctx.fillStyle = style.color;
            this.ctx.fillText(`${sink.multiplier}x`, sink.x, sink.y);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.drawObstacles();
        this.drawSinks();
        this.balls.forEach(ball => {
            ball.draw();
            ball.update();
        });
    }
    
    update() {
        if (this.stopped) return;
        this.draw();
        this.requestId = requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        this.stopped = true;
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    }
}