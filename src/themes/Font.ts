export interface FontDefault {
  Regular: string;
  Bold: string;
}

export const FontDefault: FontDefault = {
  Regular: 'Urbanist-Regular',
  Bold: 'Urbanist-SemiBold',
};

export type FontFamily = keyof typeof FontDefault;
