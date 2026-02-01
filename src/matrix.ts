export class MatrixEffect {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private columns: number = 0;
    private drops: number[] = [];
    private chars: string = "0123456789ABCDEFKTXYZ";
    private fontSize: number = 14;
    private width: number = 0;
    private height: number = 0;
    private animationId: number = 0;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        // Fail silently if canvas not found (safety)
        if (!this.canvas) {
            console.error("Matrix canvas not found");
            this.ctx = document.createElement('canvas').getContext('2d')!;
            return;
        }

        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initDrops();
        this.animate();
    }

    private resize() {
        if (!this.canvas) return;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.columns = Math.floor(this.width / this.fontSize);
        this.initDrops();
    }

    private initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start at random heights above screen
        }
    }

    private animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fade trail
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = '#0F0'; // Green text
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono'`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Draw character
            this.ctx.fillText(text, x, y);

            // Reset drop if it goes off screen (randomly)
            if (y > this.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            // Move drop
            this.drops[i]++;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    public stop() {
        cancelAnimationFrame(this.animationId);
    }
}
