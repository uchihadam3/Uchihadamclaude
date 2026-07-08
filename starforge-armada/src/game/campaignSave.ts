// Progresso da campanha salvo em localStorage (cache offline; a Parte 8 troca
// por conta online + 5 slots).
export interface CampaignSave { cleared: number; medals: Record<number, string>; }
const KEY = 'sf_campaign_v1';

export function loadCampaign(): CampaignSave {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch {}
  return { cleared: -1, medals: {} };
}
export function saveCampaign(s: CampaignSave): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}
export function recordClear(sector: number, medal: string): CampaignSave {
  const s = loadCampaign();
  s.cleared = Math.max(s.cleared, sector);
  const order = ['Bronze', 'Prata', 'Ouro', 'Platina', 'Eclipse'];
  const cur = s.medals[sector];
  if (!cur || order.indexOf(medal) > order.indexOf(cur)) s.medals[sector] = medal;
  saveCampaign(s);
  return s;
}
