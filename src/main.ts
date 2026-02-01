import { Scene3D } from './scene3d';
import { renderContent } from './content';
import gsap from 'gsap';

window.addEventListener('DOMContentLoaded', () => {
    new Scene3D();

    document.getElementById('side-red')?.addEventListener('click', () => switchDimension('red'));
    document.getElementById('side-blue')?.addEventListener('click', () => switchDimension('blue'));
});

function switchDimension(choice: 'red' | 'blue') {
    const overlay = document.getElementById('dimension-overlay');
    const voidEl = document.getElementById('the-void');
    const mainEl = document.getElementById('main-content');

    // Create Warp Effect
    const warp = document.createElement('div');
    warp.classList.add('warp-effect');
    document.body.appendChild(warp);

    // Initial Flash
    gsap.to(overlay, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
            // Animate Warp
            warp.style.animation = "warp-speed 0.8s linear forwards";

            // Glitch Effect for Red Dimension
            if (choice === 'red') {
                document.body.classList.add('glitch-active');
                setTimeout(() => document.body.classList.remove('glitch-active'), 1000);
            }

            gsap.delayedCall(0.5, () => {
                if (voidEl) voidEl.style.display = 'none';
                mainEl?.classList.remove('hidden');
                document.body.className = `dimension-${choice}`;
                renderContent(choice);
                warp.remove(); // Cleanup

                // Back Navigation Logic
                document.getElementById('back-btn')?.addEventListener('click', () => {
                    resetToVoid();
                });

                gsap.to(overlay, { opacity: 0, duration: 1, delay: 0.3 });
            });
        }
    });
}

function resetToVoid() {
    const overlay = document.getElementById('dimension-overlay');
    const voidEl = document.getElementById('the-void');
    const mainEl = document.getElementById('main-content');

    gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
            if (voidEl) voidEl.style.display = 'flex'; // Restore void
            if (voidEl) voidEl.classList.remove('hidden');
            mainEl?.classList.add('hidden');
            document.body.className = ''; // Remove dimension class

            // Reset main content to empty to stop any running effects/videos if any
            if (mainEl) mainEl.innerHTML = '';

            gsap.to(overlay, { opacity: 0, duration: 1 });
        }
    });
}
