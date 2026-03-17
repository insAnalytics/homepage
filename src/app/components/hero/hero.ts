import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isGreen: boolean;
  phase: number;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private nodes: NetNode[] = [];
  private animId = 0;
  private resizeHandler = () => this.onResize();

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.onResize();
    this.initNodes(canvas);
    window.addEventListener('resize', this.resizeHandler);
    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private initNodes(canvas: HTMLCanvasElement): void {
    for (let i = 0; i < 28; i++) {
      const r = 2 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      this.nodes.push({
        x: r + Math.random() * (canvas.width - r * 2),
        y: r + Math.random() * (canvas.height - r * 2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        isGreen: Math.random() > 0.7,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private loop(): void {
    const canvas = this.canvasRef.nativeElement;

    // Keep pixel dimensions in sync with CSS layout dimensions
    if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    }

    const ctx = this.ctx;
    const nodes = this.nodes;
    const t = performance.now() * 0.001;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(61,184,75,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    for (const n of nodes) {
      const pulse = n.r + Math.sin(t * 1.5 + n.phase) * 0.8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, Math.max(0.5, pulse), 0, Math.PI * 2);
      ctx.fillStyle = n.isGreen ? 'rgba(61,184,75,0.5)' : 'rgba(43,45,126,0.35)';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < n.r)                  { n.vx =  Math.abs(n.vx); }
      if (n.x > canvas.width  - n.r)  { n.vx = -Math.abs(n.vx); }
      if (n.y < n.r)                  { n.vy =  Math.abs(n.vy); }
      if (n.y > canvas.height - n.r)  { n.vy = -Math.abs(n.vy); }
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }
}
