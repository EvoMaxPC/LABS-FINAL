import type { GameWorkloadItem } from '../../../evoLabCore/services/digitalTwin/types';

export type EvoGameQuality = 'LOW_COMPETITIVE' | 'MEDIUM' | 'HIGH' | 'ULTRA_RAYTRACING';
export type EvoGameResolution = '1080p' | '1440p' | '4k';

const clamp = (value: number, lower: number, upper: number): number =>
  Math.min(upper, Math.max(lower, value));

/**
 * Reutiliza las cargas del catálogo histórico para ofrecer estimaciones relativas.
 * NO representa FPS medidos ni telemetría real.
 */
export function deriveGameLoad(
  game: GameWorkloadItem,
  baseline: GameWorkloadItem,
  resolution: EvoGameResolution,
  quality: EvoGameQuality,
  baselineQuality: EvoGameQuality
) {
  const resKey = resolution === '4k' ? '4K' : resolution;
  const gp = game.demandProfile;
  const bp = baseline.demandProfile;
  const currentGpuDemand = gp.gpuRasterDemand.value * 0.8 + gp.gpuComputeDemand.value * 0.2;
  const baseGpuDemand = bp.gpuRasterDemand.value * 0.8 + bp.gpuComputeDemand.value * 0.2;
  const currentCpuDemand = gp.cpuSingleThreadDemand.value * 0.75 + gp.cpuMultiThreadDemand.value * 0.25;
  const baseCpuDemand = bp.cpuSingleThreadDemand.value * 0.75 + bp.cpuMultiThreadDemand.value * 0.25;
  const resolutionRatio = game.resolutionScaleFactors[resKey] / baseline.resolutionScaleFactors[resKey];
  const qualityRatio = game.qualityScaleFactors[quality] / baseline.qualityScaleFactors[baselineQuality];
  const gpuFpsFactor = clamp(
    (baseGpuDemand / Math.max(1, currentGpuDemand)) / Math.max(0.1, resolutionRatio * qualityRatio),
    0.2, 3.4
  );
  const cpuFpsFactor = clamp(baseCpuDemand / Math.max(1, currentCpuDemand), 0.5, 2.1);
  const vramGb = Number((gp.vramDemandGb.value * (1 + (game.resolutionScaleFactors[resKey] - 1) * 0.22) * Math.pow(qualityRatio, 0.3)).toFixed(1));
  const ramGb = Number((gp.ramDemandGb.value * (resolution === '4k' ? 1.05 : 1)).toFixed(1));
  return { gpuFpsFactor, cpuFpsFactor, vramGb, ramGb };
}
