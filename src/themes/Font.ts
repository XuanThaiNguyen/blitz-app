export interface FontDefault {
  Regular: string;
  Bold: string;
}

export const FontDefault: FontDefault = {
  Regular: 'Roboto-Regular',
  Bold: 'Roboto-Bold',
};

export type FontFamily = keyof typeof FontDefault;
