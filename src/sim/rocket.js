// ============================================================================
// SIMULAÇÃO DE PROPULSÃO E EQUAÇÃO DE TSIOLKOVSKY
// ============================================================================
import { G0, ISP } from '../data/catalog';

export function computePropellantMass(dryMassKg, deltaVKmS = 2.1) {
  const deltaVMs = deltaVKmS * 1000;
  // m_prop = m_seco * (exp(deltaV / (Isp * g0)) - 1)
  const massRatio = Math.exp(deltaVMs / (ISP * G0));
  return dryMassKg * (massRatio - 1);
}
