export interface FontDefault {
  Regular: string;
  Bold: string;
  Semibold: string;
  Medium: string;
}

export const FontDefault: FontDefault = {
  Regular: 'Poppins-Regular',
  Bold: 'Poppins-SemiBold',
  Semibold: 'Poppins-SemiBold',
  Medium: 'Poppins-Medium',
};

export type FontFamily = keyof typeof FontDefault;
