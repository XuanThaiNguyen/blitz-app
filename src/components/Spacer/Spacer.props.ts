import {Spacing} from '../../themes/Spacing';

export interface SpacerProps {
  /**
   * Width of size box
   * @default 0
   */
  width?: keyof Spacing | number;

  /**
   * Height of size box
   * @default 0
   */
  height?: number;
}
