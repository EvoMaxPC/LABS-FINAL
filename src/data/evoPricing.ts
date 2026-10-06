/**
 * EVO LABS — Canonical Pricing Source of Truth
 * Centralized pricing model for plans, tomos, and lifetime access.
 */

export interface EvoPriceItem {
  id: string;
  name: string;
  durationMonths?: number;
  priceUsd: number | 'PRICE_TBD';
  billingTerm?: string;
  isPopular?: boolean;
  description: string;
}

export const EVO_PRICING = {
  complete1Month: {
    id: 'complete-1m',
    name: 'Complete 1 Mes',
    durationMonths: 1,
    priceUsd: 9.90,
    billingTerm: 'Facturación mensual',
    description: 'Acceso completo a todos los tomos publicados, laboratorios y herramientas.',
  },
  complete3Months: {
    id: 'complete-3m',
    name: 'Complete 3 Meses',
    durationMonths: 3,
    priceUsd: 24.90,
    billingTerm: 'Facturación trimestral',
    description: 'Acceso completo optimizado para formación técnica continua.',
  },
  complete6Months: {
    id: 'complete-6m',
    name: 'Complete 6 Meses',
    durationMonths: 6,
    priceUsd: 44.90,
    billingTerm: 'Facturación semestral',
    description: 'Acceso completo con tarifa preferencial por 6 meses.',
  },
  complete12Months: {
    id: 'complete-12m',
    name: 'Complete 12 Meses',
    durationMonths: 12,
    priceUsd: 79.90,
    billingTerm: 'Facturación anual',
    isPopular: true,
    description: 'Acceso completo por 1 año con máxima bonificación.',
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime Access',
    priceUsd: 179.90,
    billingTerm: 'Pago único (Acceso vitalicio)',
    description: 'Acceso de por vida a todo el ecosistema actual y futuro de EVO LABS.',
  },
  singleTomo: {
    id: 'single-tomo',
    name: 'Tomo Individual',
    priceUsd: 'PRICE_TBD',
    billingTerm: 'Acceso permanente al Tomo',
    description: 'Adquisición de un tomo técnico individual con su respectiva revista y labs.',
  },
  tomoPack: {
    id: 'tomo-pack',
    name: 'Pack de Tomos',
    priceUsd: 'PRICE_TBD',
    billingTerm: 'Pack temático',
    description: 'Lotes agrupados de tomos especializados.',
  },
} as const;

export function getPricingPlans(): EvoPriceItem[] {
  return [
    EVO_PRICING.complete1Month,
    EVO_PRICING.complete3Months,
    EVO_PRICING.complete6Months,
    EVO_PRICING.complete12Months,
    EVO_PRICING.lifetime,
  ];
}
