// ============ PINTORES DE DECORAÇÃO ============
type Ctx = CanvasRenderingContext2D;

// desenha decoração com base (0,0) no centro do tile, s = tamanho do tile
export function drawDecor(ctx: Ctx, visual: string, s: number, time: number): void {
  const g = (x: number, y: number, w: number, h: number, color: string, r = 2) => {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
  };
  switch (visual) {
    // ---- caminhos (desenhados rente ao chão) ----
    case 'path-stone': {
      ctx.fillStyle = '#a8a49a';
      for (const [px, py, rr] of [[-s * 0.22, -s * 0.05, s * 0.16], [s * 0.14, -s * 0.14, s * 0.14], [s * 0.05, s * 0.12, s * 0.15], [-s * 0.05, -s * 0.22, s * 0.11]] as const) {
        ctx.beginPath(); ctx.ellipse(px, py, rr, rr * 0.65, 0.3, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'path-gravel': {
      for (let i = 0; i < 22; i++) {
        const a = (i * 137.5) % 360 / 57.3, rr = ((i * 61) % 100) / 100;
        ctx.fillStyle = i % 3 ? '#b0aa9c' : '#948e80';
        ctx.beginPath();
        ctx.arc(Math.cos(a) * rr * s * 0.38, Math.sin(a) * rr * s * 0.24, s * 0.035, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'path-wood': {
      for (let i = -1; i <= 1; i++) g(-s * 0.4, i * s * 0.18 - s * 0.06, s * 0.8, s * 0.13, i % 2 ? '#9a7048' : '#8a6240', 2);
      break;
    }
    case 'path-brick': {
      for (let row = -1; row <= 1; row++) {
        for (let col = 0; col < 3; col++) {
          g(-s * 0.4 + col * s * 0.28 + (row % 2 ? s * 0.14 : 0), row * s * 0.16 - s * 0.05, s * 0.24, s * 0.11, (row + col) % 2 ? '#b06848' : '#a05a3c', 1);
        }
      }
      break;
    }
    case 'path-sand': {
      ctx.fillStyle = '#d8cead';
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.42, s * 0.26, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#c4b892'; ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.ellipse(0, 0, s * (0.08 + Math.abs(i) * 0.08), s * (0.05 + Math.abs(i) * 0.05), 0, 0, Math.PI * 2); ctx.stroke();
      }
      break;
    }
    case 'path-slab': {
      ctx.fillStyle = '#8a887c';
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.3, s * 0.2, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#9a988c';
      ctx.beginPath(); ctx.ellipse(-s * 0.03, -s * 0.03, s * 0.26, s * 0.16, 0.2, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'path-mosaic': {
      const cols = ['#c86868', '#68a0c8', '#c8b850', '#78b078', '#a878c0'];
      for (let i = 0; i < 14; i++) {
        const a = (i * 137.5) / 57.3, rr = ((i * 47) % 100) / 100;
        ctx.fillStyle = cols[i % cols.length];
        ctx.save();
        ctx.translate(Math.cos(a) * rr * s * 0.32, Math.sin(a) * rr * s * 0.2);
        ctx.rotate(a);
        ctx.fillRect(-s * 0.05, -s * 0.05, s * 0.1, s * 0.1);
        ctx.restore();
      }
      break;
    }
    case 'path-trail': {
      ctx.fillStyle = '#8a7a5c';
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.36, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#6a8a4a';
      for (const [px, py] of [[-s * 0.3, s * 0.12], [s * 0.28, -s * 0.1], [s * 0.15, s * 0.15]] as const) {
        ctx.beginPath(); ctx.arc(px, py, s * 0.05, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    // ---- móveis ----
    case 'bench-wood': {
      g(-s * 0.45, -s * 0.35, s * 0.9, s * 0.12, '#9a7048', 3);
      g(-s * 0.45, -s * 0.2, s * 0.9, s * 0.1, '#8a6240', 2);
      g(-s * 0.4, -s * 0.12, s * 0.08, s * 0.16, '#6a4a30');
      g(s * 0.32, -s * 0.12, s * 0.08, s * 0.16, '#6a4a30');
      break;
    }
    case 'bench-iron': {
      ctx.strokeStyle = '#3a4048'; ctx.lineWidth = s * 0.05;
      ctx.beginPath(); ctx.moveTo(-s * 0.4, -s * 0.42); ctx.quadraticCurveTo(0, -s * 0.52, s * 0.4, -s * 0.42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s * 0.42, -s * 0.2); ctx.lineTo(s * 0.42, -s * 0.2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s * 0.36, 0); ctx.lineTo(-s * 0.36, -s * 0.42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.36, 0); ctx.lineTo(s * 0.36, -s * 0.42); ctx.stroke();
      break;
    }
    case 'table-small': case 'tea-table': {
      const w = visual === 'tea-table' ? 0.5 : 0.35;
      ctx.fillStyle = '#9a7048';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.35, s * w, s * w * 0.5, 0, 0, Math.PI * 2); ctx.fill();
      g(-s * 0.04, -s * 0.35, s * 0.08, s * 0.35, '#7a5838');
      if (visual === 'tea-table') {
        ctx.fillStyle = '#e8e0d0';
        ctx.beginPath(); ctx.ellipse(-s * 0.12, -s * 0.42, s * 0.07, s * 0.04, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s * 0.12, -s * 0.4, s * 0.07, s * 0.04, 0, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'table-pots': case 'shelf': case 'ladder-stand': {
      const tiers = visual === 'ladder-stand' ? 3 : 2;
      for (let i = 0; i < tiers; i++) {
        g(-s * (0.4 - i * 0.08), -s * (0.2 + i * 0.22), s * (0.8 - i * 0.16), s * 0.07, '#8a6240');
        // vasinhos decorativos
        for (let pI = 0; pI < 3 - i; pI++) {
          const px = -s * 0.25 + pI * s * 0.25 + i * s * 0.1;
          g(px, -s * (0.3 + i * 0.22), s * 0.1, s * 0.1, '#b06848', 1);
          ctx.fillStyle = '#5a8a4a';
          ctx.beginPath(); ctx.arc(px + s * 0.05, -s * (0.32 + i * 0.22), s * 0.06, 0, Math.PI * 2); ctx.fill();
        }
      }
      break;
    }
    case 'plant-cart': {
      g(-s * 0.4, -s * 0.35, s * 0.7, s * 0.2, '#8a6240', 3);
      ctx.fillStyle = '#3a3a38';
      ctx.beginPath(); ctx.arc(-s * 0.2, -s * 0.06, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(s * 0.14, -s * 0.06, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#5a8a4a';
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-s * 0.25 + i * s * 0.22, -s * 0.42, s * 0.08, 0, Math.PI * 2); ctx.fill(); }
      break;
    }
    case 'chair': {
      g(-s * 0.2, -s * 0.3, s * 0.4, s * 0.08, '#9a7048');
      g(-s * 0.2, -s * 0.6, s * 0.07, s * 0.35, '#8a6240');
      g(-s * 0.18, -s * 0.22, s * 0.05, s * 0.22, '#6a4a30');
      g(s * 0.13, -s * 0.22, s * 0.05, s * 0.22, '#6a4a30');
      break;
    }
    // ---- água ----
    case 'fountain-small': case 'fountain-classic': {
      const big = visual === 'fountain-classic';
      ctx.fillStyle = '#8a8878';
      ctx.beginPath(); ctx.ellipse(0, 0, s * (big ? 0.48 : 0.36), s * (big ? 0.26 : 0.2), 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#68a8c8';
      ctx.beginPath(); ctx.ellipse(0, 0, s * (big ? 0.4 : 0.28), s * (big ? 0.2 : 0.15), 0, 0, Math.PI * 2); ctx.fill();
      g(-s * 0.05, -s * 0.5, s * 0.1, s * 0.5, '#8a8878');
      ctx.fillStyle = '#98988a';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.5, s * 0.16, s * 0.07, 0, 0, Math.PI * 2); ctx.fill();
      // jato animado
      ctx.strokeStyle = 'rgba(180,220,240,0.8)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const ph = (time * 2 + i / 3) % 1;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.55);
        ctx.quadraticCurveTo((i - 1) * s * 0.12, -s * (0.75 - ph * 0.1), (i - 1) * s * 0.2, -s * (0.55 - ph * 0.45));
        ctx.stroke();
      }
      break;
    }
    case 'pond-small': case 'water-bowl': {
      const rr = visual === 'pond-small' ? 0.46 : 0.3;
      ctx.fillStyle = '#5a6858';
      ctx.beginPath(); ctx.ellipse(0, 0, s * (rr + 0.05), s * (rr + 0.05) * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#5898b8';
      ctx.beginPath(); ctx.ellipse(0, 0, s * rr, s * rr * 0.52, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(220,240,250,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(0, 0, s * rr * (0.5 + Math.sin(time * 1.5) * 0.1), s * rr * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case 'stream': {
      ctx.fillStyle = '#5898b8';
      ctx.beginPath();
      ctx.moveTo(-s * 1.2, -s * 0.1);
      ctx.quadraticCurveTo(0, s * 0.15, s * 1.2, -s * 0.05);
      ctx.lineTo(s * 1.2, s * 0.15);
      ctx.quadraticCurveTo(0, s * 0.35, -s * 1.2, s * 0.12);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(220,240,250,0.5)'; ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        const ph = (time * 0.6 + i / 3) % 1;
        ctx.beginPath();
        ctx.moveTo(-s * 1.1 + ph * s * 2.2, s * 0.02 + i * s * 0.06);
        ctx.lineTo(-s * 0.9 + ph * s * 2.2, s * 0.04 + i * s * 0.06);
        ctx.stroke();
      }
      break;
    }
    case 'waterfall': {
      ctx.fillStyle = '#7a7868';
      ctx.beginPath(); ctx.moveTo(-s * 0.4, 0); ctx.lineTo(-s * 0.28, -s * 0.6); ctx.lineTo(s * 0.28, -s * 0.6); ctx.lineTo(s * 0.4, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(160,210,235,0.85)';
      const ph = (time * 3) % 1;
      g(-s * 0.1, -s * 0.58, s * 0.2, s * 0.58, 'rgba(160,210,235,0.85)', 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 3; i++) g(-s * 0.08, -s * 0.55 + ((ph + i / 3) % 1) * s * 0.5, s * 0.16, s * 0.05, 'rgba(255,255,255,0.4)', 2);
      ctx.fillStyle = '#5898b8';
      ctx.beginPath(); ctx.ellipse(0, s * 0.04, s * 0.3, s * 0.12, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'bird-bath': {
      g(-s * 0.05, -s * 0.4, s * 0.1, s * 0.4, '#98948a');
      ctx.fillStyle = '#a8a49a';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.42, s * 0.26, s * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#68a8c8';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.43, s * 0.2, s * 0.07, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    // ---- luz ----
    case 'lantern-jp': {
      g(-s * 0.16, -s * 0.1, s * 0.32, s * 0.1, '#8a8878');
      g(-s * 0.08, -s * 0.32, s * 0.16, s * 0.24, '#98948a');
      ctx.fillStyle = '#f4d888';
      g(-s * 0.06, -s * 0.3, s * 0.12, s * 0.12, '#f4d888');
      ctx.fillStyle = '#8a8878';
      ctx.beginPath(); ctx.moveTo(-s * 0.2, -s * 0.32); ctx.lineTo(0, -s * 0.48); ctx.lineTo(s * 0.2, -s * 0.32); ctx.closePath(); ctx.fill();
      break;
    }
    case 'fairy-lights': {
      ctx.strokeStyle = '#4a4238'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-s * 0.55, -s * 0.5); ctx.quadraticCurveTo(0, -s * 0.28, s * 0.55, -s * 0.5); ctx.stroke();
      for (let i = 0; i < 7; i++) {
        const t = i / 6;
        const px = -s * 0.55 + t * s * 1.1;
        const py = -s * 0.5 + Math.sin(t * Math.PI) * s * 0.2;
        const glow = 0.6 + Math.sin(time * 3 + i) * 0.4;
        ctx.fillStyle = `rgba(255,220,130,${glow})`;
        ctx.beginPath(); ctx.arc(px, py + s * 0.04, s * 0.045, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'lamp-post': case 'solar-light': {
      const hh = visual === 'lamp-post' ? 0.6 : 0.35;
      g(-s * 0.03, -s * hh, s * 0.06, s * hh, '#3a4048');
      ctx.fillStyle = 'rgba(255,220,140,0.95)';
      ctx.beginPath(); ctx.arc(0, -s * hh, s * 0.09, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,220,140,0.15)';
      ctx.beginPath(); ctx.arc(0, -s * hh, s * 0.22, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'candles': {
      for (const [px, hh] of [[-s * 0.12, 0.16], [0, 0.22], [s * 0.12, 0.14]] as const) {
        g(px - s * 0.03, -s * hh, s * 0.06, s * hh, '#e8e0d0');
        ctx.fillStyle = `rgba(255,190,80,${0.7 + Math.sin(time * 8 + px) * 0.3})`;
        ctx.beginPath(); ctx.ellipse(px, -s * hh - s * 0.03, s * 0.02, s * 0.04, 0, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    // ---- estruturas ----
    case 'trellis': case 'vertical-frame': {
      ctx.strokeStyle = '#8a6a48'; ctx.lineWidth = s * 0.035;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.moveTo(i * s * 0.15, 0); ctx.lineTo(i * s * 0.15, -s * 0.7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s * 0.3, -s * 0.15 - (i + 2) * s * 0.13); ctx.lineTo(s * 0.3, -s * 0.15 - (i + 2) * s * 0.13); ctx.stroke();
      }
      break;
    }
    case 'rose-arch': case 'pergola': {
      ctx.strokeStyle = '#8a6a48'; ctx.lineWidth = s * 0.06;
      ctx.beginPath(); ctx.moveTo(-s * 0.4, 0); ctx.lineTo(-s * 0.4, -s * 0.55);
      ctx.quadraticCurveTo(0, -s * 0.85, s * 0.4, -s * 0.55); ctx.lineTo(s * 0.4, 0); ctx.stroke();
      if (visual === 'rose-arch') {
        ctx.fillStyle = '#5a8a4a';
        for (let i = 0; i < 10; i++) {
          const t = i / 9;
          const px = -s * 0.4 + t * s * 0.8;
          const py = -s * 0.55 - Math.sin(t * Math.PI) * s * 0.28;
          ctx.beginPath(); ctx.arc(px, py, s * 0.06, 0, Math.PI * 2); ctx.fill();
          if (i % 2) { ctx.fillStyle = '#e05878'; ctx.beginPath(); ctx.arc(px, py - s * 0.03, s * 0.035, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#5a8a4a'; }
        }
      }
      break;
    }
    case 'fence': {
      ctx.fillStyle = '#a08258';
      for (let i = -2; i <= 2; i++) {
        g(i * s * 0.18 - s * 0.03, -s * 0.32, s * 0.06, s * 0.32, '#a08258', 1);
        ctx.beginPath(); ctx.moveTo(i * s * 0.18 - s * 0.03, -s * 0.32); ctx.lineTo(i * s * 0.18, -s * 0.38); ctx.lineTo(i * s * 0.18 + s * 0.03, -s * 0.32); ctx.fill();
      }
      g(-s * 0.42, -s * 0.24, s * 0.84, s * 0.05, '#8a6a48');
      g(-s * 0.42, -s * 0.12, s * 0.84, s * 0.05, '#8a6a48');
      break;
    }
    case 'hedge': {
      ctx.fillStyle = '#3a6a38';
      ctx.beginPath(); ctx.roundRect(-s * 0.42, -s * 0.4, s * 0.84, s * 0.4, s * 0.1); ctx.fill();
      ctx.fillStyle = '#4a7a44';
      for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.arc(-s * 0.32 + (i % 4) * s * 0.22, -s * 0.35 + Math.floor(i / 4) * s * 0.15, s * 0.08, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'green-wall': {
      g(-s * 0.45, -s * 0.7, s * 0.9, s * 0.7, '#5a4a38', 2);
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = ['#4a7a44', '#5a8a50', '#3a6a38', '#6a9a58'][i % 4];
        ctx.beginPath();
        ctx.arc(-s * 0.34 + (i % 4) * s * 0.22, -s * 0.6 + Math.floor(i / 4) * s * 0.2, s * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'mini-greenhouse': {
      ctx.fillStyle = 'rgba(200,230,240,0.6)';
      ctx.strokeStyle = '#e8e8e0'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, 0); ctx.lineTo(-s * 0.3, -s * 0.3); ctx.lineTo(0, -s * 0.48); ctx.lineTo(s * 0.3, -s * 0.3); ctx.lineTo(s * 0.3, 0);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -s * 0.48); ctx.lineTo(0, 0); ctx.stroke();
      break;
    }
    case 'raised-bed': {
      g(-s * 0.45, -s * 0.22, s * 0.9, s * 0.22, '#8a6a48', 2);
      ctx.fillStyle = '#4a3826';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.2, s * 0.38, s * 0.08, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'herb-spiral': {
      ctx.strokeStyle = '#98948a'; ctx.lineWidth = s * 0.08;
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 4; a += 0.2) {
        const rr = s * 0.08 + a * s * 0.035;
        const px = Math.cos(a) * rr, py = Math.sin(a) * rr * 0.55 - a * s * 0.012;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = '#5a8a4a';
      for (let i = 0; i < 5; i++) {
        const a = i * 2.2, rr = s * 0.1 + a * s * 0.035;
        ctx.beginPath(); ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr * 0.55 - a * s * 0.012 - s * 0.05, s * 0.06, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    // ---- cozy ----
    case 'sign': {
      g(-s * 0.03, -s * 0.35, s * 0.06, s * 0.35, '#8a6a48');
      g(-s * 0.25, -s * 0.5, s * 0.5, s * 0.18, '#a08258', 3);
      ctx.strokeStyle = '#5a4028'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-s * 0.16, -s * 0.44); ctx.lineTo(s * 0.16, -s * 0.44); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s * 0.16, -s * 0.38); ctx.lineTo(s * 0.08, -s * 0.38); ctx.stroke();
      break;
    }
    case 'scarecrow': {
      g(-s * 0.02, -s * 0.55, s * 0.04, s * 0.55, '#8a6a48');
      g(-s * 0.22, -s * 0.42, s * 0.44, s * 0.04, '#8a6a48');
      ctx.fillStyle = '#c8a868';
      ctx.beginPath(); ctx.arc(0, -s * 0.58, s * 0.09, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#a86838';
      ctx.beginPath(); ctx.moveTo(-s * 0.14, -s * 0.62); ctx.lineTo(0, -s * 0.75); ctx.lineTo(s * 0.14, -s * 0.62); ctx.closePath(); ctx.fill();
      g(-s * 0.1, -s * 0.45, s * 0.2, s * 0.2, '#b05a48', 2);
      break;
    }
    case 'birdhouse': {
      g(-s * 0.02, -s * 0.5, s * 0.04, s * 0.5, '#8a6a48');
      g(-s * 0.12, -s * 0.68, s * 0.24, s * 0.2, '#b08858', 2);
      ctx.fillStyle = '#8a5a38';
      ctx.beginPath(); ctx.moveTo(-s * 0.15, -s * 0.68); ctx.lineTo(0, -s * 0.8); ctx.lineTo(s * 0.15, -s * 0.68); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#2a1a10';
      ctx.beginPath(); ctx.arc(0, -s * 0.58, s * 0.04, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'bird-feeder': {
      g(-s * 0.02, -s * 0.45, s * 0.04, s * 0.45, '#8a6a48');
      ctx.fillStyle = '#a08258';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.45, s * 0.18, s * 0.06, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#8a5a38';
      ctx.beginPath(); ctx.moveTo(-s * 0.18, -s * 0.5); ctx.lineTo(0, -s * 0.62); ctx.lineTo(s * 0.18, -s * 0.5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#d8c060';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.46, s * 0.1, s * 0.03, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'insect-hotel': {
      g(-s * 0.18, -s * 0.55, s * 0.36, s * 0.4, '#8a6a48', 2);
      const cells = ['#6a4a30', '#c8a868', '#5a4028', '#a88858'];
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = cells[i % 4];
        ctx.beginPath();
        ctx.arc(-s * 0.11 + (i % 3) * s * 0.11, -s * 0.47 + Math.floor(i / 3) * s * 0.11, s * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#7a5838';
      ctx.beginPath(); ctx.moveTo(-s * 0.22, -s * 0.55); ctx.lineTo(0, -s * 0.68); ctx.lineTo(s * 0.22, -s * 0.55); ctx.closePath(); ctx.fill();
      break;
    }
    case 'rocks': {
      ctx.fillStyle = '#8a887c';
      ctx.beginPath(); ctx.ellipse(-s * 0.12, -s * 0.08, s * 0.18, s * 0.14, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#9a988c';
      ctx.beginPath(); ctx.ellipse(s * 0.14, -s * 0.05, s * 0.12, s * 0.1, -0.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7a786c';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.16, s * 0.09, s * 0.07, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'sculpture': {
      g(-s * 0.14, -s * 0.12, s * 0.28, s * 0.12, '#98948a');
      ctx.fillStyle = '#a8a49a';
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.bezierCurveTo(s * 0.18, -s * 0.5, s * 0.1, -s * 0.3, s * 0.04, -s * 0.12);
      ctx.lineTo(-s * 0.04, -s * 0.12);
      ctx.bezierCurveTo(-s * 0.14, -s * 0.35, -s * 0.16, -s * 0.5, 0, -s * 0.6);
      ctx.fill();
      break;
    }
    case 'wind-chimes': {
      ctx.strokeStyle = '#6a5a48'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, -s * 0.7); ctx.lineTo(0, -s * 0.6); ctx.stroke();
      ctx.fillStyle = '#a08258';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.6, s * 0.12, s * 0.03, 0, 0, Math.PI * 2); ctx.fill();
      for (let i = 0; i < 4; i++) {
        const px = -s * 0.08 + i * s * 0.055 + Math.sin(time * 2 + i) * s * 0.01;
        ctx.strokeStyle = '#c8c0a8'; ctx.lineWidth = s * 0.02;
        ctx.beginPath(); ctx.moveTo(px, -s * 0.58); ctx.lineTo(px, -s * (0.36 - i * 0.02)); ctx.stroke();
      }
      break;
    }
    case 'rug': {
      ctx.fillStyle = '#b08878';
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.45, s * 0.28, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#906858'; ctx.lineWidth = s * 0.03;
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.34, s * 0.2, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.2, s * 0.11, 0, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case 'broken-pot': {
      ctx.fillStyle = '#b06848';
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, 0); ctx.lineTo(-s * 0.24, -s * 0.28); ctx.lineTo(s * 0.05, -s * 0.28);
      ctx.lineTo(s * 0.1, -s * 0.14); ctx.lineTo(s * 0.28, -s * 0.14); ctx.lineTo(s * 0.32, 0);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#4a3826';
      ctx.beginPath(); ctx.ellipse(s * 0.02, -s * 0.13, s * 0.16, s * 0.05, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#6a9a58';
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-s * 0.08 + i * s * 0.08, -s * 0.2 - (i % 2) * s * 0.05, s * 0.05, 0, Math.PI * 2); ctx.fill(); }
      break;
    }
    case 'gnome': {
      ctx.fillStyle = '#4a6ac8';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.14, s * 0.1, s * 0.13, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e8c0a0';
      ctx.beginPath(); ctx.arc(0, -s * 0.3, s * 0.07, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e8e8e0';
      ctx.beginPath(); ctx.ellipse(0, -s * 0.24, s * 0.05, s * 0.06, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d04838';
      ctx.beginPath(); ctx.moveTo(-s * 0.08, -s * 0.33); ctx.lineTo(0, -s * 0.52); ctx.lineTo(s * 0.08, -s * 0.33); ctx.closePath(); ctx.fill();
      break;
    }
    case 'decor-can': {
      g(-s * 0.12, -s * 0.24, s * 0.24, s * 0.24, '#7a9aa8', 2);
      ctx.strokeStyle = '#7a9aa8'; ctx.lineWidth = s * 0.04;
      ctx.beginPath(); ctx.moveTo(s * 0.12, -s * 0.18); ctx.quadraticCurveTo(s * 0.3, -s * 0.24, s * 0.32, -s * 0.1); ctx.stroke();
      ctx.beginPath(); ctx.arc(-s * 0.12, -s * 0.16, s * 0.1, Math.PI * 0.4, Math.PI * 1.5); ctx.stroke();
      break;
    }
    case 'beehive': {
      ctx.fillStyle = '#c8a050';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.1 - i * s * 0.11, s * (0.24 - i * 0.045), s * 0.08, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#4a3018';
      ctx.beginPath(); ctx.arc(0, -s * 0.1, s * 0.04, 0, Math.PI * 2); ctx.fill();
      break;
    }
    default: {
      g(-s * 0.15, -s * 0.3, s * 0.3, s * 0.3, '#8a8878', 3);
      break;
    }
  }
}
