/**
 * NeuroShot Session Generator Engine v3.0 (Full Session Mode)
 * Logic: Context-Aware Training Construction
 */

class SessionGenerator {
    constructor() {
        this.db = window.NEUROSHOT_DB;
    }

    generate(athleteProfile, dailyState, nextCompetition) {
        // 1. Determine Season Phase
        const phase = this.getPhase(nextCompetition);

        // 2. Adjust for Bio-State (The "Bio-Filter")
        const adjustedPlan = this.applyBioFilter(phase, dailyState);

        // 3. Construct Full 90-min Session
        // Structure: Warmup (Phys/Mental) -> Dry Fire -> Live Fire (Tech) -> Live Fire (Comp/Game) -> Cooldown

        const session = {
            metadata: {
                phase: phase.name,
                focus: adjustedPlan.focusLabel || phase.focus,
                intensity: adjustedPlan.intensity,
                duration: "90 min aprox"
            },
            warmup: this.buildWarmup(dailyState),
            dry_fire: this.buildDryFire(adjustedPlan),
            live_fire: this.buildLiveFire(athleteProfile.modality || "pistol_air", adjustedPlan),
            cooldown: this.buildCooldown(dailyState)
        };

        return session;
    }

    getPhase(nextCompetition) {
        if (!nextCompetition) return { name: "General / Acumulación", focus: "general", intensity: "high" };

        const today = new Date();
        const compDate = new Date(nextCompetition.date);
        const daysLeft = Math.ceil((compDate - today) / (1000 * 60 * 60 * 24));

        if (daysLeft < 7) return { name: "Competitiva (Puesta a Punto)", focus: "competitive", intensity: "low" };
        if (daysLeft < 30) return { name: "Específica / Pre-Competición", focus: "specific", intensity: "medium" };
        return { name: "General / Acumulación", focus: "general", intensity: "high" };
    }

    applyBioFilter(phase, state) {
        let plan = { ...phase };

        // Safety Override: Critical Fatigue
        if (state.tiredness >= 8) {
            return { focus: "general", intensity: "very_low", focusLabel: "Recuperación Activa (Fatiga)" };
        }

        // Anxiety Adjustment
        if (state.anxiety >= 8) {
            plan.focusLabel = "Regulación Emocional (Ansiedad)";
            // Shift focus to regulation
        }
        else if (state.energy <= 3) {
            plan.focusLabel = "Activación (Baja Energía)";
        }

        return plan;
    }

    buildWarmup(state) {
        const blocks = [];
        // Physical (Always)
        blocks.push({
            type: "physical",
            name: "Movilidad Articular",
            duration: "10 min",
            desc: "Rotación de cuello, hombros, codos y muñecas. Estiramiento dinámico."
        });

        // Mental (Contextual)
        const mentalTool = this.db.mental_tools.find(tool => {
            if (tool.trigger.anxiety_min && state.anxiety >= tool.trigger.anxiety_min) return true;
            if (tool.trigger.energy_max && state.energy <= tool.trigger.energy_max) return true;
            if (tool.trigger.crisis_mode && state.anxiety >= 9) return true;
            return false;
        }) || this.db.mental_tools.find(t => t.id === "M03"); // Default Viz

        blocks.push({
            type: "mental",
            name: mentalTool.name,
            duration: "5 min",
            desc: mentalTool.desc,
            file: mentalTool.file
        });

        return blocks;
    }

    buildDryFire(plan) {
        const blocks = [];
        const drills = this.db.drills.dry_fire;

        // Select 2 random dry fire drills
        const d1 = drills[Math.floor(Math.random() * drills.length)];
        let d2 = drills[Math.floor(Math.random() * drills.length)];
        while (d2 === d1) d2 = drills[Math.floor(Math.random() * drills.length)];

        blocks.push({ name: d1.name, desc: d1.desc, duration: "10 min" });

        // Only add second drill if intensity is not low
        if (plan.intensity !== "low") {
            blocks.push({ name: d2.name, desc: d2.desc, duration: "5 min" });
        }

        return blocks;
    }

    buildLiveFire(modality, plan) {
        const blocks = [];
        const precisionDrills = this.db.drills.live_fire_precision;
        const dynamicDrills = this.db.drills.live_fire_dynamic;
        const finalDrills = this.db.drills.finals;

        // Phase Rule
        if (plan.focus === "general") {
            // Volume Focus: 2 Precision Drills
            blocks.push({ name: precisionDrills[0].name, vol: 20, desc: precisionDrills[0].desc });
            blocks.push({ name: precisionDrills[1].name, vol: 30, desc: precisionDrills[1].desc });
            blocks.push({ name: "Serie de Puntuación", vol: 10, desc: "Control de rendimiento." });
        }
        else if (plan.focus === "specific") {
            // Mixed: 1 Precision + 1 Dynamic
            blocks.push({ name: precisionDrills[3].name, vol: 20, desc: precisionDrills[3].desc });
            blocks.push({ name: dynamicDrills[0].name, vol: 20, desc: dynamicDrills[0].desc });
            blocks.push({ name: finalDrills[0].name, vol: 10, desc: finalDrills[0].desc });
        }
        else { // Competitive
            // Simulation Focus
            blocks.push({ name: "Disparos de Prueba", vol: 10, desc: "Ajuste de miras y posición." });
            blocks.push({ name: "Simulacro Competición", vol: 40, desc: "Serie oficial con tiempos." });
            blocks.push({ name: "Shoot-Off", vol: 5, desc: "Desempate mental." });
        }

        return blocks;
    }

    buildCooldown(state) {
        return [
            { name: "Respiración de Salida", desc: "3 min ojos cerrados para bajar pulsaciones." },
            { name: "Análisis y Diario", desc: "Rellenar sensaciones y limpiar equipo." }
        ];
    }
}

window.SessionGenerator = SessionGenerator; // Export
