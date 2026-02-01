import { MatrixEffect } from './matrix';
import { TiltEffect } from './tilt';

export function renderContent(choice: 'red' | 'blue') {
    const main = document.getElementById('main-content');
    if (!main) return;

    if (choice === 'red') {
        main.innerHTML = `
            <div id="hud-container">
                <header class="hud-header">
                    <div class="hud-title">SYS_ADMIN: KELVIN MORAES</div>
                    <div class="hud-status">
                         <span>SECURE CONN</span>
                         <div class="status-light"></div>
                    </div>
                </header>
                
                <div class="hud-grid" style="grid-template-columns: 250px 1fr 250px;">
                    <!-- LEFT PANEL: STACK -->
                    <aside class="panel">
                        <div class="panel-header">SYSTEM KERNEL // STACK LAYERS</div>
                        <div class="panel-content">
                            <!-- LAYER 1: BACKEND -->
                            <div class="stack-layer">
                                <div class="layer-title">BACKEND PROTOCOLS</div>
                                <div class="layer-items">
                                    <span>Python</span> <span>Node.js</span> <span>PHP</span>
                                    <span>REST APIs</span> <span>Auth Services</span>
                                </div>
                            </div>

                            <!-- LAYER 2: FRONTEND -->
                            <div class="stack-layer">
                                <div class="layer-title">INTERFACE SUBSYSTEMS</div>
                                <div class="layer-items">
                                    <span>React</span> <span>TypeScript</span> <span>State Management</span>
                                    <span>API Consumption</span>
                                </div>
                            </div>

                            <!-- LAYER 3: INFRA -->
                            <div class="stack-layer">
                                <div class="layer-title">INFRASTRUCTURE</div>
                                <div class="layer-items">
                                    <span>Linux (Debian/Ubuntu)</span> <span>VPS Management</span>
                                    <span>Automated Deploy</span> <span>Docker</span>
                                </div>
                            </div>

                            <!-- LAYER 4: DATABASE -->
                            <div class="stack-layer">
                                <div class="layer-title">DATA PERSISTENCE</div>
                                <div class="layer-items">
                                    <span>MySQL</span> <span>PostgreSQL</span>
                                    <span>Relational Modeling</span> <span>Query Opt</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- CENTER PANEL: PROJECTS -->
                    <main class="panel">
                        <div class="panel-header">ACTIVE OPERATIONS // PROJECT DEPLOYMENTS</div>
                        <div class="panel-content">
                            
                            <!-- PROJECT 1 -->
                            <div class="module-card">
                                <div class="module-header">
                                    <h3 class="module-title">KERUBIN_AI</h3>
                                    <span style="font-size: 0.7rem; color: #666; border: 1px solid #666; padding: 2px 5px;">PROD v2.4</span>
                                </div>
                                <div class="module-context">
                                    Virtual Assistant for Enterprise Automation. Designed to reduce manual workflow latency by 40%.
                                </div>

                                <div class="module-section">
                                    <div class="section-label">CORE STACK</div>
                                    <div>
                                        <span class="tech-tag">Python</span>
                                        <span class="tech-tag">PyQt</span>
                                        <span class="tech-tag">NLP</span>
                                    </div>
                                </div>

                                <div class="module-section">
                                    <div class="section-label">RESPONSIBILITY & ARCHITECTURE</div>
                                    <div class="section-content">
                                        Designed the modular plugin system allowing dynamic loading of new capabilities without core recompilation. Implemented the event loop management for non-blocking UI during heavy processing.
                                    </div>
                                </div>

                                <div class="module-section">
                                    <div class="section-label">CRITICAL CHALLENGES</div>
                                    <div class="section-content">
                                        Addressed significant memory leaks in long-running sessions by implementing custom garbage collection triggers and strict object lifecycle management.
                                    </div>
                                </div>
                            </div>

                            <!-- PROJECT 2 -->
                            <div class="module-card">
                                <div class="module-header">
                                    <h3 class="module-title">GAME_DEV_LAB</h3>
                                    <span style="font-size: 0.7rem; color: #666; border: 1px solid #666; padding: 2px 5px;">RESEARCH</span>
                                </div>
                                <div class="module-context">
                                    Custom Physics Engine for Indipendent Game Development. Focus on deterministic simulation.
                                </div>

                                <div class="module-section">
                                    <div class="section-label">CORE STACK</div>
                                    <div>
                                        <span class="tech-tag">C++</span>
                                        <span class="tech-tag">OpenGL</span>
                                        <span class="tech-tag">Lua Scripting</span>
                                    </div>
                                </div>

                                <div class="module-section">
                                    <div class="section-label">DECISIONS & TRADE-OFFS</div>
                                    <div class="section-content">
                                        Chose manual memory pooling over standard allocation to prevent frame-time spikes. Trade-off: increased complexity in entity destruction logic but achieved stable 144Hz.
                                    </div>
                                </div>
                            </div>

                            <!-- PROJECT 3 -->
                            <div class="module-card">
                                <div class="module-header">
                                    <h3 class="module-title">OMEGA_DASHBOARD</h3>
                                    <span style="font-size: 0.7rem; color: #666; border: 1px solid #666; padding: 2px 5px;">SAAS ANALYTICS</span>
                                </div>
                                <div class="module-context">
                                    High-throughput Real-Time Dashboard for distributed microservices. Engineered to handle 10k+ concurrent socket connections.
                                </div>

                                <div class="module-section">
                                    <div class="section-label">CORE STACK</div>
                                    <div>
                                        <span class="tech-tag">React</span>
                                        <span class="tech-tag">Node.js</span>
                                        <span class="tech-tag">Redis</span>
                                        <span class="tech-tag">WebSockets</span>
                                    </div>
                                </div>

                                <div class="module-section">
                                    <div class="section-label">CRITICAL CHALLENGES</div>
                                    <div class="section-content">
                                        Preventing main-thread blocking during massive data ingestion spikes. Implemented Redis Pub/Sub decoupling to offload processing from the socket gateway.
                                    </div>
                                </div>

                                <div class="module-section">
                                    <div class="section-label">DECISIONS & TRADE-OFFS</div>
                                    <div class="section-content">
                                        Implemented Optimistic UI for immediate feedback, accepting occasional state rollback complexity to guarantee perceived zero-latency for end users.
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>

                    <!-- RIGHT PANEL: PRODUCTION LOGS -->
                    <aside class="panel">
                        <div class="panel-header">PRODUCTION EXPERIENCE // LOGS</div>
                        <div class="panel-content">
                            <div class="log-entry production">
                                <span class="timestamp">[SERVER_ADMIN]</span> 
                                <span class="log-msg" style="color: #fff;">VPS Management</span><br>
                                <span style="font-size: 0.65rem; color: #888;">Complete administration of Linux environment hosting multiple corporate clients. Configuration of Nginx reverse proxies and SSL auto-renewal.</span>
                            </div>

                            <div class="log-entry production" style="margin-top: 1rem;">
                                <span class="timestamp">[DEPLOY_OPS]</span> 
                                <span class="log-msg" style="color: #fff;">CI/CD Pipeline</span><br>
                                <span style="font-size: 0.65rem; color: #888;">Automated deployment workflows involving testing, build optimization, and zero-downtime switchover scripts.</span>
                            </div>

                            <div class="log-entry production" style="margin-top: 1rem;">
                                <span class="timestamp">[INCIDENT_REP]</span> 
                                <span class="log-msg" style="color: #fff;">Database Optimization</span><br>
                                <span style="font-size: 0.65rem; color: #888;">Resolved critical query bottlenecks in production MySQL instances, reducing average load time from 2s to 200ms via indexing strategies.</span>
                            </div>
                            
                            <br>
                            <div style="font-size: 0.7rem; opacity: 0.5; margin-top: 2rem;">
                                > GITHUB REPO: <a href="https://github.com/KerubinDev" target="_blank" style="color: var(--acc-red);">KerubinDev</a><br>
                                > LINKEDIN: <a href="https://www.linkedin.com/in/kelvin-moraes-1620043a4/" target="_blank" style="color: var(--acc-red);">Kelvin Moraes</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            
            <button id="back-btn" class="back-btn" style="position: fixed; top: 1rem; right: 1rem; left: auto; border-color: var(--acc-red); color: var(--acc-red);">CLOSE SYSTEM</button>
            <canvas id="matrix-canvas" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; opacity: 0.15;"></canvas>
        `;

        // Initialize Matrix Rain (Background)
        setTimeout(() => new MatrixEffect('matrix-canvas'), 100);

    } else {
        main.innerHTML = `
            <button id="back-btn" class="back-btn">← INDEX</button>
            <div class="design-container">
                <nav class="design-nav">
                    <div class="brand">KERUBIN.</div>
                    <div style="font-size: 0.8rem; letter-spacing: 2px;">PORTFOLIO 2026</div>
                </nav>
                
                <header class="design-hero">
                    <h1 class="reveal-text">DESIGN<br>EXPONENCIAL.</h1>
                    <p>Visual Strategy & Creative Engineering</p>
                </header>

                <div class="competencies-section">
                    <div class="competencies-title">STRATEGIC CAPABILITIES</div>
                    <div class="competencies-grid">
                        <!-- CAPABILITY 1 -->
                        <div class="capability-card tilt-card">
                            <span class="cap-icon">01</span>
                            <h3 class="cap-title">Graphic Design Pro</h3>
                            <ul class="cap-list">
                                <li>Adobe Suite Mastery (Ps, Ai, Id)</li>
                                <li>Visual Composition & Hierarchy</li>
                                <li>Brand Identity Systems</li>
                                <li>Editorial Layout & Diagramming</li>
                            </ul>
                        </div>

                        <!-- CAPABILITY 2 -->
                        <div class="capability-card tilt-card">
                            <span class="cap-icon">02</span>
                            <h3 class="cap-title">Cognitive Psychology</h3>
                            <ul class="cap-list">
                                <li>Perception & Attention Management</li>
                                <li>Cognitive Load Optimization</li>
                                <li>Visual Persuasion Triggers</li>
                                <li>User Decision Architectures</li>
                            </ul>
                        </div>

                        <!-- CAPABILITY 3 -->
                        <div class="capability-card tilt-card">
                            <span class="cap-icon">03</span>
                            <h3 class="cap-title">UI/UX Architecture</h3>
                            <ul class="cap-list">
                                <li>Process-Driven UX (Not just Art)</li>
                                <li>Flow & Friction Reduction</li>
                                <li>Semantic Clarity</li>
                                <li>Error Prevention Protocols</li>
                            </ul>
                        </div>

                        <!-- CAPABILITY 4 -->
                        <div class="capability-card tilt-card">
                            <span class="cap-icon">04</span>
                            <h3 class="cap-title">Product Oriented</h3>
                            <ul class="cap-list">
                                <li>Design-Code Coherence</li>
                                <li>Scalability & Maintenance</li>
                                <li>Technical Feasibility Analysis</li>
                                <li>Business Impact Focus</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="work-grid">
                    <article class="work-card tilt-card" style="--i:1">
                        <span class="card-tag">BRANDING & STRATEGY</span>
                        <h3>Psicologia Visual</h3>
                        <p>Branding estratégico para saúde mental. Criação de uma linguagem visual que une acolhimento e profissionalismo, validada em templates de alta conversão.</p>
                    </article>

                    <article class="work-card tilt-card" style="--i:2">
                        <span class="card-tag">RESEARCH PAPER</span>
                        <h3>Sintofilia</h3>
                        <p>Análise crítica da interação afetiva Humano-IA. Um estudo sobre o futuro das conexões digitais, publicado como referência acadêmica.</p>
                    </article>

                    <article class="work-card tilt-card" style="--i:3">
                        <span class="card-tag">CREATIVE STACK</span>
                        <h3>Ferramentas</h3>
                        <p>Photoshop • Illustrator • InDesign<br>Figma • Motion Graphics • UI/UX</p>
                    </article>
                </div>
            </div>
        `;

        // Initialize Tilt Effect
        setTimeout(() => new TiltEffect('.tilt-card'), 100);
    }
}
