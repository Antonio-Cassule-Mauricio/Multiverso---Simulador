// ============================================================================
// SIMULAÇÃO DE TELECOMUNICAÇÕES & EQUAÇÃO DE ENLACE DE RF (DSN)
// ============================================================================
import { COMMS } from '../data/catalog';

export function computeDataRateBps(antennaDiameterM, txPowerW, earthDistanceAU) {
  // Rate = (k * P_tx * D^2) / d^2
  const numerator = COMMS.k * txPowerW * (antennaDiameterM * antennaDiameterM);
  const denominator = earthDistanceAU * earthDistanceAU;
  return numerator / Math.max(0.01, denominator);
}

export function computeDailyDownlinkMbit(rateBps, contactHoursPerDay = 8) {
  return (rateBps * contactHoursPerDay * 3600) / 1e6;
}
