/**
 * NeuroShot Coach Brain v1.0
 * Logic: Strategic Intervention & Pattern Recognition
 */

class CoachBrain {
    constructor() {
        this.db = window.NEUROSHOT_DB;
    }

    scanInbox() {
        const raw = JSON.parse(localStorage.getItem('neuroshot_global_db') || '[]');
        // Sort by newest
        return raw.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    analyzeAthlete(inboxData) {
        if (!inboxData || inboxData.length === 0) return { status: "NO_DATA", alerts: [] };

        const latest = inboxData[0];
        const history = inboxData.slice(0, 5); // Last 5 sessions
        const alerts = [];

        // 1. CRITICAL STATUS CHECK
        if (latest.state && latest.state.tiredness >= 8) {
            alerts.push({
                level: "CRITICAL",
                type: "BURNOUT_RISK",
                msg: "Fatiga Extrema detectada hoy.",
                action: "force_rest"
            });
        }

        if (latest.state && latest.state.anxiety >= 8) {
            alerts.push({
                level: "HIGH",
                type: "PANIC_MODE",
                msg: "Nivel 9/10 Ansiedad. Posible bloqueo.",
                action: "send_veto"
            });
        }

        // 2. PATTERN RECOGNITION (Dopamine Trap)
        if (latest.score > 95 && latest.sensations && latest.sensations.includes("mal")) {
            alerts.push({
                level: "MEDIUM",
                type: "DOPAMINE_TRAP",
                msg: "Alto rendimiento con sensación negativa. Peligro de perfeccionismo.",
                action: "cognitive_reframing"
            });
        }

        return {
            status: alerts.length > 0 ? "ATTENTION_NEEDED" : "OPTIMAL",
            latest: latest,
            alerts: alerts
        };
    }

    getRecommendations(alertType) {
        switch (alertType) {
            case "BURNOUT_RISK":
                return [
                    { name: "Planilla de Descarga", template: "semanal" },
                    { name: "Audio: Recuperación", file: "media/recuperacion.mp3" }
                ];
            case "PANIC_MODE":
                return [
                    { name: "Protocolo VETO (Stop)", file: "media/veto.mp3" },
                    { name: "Ficha Contingencias", template: "contingencias" }
                ];
            case "DOPAMINE_TRAP":
                return [
                    { name: "Ficha Reestructuración (TCC)", template: "registros_pensamientos" },
                    { name: "Ficha Objetivos (Re-Enfoque)", template: "objetivos" }
                ];
            default:
                return [];
        }
    }

    getTemplate(id) {
        return this.db.templates[id] || "<div>Planilla no encontrada</div>";
    }

    registerAthlete(athleteData) {
        const athletes = this.getAthletes();
        athletes.push(athleteData);
        localStorage.setItem('neuroshot_athletes', JSON.stringify(athletes));
        return true;
    }

    getAthletes() {
        return JSON.parse(localStorage.getItem('neuroshot_athletes') || '[]');
    }
}

window.CoachBrain = CoachBrain;
