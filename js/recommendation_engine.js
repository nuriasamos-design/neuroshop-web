/**
 * MOTOR DE RECOMENDACIÓN NEUROSHOT 3.0
 * Conecta herramientas existentes con bibliotecas multimedia
 * Lógica condicional automática basada en reglas
 */

class RecommendationEngine {
    constructor() {
        this.database = null;
        this.knowledgeGraph = null;
        this.activeRules = [];
        this.init();
    }

    async init() {
        // Cargar bases de datos
        await this.loadDatabases();

        // Inicializar listeners
        this.setupEventListeners();

        console.log('✅ Motor de Recomendación inicializado');
    }

    async loadDatabases() {
        try {
            // Cargar base de datos unificada
            const dbResponse = await fetch('../Data/database_unificada.json');
            this.database = await dbResponse.json();

            // Cargar grafo de conocimiento
            const kgResponse = await fetch('../Data/knowledge_graph.json');
            this.knowledgeGraph = await kgResponse.json();

            // Cargar reglas activas
            this.activeRules = this.database.motor_recomendacion.reglas_interaccion;

        } catch (error) {
            console.error('❌ Error cargando bases de datos:', error);
        }
    }

    setupEventListeners() {
        // Listener para cambios en el diario
        document.addEventListener('diario:updated', (e) => {
            this.checkDiarioRules(e.detail);
        });

        // Listener para análisis SCATT
        document.addEventListener('scatt:analyzed', (e) => {
            this.checkSCATTRules(e.detail);
        });

        // Listener para temporizador
        document.addEventListener('timer:pre_start', (e) => {
            this.checkTimerRules(e.detail);
        });

        // Listener para análisis de agrupaciones
        document.addEventListener('grouping:analyzed', (e) => {
            this.checkGroupingRules(e.detail);
        });

        // Listener para matriz de crisis
        document.addEventListener('crisis:detected', (e) => {
            this.checkCrisisRules(e.detail);
        });

        // Listener para calculadora de volumen
        document.addEventListener('volume:alert', (e) => {
            this.checkVolumeRules(e.detail);
        });
    }

    // ==================== REGLA 001: DIARIO → AUDIO (ANSIEDAD ALTA) ====================
    checkDiarioRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA001');

