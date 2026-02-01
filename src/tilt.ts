import gsap from 'gsap';

export class TiltEffect {
    constructor(selector: string) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            this.initTilt(el as HTMLElement);
        });
    }

    private initTilt(card: HTMLElement) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                transformPerspective: 1000,
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
}
