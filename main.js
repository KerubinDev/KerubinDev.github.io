// Three.js, GSAP são carregados globalmente via tags <script> no HTML.

let scene, camera, renderer;
let hubGroup;
const portalObjects = []; 
let raycaster, mouse;

const loadingScreen = document.getElementById("loading-screen");
const mainHeader = document.querySelector(".main-header");
const contentContainer = document.querySelector(".content-container");

const clock = new THREE.Clock();
console.log("Variáveis globais e clock inicializados - DEBUG: Shaders Avançados - Simplificação Progressiva");

const portalVertexShader = `
uniform float time;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    // Animação no vértice mantida por enquanto
    pos.y += sin(pos.x * 2.0 + time * 0.8) * 0.05;
    pos.x += cos(pos.y * 2.0 + time * 0.6) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
console.log("portalVertexShader AVANÇADO (com animação de vértice) definido");

// Fragment Shader SIMPLIFICADO para depuração
const portalFragmentShader = `
uniform float time;
uniform vec3 portalColor;
uniform vec2 resolution;
varying vec2 vUv;

// Função de ruído Simplex 2D (placeholder)
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f); // Smoothstep
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
}

void main() {
    float t = time * 0.25;
    vec2 uv = vUv; // Usando vUv diretamente para simplificar

    // Teste 1: Cor sólida do uniform
    // gl_FragColor = vec4(portalColor, 1.0);

    // Teste 2: Cor sólida fixa
    // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // Magenta para teste

    // Teste 3: Adicionando apenas o 'time' e 'vUv' para ver se compila
    // gl_FragColor = vec4(vUv.x, vUv.y, sin(t), 1.0);

    // Teste 4: Reintroduzindo o cálculo de 'd' e 'plasma' simplificado
    float d = length(vUv * 2.0 - 1.0); // Distância do centro
    float plasma = noise(vUv * 3.5 + t * 0.6) * 0.5;
    // gl_FragColor = vec4(plasma, plasma, plasma, 1.0);

    // Teste 5: Reintroduzindo cor base com plasma
    // vec3 baseColor = portalColor * (0.4 + plasma * 0.9);
    // gl_FragColor = vec4(baseColor, 1.0);

    // Teste 6: Reintroduzindo rim light
    // float rim = pow(1.0 - smoothstep(0.0, 0.8, d), 2.0) * 1.5;
    // vec3 rimColorEffect = vec3(1.0, 1.0, 1.0) * rim * (0.6 + sin(t * 2.5 + d * 6.0) * 0.4);
    // vec3 colorWithRim = baseColor + rimColorEffect;
    // gl_FragColor = vec4(colorWithRim, 1.0);

    // Teste 7: Reintroduzindo Fresnel (verificar se 'position', 'normalMatrix', 'normal' estão disponíveis e corretos)
    // Precisa de 'position' e 'normal' como varyings do vertex shader se não forem built-in para fragment
    // Ou usar as globais se disponíveis e corretas para o fragment shader (cameraPosition, modelMatrix)
    // Para este teste, vamos simplificar e assumir que as globais funcionam, mas pode ser a fonte do erro.
    // vec3 viewDirection = normalize(cameraPosition - (modelMatrix * vec4(vPositionWorld, 1.0)).xyz); // vPositionWorld precisaria ser um varying
    // vec3 normal_world = normalize( (modelMatrix * vec4(vNormal, 0.0)).xyz ); // vNormal precisaria ser um varying
    // float fresnel = pow(1.0 - abs(dot(viewDirection, normal_world)), 3.5);
    // fresnel *= 1.5;
    // vec3 finalColorWithFresnel = colorWithRim + fresnel * portalColor * 0.6;
    // gl_FragColor = vec4(finalColorWithFresnel, 1.0);

    // Teste FINAL com alfa (simplificado, sem fresnel por enquanto para isolar)
    vec3 baseColor = portalColor * (0.4 + plasma * 0.9);
    float rim = pow(1.0 - smoothstep(0.0, 0.8, d), 2.0) * 1.5;
    vec3 rimColorEffect = vec3(1.0, 1.0, 1.0) * rim * (0.6 + sin(t * 2.5 + d * 6.0) * 0.4);
    vec3 finalColor = baseColor + rimColorEffect;
    float alpha = smoothstep(0.05, 0.75, d) * (0.5 + plasma * 0.5); // Sem fresnel no alfa por enquanto
    alpha = clamp(alpha, 0.15, 1.0);
    gl_FragColor = vec4(finalColor, alpha);

    // Se tudo acima falhar, voltar para o mais simples:
    // gl_FragColor = vec4(portalColor, 1.0); 
}
`;
console.log("portalFragmentShader AVANÇADO (SIMPLIFICADO PARA DEBUG) definido");


function init() {
    console.log("Função init iniciada (DEBUG: Shaders Avançados - Simplificação Progressiva)");
    try {
        const container = document.getElementById("threejs-container");
        if (!container) throw new Error("Container Three.js não encontrado.");
        console.log("Container encontrado");

        scene = new THREE.Scene();
        console.log("Scene criada");
        scene.background = new THREE.Color(0x050510);
        scene.fog = new THREE.FogExp2(0x050510, 0.025);
        console.log("Background e fog da cena definidos");

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 9);
        console.log("Camera criada e posicionada");

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        container.appendChild(renderer.domElement);
        console.log("Renderer criado e adicionado ao DOM");

        const ambientLight = new THREE.AmbientLight(0x605080, 0.6);
        scene.add(ambientLight);
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight1.position.set(5, 10, 7);
        scene.add(dirLight1);
        const dirLight2 = new THREE.DirectionalLight(0x88aaff, 0.3);
        dirLight2.position.set(-5, -5, -5);
        scene.add(dirLight2);
        console.log("Luzes adicionadas");

        hubGroup = new THREE.Group();
        scene.add(hubGroup);
        console.log("HubGroup criado e adicionado à cena");

        const portalData = [
            { name: "sobre", color: new THREE.Color(0.9, 0.1, 0.9), position: new THREE.Vector3(-4.5, 1.5, 0), targetSection: "sobre-content" },
            { name: "projetos", color: new THREE.Color(0.1, 0.7, 0.9), position: new THREE.Vector3(0, 2.8, -2.5), targetSection: "projetos-content" },
            { name: "habilidades", color: new THREE.Color(0.9, 0.9, 0.1), position: new THREE.Vector3(4.5, 1.5, 0), targetSection: "habilidades-content" },
            { name: "contato", color: new THREE.Color(0.1, 0.9, 0.2), position: new THREE.Vector3(0, 0.2, 2.5), targetSection: "contato-content" },
        ];
        console.log("portalData definido:", portalData);

        portalData.forEach((data, index) => {
            console.log(`Criando portal ${index}: ${data.name} com ShaderMaterial AVANÇADO (DEBUG)`);
            const geometry = new THREE.SphereGeometry(1.0, 64, 64);
            const material = new THREE.ShaderMaterial({
                vertexShader: portalVertexShader,
                fragmentShader: portalFragmentShader,
                uniforms: {
                    time: { value: 0.0 },
                    portalColor: { value: data.color }, 
                    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
                },
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false 
            });
            const portal = new THREE.Mesh(geometry, material);
            portal.position.copy(data.position);
            console.log(`Portal ${data.name} posicionado`);
            portal.userData = { 
                name: data.name, 
                targetSection: data.targetSection,
                baseScale: new THREE.Vector3(1,1,1),
                hoverScale: new THREE.Vector3(1.15, 1.15, 1.15)
            };
            hubGroup.add(portal);
            portalObjects.push(portal);
            console.log(`Portal ${data.name} adicionado ao hubGroup e portalObjects.`);
        });
        console.log("Todos os portais criados com ShaderMaterial AVANÇADO (DEBUG) e adicionados ao hubGroup.");

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        console.log("Raycaster e mouse inicializados");

        window.addEventListener("resize", onWindowResize);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("click", onClickPortal);
        console.log("Event listeners adicionados");

        if (loadingScreen) {
            console.log("Escondendo loading screen...");
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                if(loadingScreen) loadingScreen.style.display = "none";
                if (mainHeader) mainHeader.classList.remove("is-hidden");
                console.log("Loading screen escondido, header visível.");
            }, 500);
        }
        console.log("Three.js inicializado com sucesso (DEBUG: Shaders Avançados - Simplificação Progressiva).");
        animate();

    } catch (error) {
        console.error("Erro fatal durante a inicialização do Three.js (DEBUG: Shaders Avançados - Simplificação Progressiva):", error);
        if (loadingScreen) {
            const errorP = document.getElementById("loading-error") || document.createElement("p");
            errorP.id = "loading-error";
            errorP.textContent = `Erro crítico: ${error.message}. Verifique o console (F12).`;
            errorP.style.color = "red";
            errorP.style.display = "block";
            if (!document.getElementById("loading-error")) loadingScreen.appendChild(errorP);
            loadingScreen.style.opacity = "1"; 
            loadingScreen.style.display = "flex";
        }
    }
    console.log("Função init finalizada (DEBUG: Shaders Avançados - Simplificação Progressiva)");
}

function onWindowResize() {
    if (!camera || !renderer ) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    portalObjects.forEach(portal => {
        if (portal.material.uniforms && portal.material.uniforms.resolution) {
            portal.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        }
    });
    console.log("Janela redimensionada");
}

let intersectedObject = null;

function onMouseMove(event) {
    if (!raycaster || !camera || !portalObjects || portalObjects.length === 0) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(portalObjects);

    if (intersects.length > 0) {
        if (intersectedObject !== intersects[0].object) {
            if (intersectedObject) {
                gsap.to(intersectedObject.scale, { 
                    x: intersectedObject.userData.baseScale.x,
                    y: intersectedObject.userData.baseScale.y,
                    z: intersectedObject.userData.baseScale.z,
                    duration: 0.4, ease: "power2.out" 
                });
            }
            intersectedObject = intersects[0].object;
            gsap.to(intersectedObject.scale, { 
                x: intersectedObject.userData.hoverScale.x,
                y: intersectedObject.userData.hoverScale.y,
                z: intersectedObject.userData.hoverScale.z,
                duration: 0.3, ease: "back.out(1.7)" 
            });
            document.body.style.cursor = "pointer";
        }
    } else {
        if (intersectedObject) {
            gsap.to(intersectedObject.scale, { 
                x: intersectedObject.userData.baseScale.x,
                y: intersectedObject.userData.baseScale.y,
                z: intersectedObject.userData.baseScale.z,
                duration: 0.4, ease: "power2.out" 
            });
            intersectedObject = null;
            document.body.style.cursor = "default";
        }
    }
}

function onClickPortal(event) {
    if (intersectedObject) {
        console.log("Clicou no portal:", intersectedObject.userData.name);
        navigateToSection(intersectedObject.userData.targetSection, intersectedObject.position);
    }
}

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetPortal = portalObjects.find(p => p.userData.name === targetId);
        if (targetPortal) {
            navigateToSection(targetPortal.userData.targetSection, targetPortal.position);
        } else if (targetId === "hub") {
            navigateToHub();
        }
    });
});

function navigateToSection(sectionId, portalPosition) {
    if (!camera || !gsap || !contentContainer || !hubGroup) return;
    console.log(`Navegando para seção: ${sectionId}`);
    gsap.to(camera.position, {
        x: portalPosition.x * 0.6, 
        y: portalPosition.y,
        z: portalPosition.z + 3.5, 
        duration: 2.0,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(portalPosition),
        onComplete: () => {
            if (contentContainer) contentContainer.classList.add("is-visible");
            document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("is-active"));
            const targetContent = document.getElementById(sectionId);
            if (targetContent) targetContent.classList.add("is-active");
            navLinks.forEach(nav => nav.classList.remove("active"));
            const portalUserDataName = portalObjects.find(p=>p.userData.targetSection === sectionId)?.userData.name;
            if (portalUserDataName) {
                const activeLink = document.querySelector(`.nav-links a[data-target="${portalUserDataName}"]`);
                if(activeLink) activeLink.classList.add("active");
            }
            console.log(`Navegação para ${sectionId} completa.`);
        }
    });
    gsap.to(hubGroup.rotation, {y: hubGroup.rotation.y + Math.PI * 0.15, duration: 2.0, ease: "power3.inOut"});
    gsap.to(hubGroup.scale, { x:0.001, y:0.001, z:0.001, duration: 1.5, ease: "power3.in" });
}

function navigateToHub() {
    if (!camera || !gsap || !contentContainer || !scene || !hubGroup) return;
    console.log("Navegando para o Hub Central");
    if (contentContainer) contentContainer.classList.remove("is-visible");
    document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("is-active"));
    gsap.to(camera.position, {
        x: 0,
        y: 1.5,
        z: 9,
        duration: 2.0,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(scene.position)
    });
    gsap.to(hubGroup.scale, { x:1, y:1, z:1, duration: 1.5, ease: "power3.out", delay: 0.5 });
    navLinks.forEach(nav => nav.classList.remove("active"));
    const hubLink = document.querySelector(".nav-links a[data-target=\'hub\"]");
    if(hubLink) hubLink.classList.add("active");
    console.log("Navegação para o Hub Central completa.");
}

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    portalObjects.forEach(portal => {
        portal.rotation.y += 0.0010;
        portal.rotation.x += 0.0005;
        if (portal.material.uniforms && portal.material.uniforms.time) {
            portal.material.uniforms.time.value = elapsedTime;
        }
    });
    
    if(hubGroup) hubGroup.rotation.y += 0.00015;

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    } else {
        console.warn("Renderer, scene ou camera não definidos no loop de animação.");
    }
}

console.log("Script main.js carregado (DEBUG: Shaders Avançados - Simplificação Progressiva), aguardando DOMContentLoaded ou executando init...");
if (document.readyState === "loading") {
    console.log("DOM ainda carregando, adicionando listener para DOMContentLoaded.");
    document.addEventListener("DOMContentLoaded", init);
} else {
    console.log("DOM já carregado, executando init diretamente.");
    init();
}

