import type { CareType } from '../types/facility';

const LABELS: Record<CareType, string> = {
  assisted_living: 'Assisted Living',
  memory_care: 'Memory Care',
  board_and_care: 'Board & Care Home',
  independent_living: 'Independent Living',
  skilled_nursing: 'Skilled Nursing',
  respite_care: 'Respite Care',
  hospice: 'Hospice',
};

export const careTypeLabel = (t: CareType): string => LABELS[t];

export const careTypeLabels = (types: CareType[]): string[] =>
  types.map(careTypeLabel);
