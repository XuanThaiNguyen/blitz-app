export interface FontDefault {
  Regular: string;
  Medium: string;
  Semibold: string;
  Bold: string;
}

export const FontDefault: FontDefault = {
  Regular: 'Urbanist-Regular',
  Medium: 'Urbanist-Medium',
  Semibold: 'Urbanist-SemiBold',
  Bold: 'Urbanist-Bold',
};

export type FontFamily = keyof typeof FontDefault;
