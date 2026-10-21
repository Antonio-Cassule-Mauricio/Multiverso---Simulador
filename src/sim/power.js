// ============================================================================
// SIMULAÇÃO DE POTÊNCIA ELÉTRICA & LEI DO INVERSO DO QUADRADO
// ============================================================================
import { PANEL, BATTERY, RTG } from '../data/catalog';

export function computePowerGeneration(source, panelAreaM2, sunDistanceAU) {
  if (source === 'rtg') {
    return RTG.powerW;
  }
  // S = 1361 / d^2 W/m^2
  const solarFlux = 1361 / (sunDistanceAU * sunDistanceAU);
  return solarFlux * panelAreaM2 * PANEL.efficiency * PANEL.derate;
}

export function computeBatteryCapacityWh(batteryKg) {
  return batteryKg * BATTERY.whPerKg * BATTERY.usableFraction;
}
