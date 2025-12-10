/**
 * NEUROSHOT SESSION DB v4.0 (DEEP AUDIT EDITION)
 * Centralized Knowledge Base & Methodological Templates
 * Standards: ISSF / RFEDETO / Buceta Methodology
 */

window.NEUROSHOT_DB = {
    // --- 1. MENTAL TOOLS (Psychological Resources) ---
    mental_tools: [
        {
            id: "M01",
            name: "Protocolo de Respiración 4-7-8 (Dr. Weil)",
            type: "regulation",
            file: "media/respiracion_4_7_8.mp3",
            trigger: { anxiety_min: 7, energy_any: true },
            desc: "Técnica para activar el nervio vago y reducir cortisol. Inhala 4s, retén 7s, exhala 8s. Úsalo ante taquicardia o 'ruido mental' excesivo.",
            tags: ["ansiedad", "fisiologia", "parasimpatico"]
        },
        {
            id: "M02",
            name: "Activación Neuroplástica (Saltos + Visión)",
            type: "activation",
            file: "media/activacion_neuro.mp4",
            trigger: { anxiety_max: 4, energy_max: 5 },
            desc: "Combate la 'Apatía Competitiva'. Saltos explosivos para despertar el SNC combinados con cambios de enfoque visual lejos-cerca.",
            tags: ["apatia", "activacion", "snc"]
        },
        {
            id: "M03",
            name: "Visualización VMBR (Suinn)",
            type: "visualization",
            file: "media/visualizacion_avanzada.mp3",
            trigger: { anxiety_max: 6, energy_min: 6 },
            desc: "Visu-Motor Behavior Rehearsal. Práctica imaginada multisensorial (peso del arma, tacto, sonido) para mielinizar circuitos sin gasto físico.",
            tags: ["flow", "tecnica_mental", "vmbr"]
        },
        {
            id: "M04",
            name: "Protocolo de Veto (STOP)",
            type: "crisis",
            file: "media/protocolo_veto.mp3",
            trigger: { crisis_mode: true },
            desc: "CRISIS DETECTADA (Pánico/Bloqueo). 1. BAJAR ARMA. 2. SALIR DEL PUESTO. 3. BEBER AGUA. 4. ROMPER EL BUCLE.",
            tags: ["crisis", "bloqueo", "urgencia"]
        },
        {
            id: "M05",
            name: "Relajación Progresiva (Jacobson)",
            type: "recovery",
            file: "media/jacobson_guia.mp3",
            trigger: { tiredness_min: 8 },
            desc: "Escaneo corporal para detectar y soltar tensiones residuales post-entreno. Clave para la recuperación muscular y mental.",
            tags: ["recuperacion", "descanso"]
        },
        {
            id: "M06",
            name: "Reestructuración Cognitiva (TCC)",
            type: "cognitive",
            file: "media/reestructuracion.pdf",
            trigger: { anxiety_min: 5, context: "negative_thoughts" },
            desc: "Transformar pensamientos limitantes ('Hoy no le doy a nada') en instrucciones operativas ('Foco en las miras, dedo suave').",
            tags: ["pensamientos", "tcc"]
        }
    ],

    // --- 2. TECHNICAL DRILLS (The "Heavy" Work - NO AMATEUR STUFF) ---
    drills: {
        warmup_phys: [
            { name: "Movilidad Articular Completa", desc: "Cuello, Hombros (manguito rotador), Codos, Muñecas, Cadera. 10 min." },
            { name: "Bandas Elásticas (Activación)", desc: "Retracciones escapulares y rotaciones externas. Baja carga." },
            { name: "Propiocepción de Tobillos", desc: "Equilibrio monopodal 30s/pierna. Base de sustentación." },
            { name: "Estiramiento Dinámico Antebrazo", desc: "Flexores y extensores sin forzar. Preparación del agarre." }
        ],
        dry_fire: [
            { name: "Holding (Sostenimiento) - Muro", desc: "10 reps x 45s. Foco: Estabilidad del arco de movimiento y tono muscular isométrico." },
            { name: "Disparo a Muro Blanco (Sin Luces)", desc: "30 reps. Foco: Sensación pura del disparador sin distraerse con la puntería." },
            { name: "Entradas y Salidas (Lift & Settle)", desc: "20 reps. Foco: Llegada perfecta a zona de puntería con miras alineadas." },
            { name: "Análisis de Miras (Sight Picture)", desc: "15 min. Foco: Mantener el foco en el punto de mira durante 10s tras el *click*." },
            { name: "Simulacro de Final (Con Tiempos)", desc: "Series de 5 disparos en 250s (Aire) o RyF. Presión temporal." },
            { name: "Trabajo de Dedo Aislado", desc: "Pistola apoyada en mesa. Solo mover el índice sin alterar miras." }
        ],
        live_fire_precision: [
            { name: "Agrupación en Blanco Vuelto", vol: 20, desc: "Sin referencias de puntuación. Solo agrupar. Olvida el 10." },
            { name: "Tiro a Banda Vertical", vol: 15, desc: "Blanco modificado. Foco: Alineación lateral y presión del gatillo sin arrastres." },
            { name: "Tiro a Banda Horizontal", vol: 15, desc: "Blanco modificado. Foco: Control de altura y respiración (puntos naturales)." },
            { name: "Precisión Pura (Deep Work)", vol: 40, desc: "Ritmo lento. Análisis exhaustivo de cada disparo (canting, grip, follow-through)." },
            { name: "Llamada del Disparo (Calling)", vol: 30, desc: "Anotar dónde crees que ha ido antes de mirar el monitor." },
            { name: "Tiro sobre Puntos Derivados", vol: 20, desc: "Apuntar al 5 a las 6, buscar el 10 central. Ajuste de miras." }
        ],
        live_fire_dynamic: [
            { name: "Series de 10 segundos", vol: 20, desc: "Coger miras y disparar en <10s. Decisión y agresividad controlada." },
            { name: "Simulacro Competición (60)", vol: 60, desc: "Match completo sin interrupciones. Condiciones ISSF estrictas." },
            { name: "Primer Disparo (First Shot)", vol: 15, desc: "Salir del puesto, entrar, cargar y disparar 1 solo tiro al 10. Repetir." },
            { name: "Duelos (Virtuales)", vol: 20, desc: "Competir contra tu propio promedio. Si bajas de 9.5, repites la serie." }
        ],
        finals: [
            { name: "Final Olímpica (Eliminación)", desc: "Estructura oficial ISSF 2024. Series de 5 + Disparos únicos. Música alta." },
            { name: "Shoot-Off (Muerte Súbita)", desc: "Un solo disparo. Carga cognitiva máxima. Todo o nada." },
            { name: "Final a la Inversa", desc: "Empiezas con 'ventaja' y debes mantenerla. Gestión de la aversión a la pérdida." }
        ]
    },

    // --- 3. CHECKLISTS (ISSF/RFEDETO) ---
    checklists: {
        viaje: [
            "Licencia Federativa (En vigor)",
            "Guía de Pertenencia del Arma",
            "DNI / Pasaporte",
            "Billete Avión/Tren",
            "Reserva Hotel",
            "Caja de Seguridad (Normativa Aérea)",
            "Herramientas (Llaves Allen, Destornillador)",
            "Ropa de Competición (Reglamentaria)",
            "Zapatillas de Tiro (Suela plana)"
        ],
        puesto_tiro: [
            "Arma (Revisar aire/munición)",
            "Gafas de Tiro (Filtros limpios)",
            "Protectores Auditivos (Electrónicos/Tapones)",
            "Balines (Lote seleccionado/pesado)",
            "Toalla pequeña (Sudor/Grip)",
            "Cronómetro (Si no hay monitor)",
            "Botella de Agua",
            "Visera / Gorra",
            "Bloqueador de ojo (Blinder) - Revisar anchura max 30mm"
        ],
        normativa_issf: [
            "❌ SMARTWATCH PROHIBIDO en muñeca.",
            "❌ MÓVIL APAGADO o en modo avión.",
            "⚠️ MANO LIBRE: No puede tocar nada en el momento del disparo.",
            "⚠️ PARCHES LATERALES: Max 40mm alto (Gafas).",
            "⚠️ TALONERA: No puede tocar el suelo (Pistola).",
            "⚠️ GRIP: La muñeca debe estar libre (Pistola).",
            "⚠️ LINEA ROJA: Seguridad. Cañón siempre hacia blanco."
        ]
    },

    // --- 4. TRAINING PLANS (Structure) ---
    technical_plans: {
        "pistol_air": {
            "general": { dry_ratio: 0.4, live_ratio: 0.6, focus: ["dry_fire", "live_fire_precision"] },
            "specific": { dry_ratio: 0.3, live_ratio: 0.7, focus: ["live_fire_precision", "finals"] },
            "competitive": { dry_ratio: 0.2, live_ratio: 0.8, focus: ["live_fire_dynamic", "finals"] }
        }
    },

    // --- 5. CALENDAR DATA 2026 (Official RFEDETO/ISSF) ---
    competitions_2026: [
        { name: "Copa SM El Rey (Aire)", date: "2026-01-24", location: "Logroño", type: "nacional" },
        { name: "Copa SM La Reina (Aire)", date: "2026-02-15", location: "Valladolid", type: "nacional" },
        { name: "ISSF World Cup (Cairo)", date: "2026-02-20", location: "Cairo, EGY", type: "internacional" },
        { name: "Cto. España Aire Comprimido", date: "2026-03-12", location: "Alicante", type: "nacional_major" },
        { name: "Copa RFEDETO (Fuego)", date: "2026-04-18", location: "Las Gabias (Granada)", type: "nacional" },
        { name: "ISSF World Cup (Baku)", date: "2026-05-05", location: "Baku, AZE", type: "internacional" },
        { name: "Copa Princesa de Asturias", date: "2026-06-12", location: "Oviedo", type: "nacional" },
        { name: "ISSF World Championship", date: "2026-08-15", location: "Berlin, GER", type: "internacional_major" },
        { name: "Cto. España Armas Deportivas", date: "2026-10-10", location: "Las Gabias (Granada)", type: "nacional_major" },
        { name: "Master 100", date: "2026-11-20", location: "Madrid (Cantoblanco)", type: "club" }
    ],

    // --- 6. BUCETA METHODOLOGY TEMPLATES (Preserved) ---
    templates: {
        'objetivos': `
            <div class="paper-sheet" style="background:white; color:black; padding:20mm; font-family:'Arial'; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                <div style="border-bottom:3px solid #fbbf24; margin-bottom:20px; padding-bottom:10px;">
                    <h2 style="margin:0; text-transform:uppercase;">Ficha de Establecimiento de Objetivos</h2>
                    <span style="color:#666;">Modelo: C.H. Buceta</span>
                </div>
                <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:20px;">
                    <div><strong>Deportista:</strong> <span class="fill-data" data-field="athleteName">[NOMBRE]</span></div>
                    <div><strong>Ciclo:</strong> <span class="fill-data" data-field="cycle">[FECHA]</span></div>
                </div>
                <div style="background:#f1f5f9; padding:5px 10px; font-weight:bold; border-left:4px solid #fbbf24; margin-bottom:10px;">1. Objetivo de Resultado</div>
                <div style="border:1px solid #ccc; padding:10px; min-height:40px;">[META PRINCIPAL]</div>
                
                <div style="background:#f1f5f9; padding:5px 10px; font-weight:bold; border-left:4px solid #fbbf24; margin-top:20px; margin-bottom:10px;">2. Objetivos de Proceso (Conducta)</div>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
                    <div style="border:1px solid #ccc; padding:10px; min-height:80px;"><strong>Técnico:</strong><br><br>...</div>
                    <div style="border:1px solid #ccc; padding:10px; min-height:80px;"><strong>Físico:</strong><br><br>...</div>
                    <div style="border:1px solid #ccc; padding:10px; min-height:80px;"><strong>Mental:</strong><br><br>...</div>
                </div>
            </div>`,
        'contingencias': `
            <div class="paper-sheet" style="background:white; color:black; padding:20mm; font-family:'Arial'; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                <div style="border-bottom:3px solid #fbbf24; margin-bottom:20px; padding-bottom:10px;">
                    <h2 style="margin:0; text-transform:uppercase;">Plan de Contingencias</h2>
                    <span style="color:#666;">Gestión de la Incertidumbre</span>
                </div>
                 <div style="margin-bottom:20px;">
                    <div style="background:#dbeafe; padding:10px; border-left:4px solid #2563eb; margin-bottom:10px;"><strong>Escenario A: Dificultad Normal (Error Técnico)</strong></div>
                    <div style="border:1px solid #ccc; padding:10px; margin-bottom:5px;">SÍNTOMA: Disparo sale al 8 a las 3h.</div>
                    <div style="border:1px solid #ccc; padding:10px; background:#eff6ff;">RESPUESTA: Corregir muñeca, respirar, resetear.</div>
                </div>
                <div>
                    <div style="background:#fee2e2; padding:10px; border-left:4px solid #dc2626; margin-bottom:10px;"><strong>Escenario B: Crisis / Pánico (Bloqueo)</strong></div>
                    <div style="border:1px solid #ccc; padding:10px; margin-bottom:5px;">SÍNTOMA: Temblor incontrolable, visión túnel.</div>
                    <div style="border:1px solid #ccc; padding:10px; background:#fef2f2;">RESPUESTA: BAJAR ARMA. Salir del puesto. Protocolo Veto (Audio 4). Beber agua.</div>
                </div>
            </div>`
    },

    // --- 5. OFFICIAL COMPETITIONS 2026 (RFEDETO Calendar) ---
    competitions_2026: [
        {
            name: "Copa de España - Arma Corta",
            date: "2026-02-15",
            location: "Granada",
            type: "national",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)", "Pistola Estándar 25m (STP)"]
        },
        {
            name: "Campeonato de Andalucía",
            date: "2026-03-08",
            location: "Málaga",
            type: "regional",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Deportiva 25m (SP)"]
        },
        {
            name: "Torneo Internacional Madrid",
            date: "2026-04-12",
            location: "Madrid",
            type: "international",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Libre 50m (FP)", "Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)"]
        },
        {
            name: "Campeonato de España - 10m",
            date: "2026-05-20",
            location: "Valencia",
            type: "national",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Aire Mix (APMIX)"]
        },
        {
            name: "Copa Europea Junior",
            date: "2026-06-10",
            location: "Barcelona",
            type: "international",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)"]
        },
        {
            name: "Campeonato de España - 25m",
            date: "2026-07-15",
            location: "Zaragoza",
            type: "national",
            modalities: ["Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)", "Pistola Estándar 25m (STP)", "Pistola Fuego Central 25m (CFP)"]
        },
        {
            name: "Torneo Preolímpico",
            date: "2026-09-05",
            location: "Sevilla",
            type: "international",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Libre 50m (FP)", "Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)"]
        },
        {
            name: "Final Copa de España",
            date: "2026-10-18",
            location: "Bilbao",
            type: "national",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Deportiva 25m (SP)", "Pistola Velocidad 25m (RFP)", "Pistola Estándar 25m (STP)"]
        },
        {
            name: "Campeonato de Invierno",
            date: "2026-11-22",
            location: "Toledo",
            type: "regional",
            modalities: ["Pistola Aire 10m (AP60)", "Pistola Deportiva 25m (SP)"]
        }
    ]
};