        if (data.ansiedad > 7) {
            const audio = this.getResourceById('AUD001');

            this.showMandatoryModal({
                title: rule.accion.titulo,
                message: rule.accion.mensaje.replace('{valor}', data.ansiedad),
                resource: audio,
                allowSkip: rule.accion.permitir_saltar,
                priority: rule.prioridad
            });
        }
    }

    // ==================== REGLA 002: SCATT → VIDEO (GATILLAZO) ====================
    checkSCATTRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA002');

        if (data.caida_brusca_rt_ultimos_0_2s) {
            const video = this.getResourceById('VID001');
            const infografia = this.getResourceById('INF004');

            this.showRecetaDelDia({
                title: rule.accion.titulo,
                message: rule.accion.mensaje,
                resources: [video, infografia],
                drills: rule.accion.drills_sugeridos
            });
        }
    }

    // ==================== REGLA 003: TEMPORIZADOR → AUDIO (ENERGÍA BAJA) ====================
    checkTimerRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA003');

        if (data.nivel_energia < 4) {
            const audio = this.getResourceById('AUD002');

            this.showQuestionModal({
                title: rule.accion.titulo,
                message: rule.accion.mensaje,
                resource: audio,
                allowSkip: rule.accion.permitir_saltar
            });
        }
    }

    // ==================== REGLA 004: AGRUPACIONES → VIDEO (ERROR VERTICAL) ====================
    checkGroupingRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA004');

        if (data.desviacion_vertical > data.desviacion_horizontal) {
            this.showRecommendation({
                title: rule.accion.titulo,
                message: rule.accion.mensaje,
                resources: rule.accion.recursos_recomendados,
                drills: rule.accion.drills_sugeridos
            });
        }
    }

    // ==================== REGLA 005: CRISIS → PROTOCOLO VETO ====================
    checkCrisisRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA005');

        if (data.pulso_alto && data.pensamiento_rumiante) {
            const audio = this.getResourceById('AUD004');

            this.showCrisisProtocol({
                title: rule.accion.titulo,
                message: rule.accion.mensaje,
                resource: audio,
                instructions: rule.accion.instrucciones,
                priority: 'CRÍTICA'
            });
        }
    }

    // ==================== REGLA 006: VOLUMEN → ALERTA BURNOUT ====================
    checkVolumeRules(data) {
        const rule = this.activeRules.find(r => r.id === 'REGLA006');

        if (data.media_activacion_3dias > 8) {
            this.alertCoach({
                title: rule.accion.titulo,
                message: rule.accion.mensaje.replace('{nombre}', data.athlete_name),
                action: rule.accion.accion_automatica,
                priority: 'CRÍTICA'
            });
        }
    }

    // ==================== UTILIDADES ====================
    getResourceById(id) {
        // Buscar en videoteca
        const video = this.database.bibliotecas.videoteca_tecnica.videos.find(v => v.id === id);
        if (video) return { ...video, type: 'video' };

        // Buscar en laboratorio mental
        const audio = this.database.bibliotecas.laboratorio_mental.audios.find(a => a.id === id);
        if (audio) return { ...audio, type: 'audio' };

        // Buscar en mapas mentales
        const infografia = this.database.bibliotecas.mapas_mentales.infografias.find(i => i.id === id);
        if (infografia) return { ...infografia, type: 'infografia' };

        return null;
    }

    // ==================== MODALES Y NOTIFICACIONES ====================
    showMandatoryModal({ title, message, resource, allowSkip, priority }) {
        const modal = document.createElement('div');
        modal.className = 'neuroshot-modal mandatory';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content priority-${priority.toLowerCase()}">
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                    <div class="resource-player">
                        ${this.renderResourcePlayer(resource)}
                    </div>
                </div>
                <div class="modal-footer">
                    ${allowSkip ? '<button class="btn-secondary" onclick="this.closest(\'.neuroshot-modal\').remove()">Saltar</button>' : ''}
                    <button class="btn-primary" onclick="this.closest('.neuroshot-modal').remove()">Entendido</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bloquear scroll si es obligatorio
        if (!allowSkip) {
            document.body.style.overflow = 'hidden';
        }
    }

    showRecetaDelDia({ title, message, resources, drills }) {
        const receta = document.createElement('div');
        receta.className = 'receta-del-dia';
        receta.innerHTML = `
            <div class="receta-header">
                <h3>${title}</h3>
                <button class="close-btn" onclick="this.closest('.receta-del-dia').remove()">×</button>
            </div>
            <div class="receta-body">
                <p>${message}</p>
                <div class="recursos-recomendados">
                    <h4>📚 Recursos Recomendados:</h4>
                    ${resources.map(r => this.renderResourceCard(r)).join('')}
                </div>
                ${drills ? `
                    <div class="drills-sugeridos">
                        <h4>🎯 Drills Sugeridos:</h4>
                        <ul>
                            ${drills.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Añadir al dashboard del atleta
        const dashboard = document.getElementById('athlete-dashboard');
        if (dashboard) {
            dashboard.insertBefore(receta, dashboard.firstChild);
        }
    }

    showQuestionModal({ title, message, resource, allowSkip }) {
        const modal = document.createElement('div');
        modal.className = 'neuroshot-modal question';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.neuroshot-modal').remove()">No, gracias</button>
                    <button class="btn-primary" onclick="playResource('${resource.id}'); this.closest('.neuroshot-modal').remove()">Sí, activar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showCrisisProtocol({ title, message, resource, instructions, priority }) {
        const modal = document.createElement('div');
        modal.className = 'neuroshot-modal crisis';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content priority-critica">
                <div class="modal-header crisis-header">
                    <h2>🆘 ${title}</h2>
                </div>
                <div class="modal-body">
                    <p class="crisis-message">${message}</p>
                    <div class="crisis-instructions">
                        <h3>Protocolo de Veto:</h3>
                        <ol>
                            ${instructions.map(inst => `<li>${inst}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="resource-player">
                        ${this.renderResourcePlayer(resource)}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-danger" onclick="this.closest('.neuroshot-modal').remove()">Ejecutar Protocolo</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Auto-play del audio
        setTimeout(() => {
            const audio = modal.querySelector('audio');
            if (audio) audio.play();
        }, 500);
    }

    alertCoach({ title, message, action, priority }) {
        // Enviar notificación al dashboard del coach
        const event = new CustomEvent('coach:alert', {
            detail: {
                title,
                message,
                action,
                priority,
                timestamp: new Date().toISOString()
            }
        });

        document.dispatchEvent(event);

        // Si hay acción automática, ejecutarla
        if (action === 'reducir_volumen_40_porciento') {
            this.executeAutomaticVolumeReduction();
        }
    }

    executeAutomaticVolumeReduction() {
        console.log('🔧 Ejecutando reducción automática de volumen (40%)');
        // Lógica para reducir volumen en calculadora
        const event = new CustomEvent('volume:auto_reduce', {
            detail: { percentage: 0.4 }
        });
        document.dispatchEvent(event);
    }

    // ==================== RENDERIZADO ====================
    renderResourcePlayer(resource) {
        if (!resource) return '';

        switch (resource.type) {
            case 'audio':
                return `
                    <div class="audio-player">
                        <h4>🎧 ${resource.nombre}</h4>
                        <audio controls>
                            <source src="${this.database.bibliotecas.laboratorio_mental.ruta_base}${resource.archivo}" type="audio/mpeg">
                        </audio>
                        <p class="resource-description">${resource.descripcion}</p>
                        <span class="resource-duration">⏱️ ${resource.duracion}</span>
                    </div>
                `;

            case 'video':
                return `
                    <div class="video-player">
                        <h4>🎬 ${resource.nombre}</h4>
                        <video controls>
                            <source src="${this.database.bibliotecas.videoteca_tecnica.ruta_base}${resource.archivo}" type="video/mp4">
                        </video>
                        <p class="resource-description">${resource.descripcion}</p>
                        <span class="resource-duration">⏱️ ${resource.duracion}</span>
                    </div>
                `;

            case 'infografia':
                return `
                    <div class="infografia-viewer">
                        <h4>📊 ${resource.nombre}</h4>
                        <img src="${this.database.bibliotecas.mapas_mentales.ruta_base}${resource.archivo}" alt="${resource.nombre}">
                        <p class="resource-description">${resource.descripcion}</p>
                    </div>
                `;

            default:
                return '';
        }
    }

    renderResourceCard(resource) {
        return `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-icon">
                    ${resource.type === 'video' ? '🎬' : resource.type === 'audio' ? '🎧' : '📊'}
                </div>
                <div class="resource-info">
                    <h5>${resource.nombre}</h5>
                    <p>${resource.descripcion}</p>
                    <span class="resource-duration">${resource.duracion || ''}</span>
                </div>
                <button class="btn-play" onclick="playResource('${resource.id}')">▶️ Reproducir</button>
            </div>
        `;
    }
}

// Función global para reproducir recursos
function playResource(resourceId) {
    const engine = window.neuroshotEngine;
    const resource = engine.getResourceById(resourceId);

    if (!resource) {
        console.error('Recurso no encontrado:', resourceId);
        return;
    }

    // Crear modal de reproducción
    engine.showMandatoryModal({
        title: resource.nombre,
        message: resource.descripcion,
        resource: resource,
        allowSkip: true,
        priority: 'MEDIA'
    });
}

// Inicializar motor al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    window.neuroshotEngine = new RecommendationEngine();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecommendationEngine;
}
