import methods from '@/common/methosd';
import { useRef, useEffect } from 'react';
import css from 'style/components/backgroundCanvas.module.css';

const plugin = {
  minSpeedX: 0.1,
  maxSpeedX: 0.7,
  minSpeedY: 0.1,
  maxSpeedY: 0.7,
  directionX: ['left', 'right'],
  directionY: ['up', 'down'],
  density: 10000, // How many particles will be generated: one particle every n pixels
  dotColor: '#66ccff',
  lineColor: '#66ccff',
  minParticleRadius: 1, // Dot size
  maxParticleRadius: 31, // Dot size
  lineWidth: 1,
  proximity: 100, // How close two dots need to be before they join
};

export const BackgroundCanvas = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Canvas(canvasRef.current);
    }
  }, [])

  return <canvas ref={canvasRef} className={css.background} />
}

class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null = null
  particles: Array<Particle> = []

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;

    this.init();
  };

  init = () => {
    // Create particles
    let numParticles = Math.round((this.canvas.width * this.canvas.height) / plugin.density);
    for (let i = 0; i < numParticles; i++) {
      let p = new Particle([methods.getRandomIntInclusive(0, 1), methods.getRandomIntInclusive(0, 1)]);
      p.setStackPos(i);
      this.particles.push(p);
    }

    this.draw();
  };

  // Draw particles
  draw = () => {
    if (!this.ctx) { return; }

    setInterval(() => {
      let tempCanvas = document.createElement('canvas');
      tempCanvas.width = window.innerWidth;
      tempCanvas.height = window.innerHeight;

      let tempCtx = tempCanvas.getContext('2d');

      for (let i = 0; i < this.particles.length; i++) {
        if (this.ctx) {
          this.particles[i].updatePosition();
        }
      }
      for (let i = 0; i < this.particles.length; i++) {
        if (tempCtx) this.particles[i].draw(tempCtx, this.particles);
      }

      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(tempCanvas, 0, 0);
      }
    }, 100);

  };

}

class Particle {
  stackPos: number = 0
  hollow: boolean = false
  dotColor: string | null = null;
  position: { x: number, y: number } = {
    x: Math.ceil(Math.random() * window.innerWidth),
    y: Math.ceil(Math.random() * window.innerHeight)
  }
  winW: number = window.innerWidth
  winH: number = window.innerHeight
  particleRadius: number = 0
  directionX: number = 0
  directionY: number = 0
  speed: { x: number, y: number } = { x: 0, y: 0 }

  constructor(ann: Array<number>) {
    this.directionX = ann[0];
    this.directionY = ann[1];
    this.particleRadius = methods.getRandomIntInclusive(plugin.minParticleRadius, plugin.maxParticleRadius);

    if (this.particleRadius > 16) {
      this.hollow = true;
      this.dotColor = methods.getRandomColor();
    }

    this.setSpeed();
  };

  // 初始化速度方向
  setSpeed = () => {
    let speed: { x: number, y: number } = { x: 0, y: 0 };
    switch (plugin.directionX[this.directionX]) {
      case 'left':
        speed.x = +(-plugin.maxSpeedX + (Math.random() * plugin.maxSpeedX) - plugin.minSpeedX).toFixed(2);
        break;
      case 'right':
        speed.x = +((Math.random() * plugin.maxSpeedX) + plugin.minSpeedX).toFixed(2);
        break;
      default:
        speed.x = +((-plugin.maxSpeedX / 2) + (Math.random() * plugin.maxSpeedX)).toFixed(2);
        speed.x += speed.x > 0 ? plugin.minSpeedX : -plugin.minSpeedX;
        break;
    }
    switch (plugin.directionY[this.directionY]) {
      case 'up':
        speed.y = +(-plugin.maxSpeedY + (Math.random() * plugin.maxSpeedY) - plugin.minSpeedY).toFixed(2);
        break;
      case 'down':
        speed.y = +((Math.random() * plugin.maxSpeedY) + plugin.minSpeedY).toFixed(2);
        break;
      default:
        speed.y = +((-plugin.maxSpeedY / 2) + (Math.random() * plugin.maxSpeedY)).toFixed(2);
        speed.x += speed.y > 0 ? plugin.minSpeedY : -plugin.minSpeedY;
        break;
    }
    this.speed = speed;
  };

  // Setter: particle stacking position
  setStackPos = (i: number) => {
    this.stackPos = i;
  };

  // update particle position
  updatePosition = () => {
    switch (plugin.directionX[this.directionX]) {
      case 'left':
        if (this.position.x + this.speed.x - this.particleRadius < 0) {
          this.directionX = 1;
          this.directionY = this.directionY === 1 ? 0 : 1;
        }
        break;
      case 'right':
        if (this.position.x + this.speed.x + this.particleRadius > this.winW) {
          this.directionX = 0;
          this.directionY = this.directionY === 1 ? 0 : 1;
        }
        break;
      default:
        // If particle has reached edge of canvas, reverse its direction
        if (
          this.position.x + this.speed.x + this.particleRadius > this.winW ||
          this.position.x + this.speed.x + this.particleRadius < 0
        ) {
          this.speed.x = -this.speed.x;
        }
        break;
    }

    switch (plugin.directionY[this.directionY]) {
      case 'up':
        if (this.position.y + this.speed.y - this.particleRadius < 0) {
          this.directionY = 1;
          this.directionX = this.directionX === 1 ? 0 : 1;
        }
        break;
      case 'down':
        if (this.position.y + this.speed.y + this.particleRadius > this.winH) {
          this.directionY = 0;
          this.directionX = this.directionX === 1 ? 0 : 1;
        }
        break;
      default:
        // If particle has reached edge of canvas, reverse its direction
        if (
          this.position.y + this.speed.y + this.particleRadius > this.winH ||
          this.position.y + this.speed.y + this.particleRadius < 0
        ) {
          this.speed.y = -this.speed.y;
        }
        break;
    }
    this.setSpeed();

    // Move particle
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  };

  // Draw particle
  draw = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    // Draw circle
    ctx.fillStyle = plugin.dotColor;
    ctx.strokeStyle = this.dotColor || plugin.lineColor;
    ctx.lineWidth = plugin.lineWidth;

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.particleRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    if (this.hollow) {
      ctx.stroke();
    } else {
      ctx.fill();
    }

    // Draw lines
    ctx.beginPath();
    // Iterate over all particles which are higher in the stack than this one
    for (let i = particles.length - 1; i > this.stackPos; i--) {
      let p2 = particles[i];

      // Pythagorus theorum to get distance between two points
      let a = this.position.x - p2.position.x
      let b = this.position.y - p2.position.y
      let dist = parseInt(Math.sqrt((a * a) + (b * b)).toFixed(2));

      // If the two particles are in proximity, join them
      if (dist < plugin.proximity && !this.hollow && !p2.hollow) {
        ctx.moveTo(this.position.x, this.position.y);
        ctx.quadraticCurveTo(Math.max(p2.position.x, p2.position.x), Math.min(p2.position.y, p2.position.y), p2.position.x, p2.position.y);
      }
    }
    ctx.stroke();
    ctx.closePath();
  };
}