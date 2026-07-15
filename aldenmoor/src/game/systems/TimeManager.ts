// TimeManager — ciclo de dia/noite. O tempo avança durante a viagem.
// Fornece a cor/alpha do overlay ambiente e a fase atual.

export type Phase = "dawn" | "day" | "dusk" | "night";

const MIN_PER_DAY = 24 * 60;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}
function mixColor(c1: number, c2: number, t: number) {
  const r1 = (c1 >> 16) & 0xff,
    g1 = (c1 >> 8) & 0xff,
    b1 = c1 & 0xff;
  const r2 = (c2 >> 16) & 0xff,
    g2 = (c2 >> 8) & 0xff,
    b2 = c2 & 0xff;
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return (r << 16) | (g << 8) | b;
}

export class TimeManager {
  // começa no dia 1, 8:00 da manhã
  private totalMinutes = 8 * 60;

  advance(minutes: number) {
    this.totalMinutes += minutes;
  }

  get minutesOfDay() {
    return ((this.totalMinutes % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  }
  get day() {
    return Math.floor(this.totalMinutes / MIN_PER_DAY) + 1;
  }
  get hour() {
    return Math.floor(this.minutesOfDay / 60);
  }
  get minute() {
    return Math.floor(this.minutesOfDay % 60);
  }

  get phase(): Phase {
    const h = this.minutesOfDay / 60;
    if (h >= 5 && h < 7) return "dawn";
    if (h >= 7 && h < 18) return "day";
    if (h >= 18 && h < 20) return "dusk";
    return "night";
  }

  get phaseName(): string {
    return { dawn: "Amanhecer", day: "Dia", dusk: "Entardecer", night: "Noite" }[
      this.phase
    ];
  }

  clockString(): string {
    return `${String(this.hour).padStart(2, "0")}:${String(this.minute).padStart(2, "0")}`;
  }

  /**
   * Cor e opacidade do overlay ambiente para o horário atual.
   * Dia = transparente; noite = azul profundo; transições suaves.
   */
  environment(): { color: number; alpha: number } {
    const h = this.minutesOfDay / 60;
    const NIGHT = 0x0b1636;
    const DUSK = 0x50264a;
    const DAWN = 0x5b3b6b;

    if (h >= 7 && h < 18) return { color: NIGHT, alpha: 0 }; // dia
    if (h >= 5 && h < 7) {
      // amanhecer: noite -> dia
      const t = (h - 5) / 2;
      return { color: mixColor(NIGHT, DAWN, t), alpha: lerp(0.5, 0, t) };
    }
    if (h >= 18 && h < 20) {
      // entardecer: dia -> noite
      const t = (h - 18) / 2;
      return { color: mixColor(DUSK, NIGHT, t), alpha: lerp(0.18, 0.5, t) };
    }
    // noite (20..24 e 0..5)
    return { color: NIGHT, alpha: 0.5 };
  }
}
