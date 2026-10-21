// ============================================================================
// AVALIADOR COMPLETO DA MISSÃO ESPACIAL (FÍSICA + ENGENHARIA + CUSTOS)
// ============================================================================

import { universes } from '../data/universes';
import { missionTypes, instruments, launchers, antennas, PANEL, BATTERY, RTG, COMMS, INTEGRATION_COST_PER_KG_M } from '../data/catalog';
import { computePropellantMass } from './rocket';
import { computePowerGeneration, computeBatteryCapacityWh } from './power';
import { computeDataRateBps, computeDailyDownlinkMbit } from './comms';

export function evaluateMission(config) {
  const u = universes[config.universe] || universes.mars;
  const t = missionTypes[config.type] || missionTypes.orbiter;
  const launcher = launchers[config.launcher] || launchers.medium;
  const antenna = antennas[config.comms.antenna] || antennas.medium;

  // 1. Massa seca
  let instMassKg = 0;
  let instPowerW = 0;
  let instCostM = 0;
  let rawScience = 0;
  let totalDataMbitDay = 0;

  (config.instruments || []).forEach((id) => {
    const inst = instruments[id];
    if (inst) {
      instMassKg += inst.massKg;
      instPowerW += inst.powerW;
      instCostM += inst.costM;
      rawScience += inst.science;
      totalDataMbitDay += inst.dataMbitDay;
    }
  });

  const powerSource = config.power.source;
  const panelArea = config.power.panelArea || 1;
  const batteryKg = config.power.batteryKg || 5;
  const txPower = config.comms.txPower || 20;

  const powerMassKg = powerSource === 'solar' ? (panelArea * PANEL.kgPerM2 + batteryKg) : (RTG.massKg + batteryKg);
  const commsMassKg = antenna.massKg + txPower * COMMS.kgPerW;
  const dryMassKg = t.busMassKg + instMassKg + powerMassKg + commsMassKg;

  // 2. Propelente e massa de lançamento
  const edlMassKg = config.type === 'lander' || config.type === 'rover' ? dryMassKg * 0.4 : 0;
  const propellantKg = computePropellantMass(dryMassKg, 2.2);
  const launchMassKg = dryMassKg + edlMassKg + propellantKg;
  const capacityKg = launcher.capacityKg[config.universe] ?? 1200;

  // 3. Potência
  const generationW = computePowerGeneration(powerSource, panelArea, u.sunDistanceAU);
  const commsPowerW = (txPower / COMMS.amplifierEfficiency) * COMMS.txDuty;
  const consumptionW = t.busPowerW + instPowerW + commsPowerW;
  const batteryWh = computeBatteryCapacityWh(batteryKg);
  const eclipseHours = 2.5;
  const neededWh = consumptionW * eclipseHours;

  // 4. Telecomunicações
  const rateBps = computeDataRateBps(antenna.diameterM, txPower, u.earthDistanceAU);
  const downlinkMbitDay = computeDailyDownlinkMbit(rateBps, 8);
  const returnFraction = totalDataMbitDay > 0 ? Math.min(1.0, downlinkMbitDay / totalDataMbitDay) : 1.0;
  const returnedScience = rawScience * returnFraction;

  // 5. Custos
  const powerCostM = powerSource === 'solar' ? (panelArea * PANEL.costPerM2M + batteryKg * BATTERY.costPerKgM) : (RTG.costM + batteryKg * BATTERY.costPerKgM);
  const commsCostM = antenna.costM + txPower * COMMS.costPerWM;
  const integrationCostM = dryMassKg * INTEGRATION_COST_PER_KG_M;
  const totalCostM = launcher.costM + t.busCostM + instCostM + powerCostM + commsCostM + integrationCostM;

  // 6. Verificações de limites
  const checks = [];
  let isOk = true;

  if (launchMassKg <= capacityKg) {
    checks.push({ id: 'mass', status: 'ok', message: `Massa de lançamento (${launchMassKg.toFixed(0)} kg) dentro da capacidade do foguete (${capacityKg} kg).` });
  } else {
    isOk = false;
    checks.push({ id: 'mass', status: 'error', message: `Massa excede capacidade do lançador em ${(launchMassKg - capacityKg).toFixed(0)} kg!` });
  }

  if (generationW >= consumptionW) {
    checks.push({ id: 'power', status: 'ok', message: `Geração (${generationW.toFixed(0)} W) cobre o consumo médio (${consumptionW.toFixed(0)} W).` });
  } else {
    isOk = false;
    checks.push({ id: 'power', status: 'error', message: `Défice elétrico! Consumo (${consumptionW.toFixed(0)} W) maior que geração (${generationW.toFixed(0)} W).` });
  }

  if (batteryWh >= neededWh) {
    checks.push({ id: 'battery', status: 'ok', message: `Bateria (${batteryWh.toFixed(0)} Wh) suficiente para eclipse orbital (${neededWh.toFixed(0)} Wh).` });
  } else {
    checks.push({ id: 'battery', status: 'warning', message: `Bateria marginal para o período de eclipse.` });
  }

  if (returnFraction >= 0.8) {
    checks.push({ id: 'comms', status: 'ok', message: `Link de rádio excelente: ${(returnFraction * 100).toFixed(0)}% dos dados chegam à Terra.` });
  } else {
    checks.push({ id: 'comms', status: 'warning', message: `Gargalo de downlink: apenas ${(returnFraction * 100).toFixed(0)}% da ciência devolvida.` });
  }

  if (totalCostM <= u.budgetM) {
    checks.push({ id: 'cost', status: 'ok', message: `Custo ($${totalCostM.toFixed(0)}M) dentro do teto orçamental ($${u.budgetM}M).` });
  } else {
    isOk = false;
    checks.push({ id: 'cost', status: 'error', message: `Orçamento estourado em $${(totalCostM - u.budgetM).toFixed(0)}M!` });
  }

  // Probabilidade de sucesso
  let prob = launcher.reliability;
  if (!isOk) prob *= 0.35;
  if (batteryWh < neededWh) prob *= 0.85;
  if (returnFraction < 0.5) prob *= 0.9;
  prob = Math.max(0.1, Math.min(0.99, prob));

  return {
    ok: isOk,
    universeName: u.name,
    typeName: t.name,
    successProbability: prob,
    mass: { dry: dryMassKg, edl: edlMassKg, propellant: propellantKg, launch: launchMassKg, capacity: capacityKg },
    power: { generationW, consumptionW, batteryWh, neededWh },
    comms: { rateBps, downlinkMbitDay, totalDataMbitDay, returnFraction },
    cost: { total: totalCostM, budget: u.budgetM },
    science: { raw: rawScience, returned: returnedScience },
    checks,
  };
}
