import * as THREE from 'three';
import gsap from 'gsap';

export class Scene3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private redPill: THREE.Mesh | null = null;
    private bluePill: THREE.Mesh | null = null;
    private mouse = new THREE.Vector2();

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas-3d') as HTMLCanvasElement,
            alpha: true,
            antialias: true
        });

        this.init();
    }

    private init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 2);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        this.createParticles();
        this.createPills();
        this.addEventListeners();
        this.animate();
    }

    private createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;

        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(particlesMesh);
    } // End createParticles

    private createPills() {
        const geometry = new THREE.CapsuleGeometry(0.4, 0.8, 10, 20);

        const redMat = new THREE.MeshStandardMaterial({
            color: 0xff2d55,
            emissive: 0xff2d55,
            emissiveIntensity: 0.1,
            roughness: 0.2,
            metalness: 0.9
        });
        this.redPill = new THREE.Mesh(geometry, redMat);
        this.redPill.position.set(-3.5, 0, 0);
        this.redPill.rotation.z = Math.PI / 4;
        this.scene.add(this.redPill);

        const blueMat = new THREE.MeshStandardMaterial({
            color: 0x007aff,
            emissive: 0x007aff,
            emissiveIntensity: 0.1,
            roughness: 0.2,
            metalness: 0.9
        });
        this.bluePill = new THREE.Mesh(geometry, blueMat);
        this.bluePill.position.set(3.5, 0, 0);
        this.bluePill.rotation.z = -Math.PI / 4;
        this.scene.add(this.bluePill);
    }

    private addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            gsap.to(this.camera.position, {
                x: this.mouse.x * 0.8,
                y: this.mouse.y * 0.8,
                duration: 1.5,
                ease: 'power2.out'
            });
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const sideRed = document.getElementById('side-red');
        const sideBlue = document.getElementById('side-blue');

        sideRed?.addEventListener('mouseenter', () => this.highlightPill('red'));
        sideBlue?.addEventListener('mouseenter', () => this.highlightPill('blue'));
        [sideRed, sideBlue].forEach(s => s?.addEventListener('mouseleave', () => this.resetPills()));
    }

    private highlightPill(side: 'red' | 'blue') {
        if (!this.redPill || !this.bluePill) return;
        const target = side === 'red' ? this.redPill : this.bluePill;
        const other = side === 'red' ? this.bluePill : this.redPill;

        gsap.to(target.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.6, ease: 'expo.out' });
        gsap.to(other.scale, { x: 0.4, y: 0.4, z: 0.4, duration: 0.6, ease: 'expo.out' });
        gsap.to(target.rotation, { x: Math.PI * 2, duration: 1.5, ease: 'power2.inOut' });
    }

    private resetPills() {
        if (!this.redPill || !this.bluePill) return;
        gsap.to([this.redPill.scale, this.bluePill.scale], { x: 1, y: 1, z: 1, duration: 0.5 });
    }

    private animate() {
        requestAnimationFrame(() => this.animate());

        if (this.redPill) {
            this.redPill.rotation.y += 0.005;
            this.redPill.position.y = Math.sin(Date.now() * 0.001) * 0.3;
        }
        if (this.bluePill) {
            this.bluePill.rotation.y -= 0.005;
            this.bluePill.position.y = Math.cos(Date.now() * 0.001) * 0.3;
        }

        this.renderer.render(this.scene, this.camera);
    }
}
